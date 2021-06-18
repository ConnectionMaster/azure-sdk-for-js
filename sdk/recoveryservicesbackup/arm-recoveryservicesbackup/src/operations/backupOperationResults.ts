/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Mappers from "../models/backupOperationResultsMappers";
import * as Parameters from "../models/parameters";
import { RecoveryServicesBackupClientContext } from "../recoveryServicesBackupClientContext";

/** Class representing a BackupOperationResults. */
export class BackupOperationResults {
  private readonly client: RecoveryServicesBackupClientContext;

  /**
   * Create a BackupOperationResults.
   * @param {RecoveryServicesBackupClientContext} client Reference to the service client.
   */
  constructor(client: RecoveryServicesBackupClientContext) {
    this.client = client;
  }

  /**
   * Provides the status of the delete operations such as deleting backed up item. Once the operation
   * has started, the
   * status code in the response would be Accepted. It will continue to be in this state till it
   * reaches completion. On
   * successful completion, the status code will be OK. This method expects OperationID as an
   * argument. OperationID is
   * part of the Location header of the operation response.
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param operationId OperationID which represents the operation.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  get(
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    options?: msRest.RequestOptionsBase
  ): Promise<msRest.RestResponse>;
  /**
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param operationId OperationID which represents the operation.
   * @param callback The callback
   */
  get(
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    callback: msRest.ServiceCallback<void>
  ): void;
  /**
   * @param vaultName The name of the recovery services vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   * present.
   * @param operationId OperationID which represents the operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  get(
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    options: msRest.RequestOptionsBase,
    callback: msRest.ServiceCallback<void>
  ): void;
  get(
    vaultName: string,
    resourceGroupName: string,
    operationId: string,
    options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>,
    callback?: msRest.ServiceCallback<void>
  ): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        vaultName,
        resourceGroupName,
        operationId,
        options
      },
      getOperationSpec,
      callback
    );
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const getOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path:
    "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/vaults/{vaultName}/backupOperationResults/{operationId}",
  urlParameters: [
    Parameters.vaultName,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.operationId
  ],
  queryParameters: [Parameters.apiVersion0],
  headerParameters: [Parameters.acceptLanguage],
  responses: {
    200: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  serializer
};
