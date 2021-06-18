/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/domainRegistrationProviderMappers";
import * as Parameters from "../models/parameters";
import { WebSiteManagementClientContext } from "../webSiteManagementClientContext";

/** Class representing a DomainRegistrationProvider. */
export class DomainRegistrationProvider {
  private readonly client: WebSiteManagementClientContext;

  /**
   * Create a DomainRegistrationProvider.
   * @param {WebSiteManagementClientContext} client Reference to the service client.
   */
  constructor(client: WebSiteManagementClientContext) {
    this.client = client;
  }

  /**
   * Description for Implements Csm operations Api to exposes the list of available Csm Apis under
   * the resource provider
   * @summary Implements Csm operations Api to exposes the list of available Csm Apis under the
   * resource provider
   * @param [options] The optional parameters
   * @returns Promise<Models.DomainRegistrationProviderListOperationsResponse>
   */
  listOperations(options?: msRest.RequestOptionsBase): Promise<Models.DomainRegistrationProviderListOperationsResponse>;
  /**
   * @param callback The callback
   */
  listOperations(callback: msRest.ServiceCallback<Models.CsmOperationCollection>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  listOperations(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CsmOperationCollection>): void;
  listOperations(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.CsmOperationCollection>, callback?: msRest.ServiceCallback<Models.CsmOperationCollection>): Promise<Models.DomainRegistrationProviderListOperationsResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listOperationsOperationSpec,
      callback) as Promise<Models.DomainRegistrationProviderListOperationsResponse>;
  }

  /**
   * Description for Implements Csm operations Api to exposes the list of available Csm Apis under
   * the resource provider
   * @summary Implements Csm operations Api to exposes the list of available Csm Apis under the
   * resource provider
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.DomainRegistrationProviderListOperationsNextResponse>
   */
  listOperationsNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.DomainRegistrationProviderListOperationsNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listOperationsNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.CsmOperationCollection>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listOperationsNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CsmOperationCollection>): void;
  listOperationsNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.CsmOperationCollection>, callback?: msRest.ServiceCallback<Models.CsmOperationCollection>): Promise<Models.DomainRegistrationProviderListOperationsNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listOperationsNextOperationSpec,
      callback) as Promise<Models.DomainRegistrationProviderListOperationsNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listOperationsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "providers/Microsoft.DomainRegistration/operations",
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.CsmOperationCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  serializer
};

const listOperationsNextOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  baseUrl: "https://management.azure.com",
  path: "{nextLink}",
  urlParameters: [
    Parameters.nextPageLink
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.CsmOperationCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  serializer
};
