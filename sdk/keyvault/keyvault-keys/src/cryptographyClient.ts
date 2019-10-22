import { GetKeyOptions, RequestOptions } from "./keysModels";
import { JsonWebKey, JsonWebKeyEncryptionAlgorithm } from "./core/models";
import {
  ServiceClientCredentials,
  TokenCredential,
  isNode,
  PipelineOptions,
  createPipelineFromOptions,
  ServiceClientOptions as Pipeline,
  isTokenCredential,
  signingPolicy
} from "@azure/core-http";

import { logger } from "./log";
import { parseKeyvaultIdentifier } from "./core/utils";
import { SDK_VERSION } from "./core/utils/constants";
import { KeyVaultClient } from "./core/keyVaultClient";
import { challengeBasedAuthenticationPolicy } from "./core/challengeBasedAuthenticationPolicy";
import * as crypto from "crypto";
import * as constants from "constants";

// This is part of constructing the autogenerated client. In the future, it should not
// be required. See also: https://github.com/Azure/azure-sdk-for-js/issues/5508
const SERVICE_API_VERSION = "7.0";

/**
 * The client to interact with the KeyVault cryptography functionality
 */
export class CryptographyClient {
  /**
   * Retrieves the complete key from the key vault
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, keyUrl, credentials);
   * let result = await client.getKey();
   * ```
   * @param options Options for retrieving key
   */
  public async getKey(options?: GetKeyOptions): Promise<JsonWebKey> {
    if (typeof this.key === "string") {
      if (!this.name || this.name === "") {
        throw new Error("getKey requires a key with a name");
      }
      const key = await this.client.getKey(
        this.vaultBaseUrl,
        this.name,
        options && options.version ? options.version : this.version ? this.version : "",
        options
      );
      return key.key!;
    } else {
      return this.key;
    }
  }

  /**
   * Encrypts the given plaintext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.encrypt("RSA1_5", Buffer.from("My Message"));
   * ```
   * @param algorithm The algorithm to use
   * @param plaintext The text to encrypt
   * @param options Additional options
   */
  public async encrypt(
    algorithm: JsonWebKeyEncryptionAlgorithm,
    plaintext: Uint8Array,
    options?: EncryptOptions
  ): Promise<EncryptResult> {
    if (isNode) {
      await this.fetchFullKeyIfPossible();

      if (typeof this.key !== "string") {
        switch (algorithm) {
          case "RSA1_5": {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("encrypt")) {
              throw new Error("Key does not support the encrypt operation");
            }

            let keyPEM = convertJWKtoPEM(this.key);

            let padded: any = { key: keyPEM, padding: constants.RSA_PKCS1_PADDING };
            const encrypted = crypto.publicEncrypt(padded, Buffer.from(plaintext));
            return { result: encrypted, algorithm, keyID: this.key.kid };
          }
          case "RSA-OAEP": {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("encrypt")) {
              throw new Error("Key does not support the encrypt operation");
            }

            let keyPEM = convertJWKtoPEM(this.key);

            const encrypted = crypto.publicEncrypt(keyPEM, Buffer.from(plaintext));
            return { result: encrypted, algorithm, keyID: this.key.kid };
          }
        }
      }
    }

    // Default to the service
    let result = await this.client.encrypt(
      this.vaultBaseUrl,
      this.name,
      this.version,
      algorithm,
      plaintext,
      options
    );

    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * Decrypts the given ciphertext with the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.decrypt("RSA1_5", encryptedBuffer);
   * ```
   * @param algorithm The algorithm to use
   * @param ciphertext The ciphertext to decrypt
   * @param options Additional options
   */

  public async decrypt(
    algorithm: JsonWebKeyEncryptionAlgorithm,
    ciphertext: Uint8Array,
    options?: DecryptOptions
  ): Promise<DecryptResult> {
    let result = await this.client.decrypt(
      this.vaultBaseUrl,
      this.name,
      this.version,
      algorithm,
      ciphertext,
      options
    );

    return { result: result.result!, keyID: this.getKeyID(), algorithm };
  }

  /**
   * Wraps the given key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.wrapKey("RSA1_5", keyToWrap);
   * ```
   * @param algorithm The encryption algorithm to use to wrap the given key
   * @param key The key to wrap
   * @param options Additional options
   */
  public async wrapKey(
    algorithm: KeyWrapAlgorithm,
    key: Uint8Array,
    options?: WrapOptions
  ): Promise<WrapResult> {
    if (isNode) {
      await this.fetchFullKeyIfPossible();

      if (typeof this.key !== "string") {
        switch (algorithm) {
          case "RSA1_5": {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("wrapKey")) {
              throw new Error("Key does not support the wrapKey operation");
            }

            let keyPEM = convertJWKtoPEM(this.key);

            let padded: any = { key: keyPEM, padding: constants.RSA_PKCS1_PADDING };
            const encrypted = crypto.publicEncrypt(padded, Buffer.from(key));
            return { result: encrypted, algorithm, keyID: this.getKeyID() };
          }
          case "RSA-OAEP": {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("wrapKey")) {
              throw new Error("Key does not support the wrapKey operation");
            }

            let keyPEM = convertJWKtoPEM(this.key);

            const encrypted = crypto.publicEncrypt(keyPEM, Buffer.from(key));
            return { result: encrypted, algorithm, keyID: this.getKeyID() };
          }
        }
      }
    }

    // Default to the service
    let result = await this.client.wrapKey(
      this.vaultBaseUrl,
      this.name,
      this.version,
      algorithm,
      key,
      options
    );
    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * Unwraps the given wrapped key using the specified cryptography algorithm
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.unwrapKey("RSA1_5", keyToUnwrap);
   * ```
   * @param algorithm The decryption algorithm to use to unwrap the key
   * @param encryptedKey The encrypted key to unwrap
   * @param options Additional options
   */
  public async unwrapKey(
    algorithm: KeyWrapAlgorithm,
    encryptedKey: Uint8Array,
    options?: UnwrapOptions
  ): Promise<UnwrapResult> {
    let result = await this.client.unwrapKey(
      this.vaultBaseUrl,
      this.name,
      this.version,
      algorithm,
      encryptedKey,
      options
    );
    return { result: result.result!, keyID: this.getKeyID() };
  }

  /**
   * Cryptographically sign the digest of a message
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.sign("RS256", digest);
   * ```
   * @param algorithm The signing algorithm to use
   * @param digest The digest of the data to sign
   * @param options Additional options
   */
  public async sign(
    algorithm: KeySignatureAlgorithm,
    digest: Uint8Array,
    options?: SignOptions
  ): Promise<SignResult> {
    let result = await this.client.sign(
      this.vaultBaseUrl,
      this.name,
      this.version,
      algorithm,
      digest,
      options
    );
    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * Verify the signed message digest
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.verify("RS256", signedDigest, signature);
   * ```
   * @param algorithm The signing algorithm to use to verify with
   * @param digest The digest to verify
   * @param signature The signature to verify the digest against
   * @param options Additional options
   */
  public async verify(
    algorithm: KeySignatureAlgorithm,
    digest: Uint8Array,
    signature: Uint8Array,
    options?: VerifyOptions
  ): Promise<VerifyResult> {
    const response = await this.client.verify(
      this.vaultBaseUrl,
      this.name,
      this.version,
      algorithm,
      digest,
      signature,
      options
    );
    return { result: response.value ? response.value : false, keyID: this.getKeyID() };
  }

  /**
   * Cryptographically sign a block of data
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.signData("RS256", message);
   * ```
   * @param algorithm The signing algorithm to use
   * @param data The data to sign
   * @param options Additional options
   */
  public async signData(
    algorithm: KeySignatureAlgorithm,
    data: Uint8Array,
    options?: SignOptions
  ): Promise<SignResult> {
    let digest;
    switch (algorithm) {
      case "ES256":
      case "ES256K":
      case "PS256":
      case "RS256":
        {
          digest = await createHash("sha256", data);
        }
        break;
      case "ES384":
      case "PS384":
      case "RS384":
        {
          digest = await createHash("sha384", data);
        }
        break;
      case "ES512":
      case "PS512":
      case "RS512":
        {
          digest = await createHash("sha512", data);
        }
        break;
      default: {
        throw new Error("Unsupported signature algorithm");
      }
    }

    let result = await this.client.sign(
      this.vaultBaseUrl,
      this.name,
      this.version,
      algorithm,
      digest,
      options
    );
    return { result: result.result!, algorithm, keyID: this.getKeyID() };
  }

  /**
   * Verify the signed block of data
   *
   * Example usage:
   * ```ts
   * let client = new CryptographyClient(url, key, credentials);
   * let result = await client.verifyData("RS256", signedMessage, signature);
   * ```
   * @param algorithm The algorithm to use to verify with
   * @param data The signed block of data to verify
   * @param signature The signature to verify the block against
   * @param options Additional options
   */
  public async verifyData(
    algorithm: KeySignatureAlgorithm,
    data: Uint8Array,
    signature: Uint8Array,
    options?: VerifyOptions
  ): Promise<VerifyResult> {
    if (isNode) {
      await this.fetchFullKeyIfPossible();

      if (typeof this.key !== "string") {
        switch (algorithm) {
          case "RS256": {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("verify")) {
              throw new Error("Key does not support the verify operation");
            }

            let keyPEM = convertJWKtoPEM(this.key);

            const verifier = crypto.createVerify("SHA256");
            verifier.update(Buffer.from(data));
            verifier.end();

            return {
              result: verifier.verify(keyPEM, Buffer.from(signature)),
              keyID: this.getKeyID()
            };
          }
          case "RS384": {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("verify")) {
              throw new Error("Key does not support the verify operation");
            }

            let keyPEM = convertJWKtoPEM(this.key);

            const verifier = crypto.createVerify("SHA384");
            verifier.update(Buffer.from(data));
            verifier.end();

            return {
              result: verifier.verify(keyPEM, Buffer.from(signature)),
              keyID: this.getKeyID()
            };
          }
          case "RS512": {
            if (this.key.kty != "RSA") {
              throw new Error("Key type does not match algorithm");
            }

            if (this.key.keyOps && !this.key.keyOps.includes("verify")) {
              throw new Error("Key does not support the verify operation");
            }

            let keyPEM = convertJWKtoPEM(this.key);

            const verifier = crypto.createVerify("SHA512");
            verifier.update(Buffer.from(data));
            verifier.end();

            return {
              result: verifier.verify(keyPEM, Buffer.from(signature)),
              keyID: this.getKeyID()
            };
          }
        }
      }
    }

    let digest: Buffer;
    switch (algorithm) {
      case "ES256":
      case "ES256K":
      case "PS256":
      case "RS256":
        {
          digest = await createHash("sha256", data);
        }
        break;
      case "ES384":
      case "PS384":
      case "RS384":
        {
          digest = await createHash("sha384", data);
        }
        break;
      case "ES512":
      case "PS512":
      case "RS512":
        {
          digest = await createHash("sha512", data);
        }
        break;
      default: {
        throw new Error("Unsupported signature algorithm");
      }
    }

    let result = await this.client.verify(
      this.vaultBaseUrl,
      this.name,
      this.version,
      algorithm,
      digest,
      signature,
      options
    );
    return { result: result.value!, keyID: this.getKeyID() };
  }

  private async fetchFullKeyIfPossible() {
    if (!this.hasTriedToGetKey) {
      try {
        let result = await this.getKey();
        this.key = result;
      } catch {}
      this.hasTriedToGetKey = true;
    }
  }

  private getKeyID(): string | undefined {
    let kid;
    if (typeof this.key !== "string") {
      kid = this.key.kid;
    } else {
      kid = this.key;
    }

    return kid;
  }

  /**
   * The base URL to the vault
   */
  public readonly vaultBaseUrl: string;

  /**
   * The options to create the connection to the service
   */
  public readonly pipeline: Pipeline;

  /**
   * The authentication credentials
   */
  protected readonly credential: ServiceClientCredentials | TokenCredential;
  private readonly client: KeyVaultClient;

  /**
   * If the key is a string, it's a URL, and we'll pass it to the service API directly.
   */
  public key: string | JsonWebKey;

  /**
   * Name of the key the client represents
   */
  private name: string;

  /**
   * Version of the key the client represents
   */
  private version: string;

  /**
   * Has the client tried to fetch the full key yet
   */
  private hasTriedToGetKey: boolean;

  /**
   * Constructs a new instance of the Cryptography client for the given key
   *
   * Example usage:
   * ```ts
   * import { CryptographyClient } from "@azure/keyvault-keys";
   * import { DefaultAzureCredential } from "@azure/identity";
   *
   * let url = `https://<MY KEYVAULT HERE>.vault.azure.net`;
   * let credentials = new DefaultAzureCredential();
   *
   * let client = new CryptographyClient(url, keyUrl, credentials);
   * // or
   * let client = new CryptographyClient(url, jsonWebKey, credentials);
   * ```
   * @param url The url of the key vault service
   * @param key The key to use during cryptography tasks
   * @param credential The login credentials of the service
   * @param {PipelineOptions} [pipelineOptions={}] Optional. Pipeline options used to configure Key Vault API requests.
   *                                                         Omit this parameter to use the default pipeline configuration.
   * @memberof CryptographyClient
   */
  constructor(
    url: string,
    key: string | JsonWebKey, // keyUrl or JsonWebKey
    credential: TokenCredential,
    pipelineOptions: PipelineOptions = {}
  ) {
    this.vaultBaseUrl = url;
    this.credential = credential;

    const libInfo = `azsdk-js-keyvault-keys/${SDK_VERSION}`;
    if (pipelineOptions.userAgentOptions) {
      pipelineOptions.userAgentOptions.userAgentPrefix !== undefined
        ? `${pipelineOptions.userAgentOptions.userAgentPrefix} ${libInfo}`
        : libInfo;
    } else {
      pipelineOptions.userAgentOptions = {
        userAgentPrefix: libInfo
      }
    }

    const authPolicy =
      isTokenCredential(credential)
        ? challengeBasedAuthenticationPolicy(credential)
        : signingPolicy(credential)

    const internalPipelineOptions = {
      ...pipelineOptions,
      ...{
        loggingOptions: {
          logger: logger.info,
          logPolicyOptions: {
            allowedHeaderNames: [
              "x-ms-keyvault-region",
              "x-ms-keyvault-network-info",
              "x-ms-keyvault-service-version"
            ]
          }
        }
      }
    }

    this.pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.client = new KeyVaultClient(credential, SERVICE_API_VERSION, this.pipeline);

    this.key = key;

    let parsed;
    if (typeof this.key === "string") {
      parsed = parseKeyvaultIdentifier("keys", this.key);
      this.hasTriedToGetKey = false;
    } else {
      parsed = parseKeyvaultIdentifier("keys", this.key.kid!);
      this.hasTriedToGetKey = true;
    }

    if (parsed.name == "") {
      throw new Error("Could not find 'name' of key in key URL");
    }

    if (!parsed.version || parsed.version == "") {
      throw new Error("Could not find 'version' of key in key URL");
    }

    this.name = parsed.name;
    this.version = parsed.version;
  }
}

/**
 * @internal
 * @ignore
 * Encodes a length of a packet in DER format
 */
function encodeLength(length: number): Uint8Array {
  if (length <= 127) {
    return Uint8Array.of(length);
  } else if (length < 256) {
    return Uint8Array.of(0x81, length);
  } else if (length < 65536) {
    return Uint8Array.of(0x82, length >> 8, length & 0xff);
  } else {
    throw new Error("Unsupported length to encode");
  }
}

/**
 * @internal
 * @ignore
 * Encodes a buffer for DER, as sets the id to the given id
 */
function encodeBuffer(buffer: Uint8Array, bufferId: number): Uint8Array {
  if (buffer.length == 0) {
    return buffer;
  }

  let result = new Uint8Array(buffer);

  // If the high bit is set, prepend a 0
  if ((result[0] & 0x80) === 0x80) {
    let array = new Uint8Array(result.length + 1);
    array[0] = 0;
    array.set(result, 1);
    result = array;
  }

  // Prepend the DER header for this buffer
  let encodedLength = encodeLength(result.length);

  let totalLength = 1 + encodedLength.length + result.length;

  let outputBuffer = new Uint8Array(totalLength);
  outputBuffer[0] = bufferId;
  outputBuffer.set(encodedLength, 1);
  outputBuffer.set(result, 1 + encodedLength.length);

  return outputBuffer;
}

/**
 * @internal
 * @ignore
 * Encode a JWK to PEM format. To do so, it internally repackages the JWK as a DER
 * that is then encoded as a PEM.
 */
export function convertJWKtoPEM(key: JsonWebKey): string {
  if (!key.n || !key.e) {
    throw new Error("Unsupported key format for local operations");
  }
  let encoded_n = encodeBuffer(key.n, 0x2); // INTEGER
  let encoded_e = encodeBuffer(key.e, 0x2); // INTEGER

  let encoded_ne = new Uint8Array(encoded_n.length + encoded_e.length);
  encoded_ne.set(encoded_n, 0);
  encoded_ne.set(encoded_e, encoded_n.length);

  let full_encoded = encodeBuffer(encoded_ne, 0x30); //SEQUENCE

  let buffer = Buffer.from(full_encoded).toString("base64");

  let beginBanner = "-----BEGIN RSA PUBLIC KEY-----\n";
  let endBanner = "-----END RSA PUBLIC KEY-----";

  /*
   Fill in the PEM with 64 character lines as per RFC:

   "To represent the encapsulated text of a PEM message, the encoding
   function's output is delimited into text lines (using local
   conventions), with each line except the last containing exactly 64
   printable characters and the final line containing 64 or fewer
   printable characters."
  */
  let outputString = beginBanner;
  let lines = buffer.match(/.{1,64}/g);

  if (lines) {
    for (let line of lines) {
      outputString += line;
      outputString += "\n";
    }
  } else {
    throw new Error("Could not create correct PEM");
  }
  outputString += endBanner;

  return outputString;
}

/**
 * @internal
 * @ignore
 * Use the platform-local hashing functionality
 */
async function createHash(algorithm: string, data: Uint8Array): Promise<Buffer> {
  if (isNode) {
    let hash = crypto.createHash(algorithm);
    hash.update(Buffer.from(data));
    let digest = hash.digest();
    return digest;
  } else {
    if (window && window.crypto && window.crypto.subtle) {
      return Buffer.from(await window.crypto.subtle.digest(algorithm, Buffer.from(data)));
    } else {
      throw new Error("Browser does not support cryptography functions");
    }
  }
}

/**
 * Allow algorithms for key wrapping/unwrapping
 */
export type KeyWrapAlgorithm = "RSA-OAEP" | "RSA-OAEP-256" | "RSA1_5";

/**
 * Defines values for JsonWebKeySignatureAlgorithm.
 * Possible values include: 'PS256', 'PS384', 'PS512', 'RS256', 'RS384', 'RS512',
 * 'ES256', 'ES384', 'ES512', 'ES256K'
 * @readonly
 * @enum {string}
 */
export type KeySignatureAlgorithm =
  | "PS256"
  | "PS384"
  | "PS512"
  | "RS256"
  | "RS384"
  | "RS512"
  | "ES256"
  | "ES384"
  | "ES512"
  | "ES256K";

/**
 * Options for the encrypt call to the CryptographyClient
 */
export interface EncryptOptions extends RequestOptions {}

/**
 * Options for the decrypt call to the CryptographyClient
 */
export interface DecryptOptions extends RequestOptions {}

/**
 * Options for the sign call to the CryptographyClient
 */
export interface SignOptions extends RequestOptions {}

/**
 * Options for the verify call to the CryptographyClient
 */
export interface VerifyOptions extends RequestOptions {}

/**
 * Options for the wrapKey call to the CryptographyClient
 */
export interface WrapOptions extends RequestOptions {}

/**
 * Options for the unwrap call to the CryptographyClient
 */
export interface UnwrapOptions extends RequestOptions {}

/**
 * Result of a decrypt operation
 */
export interface DecryptResult {
  /**
   * Result of the operation
   */
  result: Uint8Array;
  /**
   * Id of the key
   */
  keyID?: string;
  /**
   * Algorithm used
   */
  algorithm: JsonWebKeyEncryptionAlgorithm;
}

/**
 * Reuslt of an encrypt operation
 */
export interface EncryptResult {
  /**
   * Result of the operation
   */
  result: Uint8Array;
  /**
   * Algorithm used
   */
  algorithm: JsonWebKeyEncryptionAlgorithm;
  /**
   * Id of the key
   */
  keyID?: string;
}

/**
 * Result of a sign operation
 */
export interface SignResult {
  /**
   * Result of the operation
   */
  result: Uint8Array;
  /**
   * Id of the key
   */
  keyID?: string;
  /**
   * Algorithm used
   */
  algorithm: KeySignatureAlgorithm;
}

/**
 * Result of a verify operation
 */
export interface VerifyResult {
  /**
   * Result of the operation
   */
  result: boolean;
  /**
   * Id of the key
   */
  keyID?: string;
}

/**
 * Result of a wrap operation
 */
export interface WrapResult {
  /**
   * Result of the operation
   */
  result: Uint8Array;
  /**
   * Id of the key
   */
  keyID?: string;
  /**
   * Algorithm used
   */
  algorithm: KeyWrapAlgorithm;
}

/**
 * Result of an unwrap operation
 */
export interface UnwrapResult {
  /**
   * Result of the operation
   */
  result: Uint8Array;
  /**
   * Id of the key
   */
  keyID?: string;
}
