/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as Models from "../models";
import * as Mappers from "../models/deletedServicesMappers";
import * as Parameters from "../models/parameters";
import { ApiManagementClientContext } from "../apiManagementClientContext";

/** Class representing a DeletedServices. */
export class DeletedServices {
  private readonly client: ApiManagementClientContext;

  /**
   * Create a DeletedServices.
   * @param {ApiManagementClientContext} client Reference to the service client.
   */
  constructor(client: ApiManagementClientContext) {
    this.client = client;
  }

  /**
   * Lists all soft-deleted services available for undelete for the given subscription.
   * @param [options] The optional parameters
   * @returns Promise<Models.DeletedServicesListBySubscriptionResponse>
   */
  listBySubscription(options?: msRest.RequestOptionsBase): Promise<Models.DeletedServicesListBySubscriptionResponse>;
  /**
   * @param callback The callback
   */
  listBySubscription(callback: msRest.ServiceCallback<Models.DeletedServicesCollection>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  listBySubscription(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedServicesCollection>): void;
  listBySubscription(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DeletedServicesCollection>, callback?: msRest.ServiceCallback<Models.DeletedServicesCollection>): Promise<Models.DeletedServicesListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listBySubscriptionOperationSpec,
      callback) as Promise<Models.DeletedServicesListBySubscriptionResponse>;
  }

  /**
   * Get soft-deleted Api Management Service by name.
   * @param serviceName The name of the API Management service.
   * @param location The location of the deleted API Management service.
   * @param [options] The optional parameters
   * @returns Promise<Models.DeletedServicesGetByNameResponse>
   */
  getByName(serviceName: string, location: string, options?: msRest.RequestOptionsBase): Promise<Models.DeletedServicesGetByNameResponse>;
  /**
   * @param serviceName The name of the API Management service.
   * @param location The location of the deleted API Management service.
   * @param callback The callback
   */
  getByName(serviceName: string, location: string, callback: msRest.ServiceCallback<Models.DeletedServiceContract>): void;
  /**
   * @param serviceName The name of the API Management service.
   * @param location The location of the deleted API Management service.
   * @param options The optional parameters
   * @param callback The callback
   */
  getByName(serviceName: string, location: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedServiceContract>): void;
  getByName(serviceName: string, location: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DeletedServiceContract>, callback?: msRest.ServiceCallback<Models.DeletedServiceContract>): Promise<Models.DeletedServicesGetByNameResponse> {
    return this.client.sendOperationRequest(
      {
        serviceName,
        location,
        options
      },
      getByNameOperationSpec,
      callback) as Promise<Models.DeletedServicesGetByNameResponse>;
  }

  /**
   * Purges Api Management Service (deletes it with no option to undelete).
   * @param serviceName The name of the API Management service.
   * @param location The location of the deleted API Management service.
   * @param [options] The optional parameters
   * @returns Promise<Models.DeletedServicesPurgeResponse>
   */
  purge(serviceName: string, location: string, options?: msRest.RequestOptionsBase): Promise<Models.DeletedServicesPurgeResponse> {
    return this.beginPurge(serviceName,location,options)
      .then(lroPoller => lroPoller.pollUntilFinished()) as Promise<Models.DeletedServicesPurgeResponse>;
  }

  /**
   * Purges Api Management Service (deletes it with no option to undelete).
   * @param serviceName The name of the API Management service.
   * @param location The location of the deleted API Management service.
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginPurge(serviceName: string, location: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        serviceName,
        location,
        options
      },
      beginPurgeOperationSpec,
      options);
  }

  /**
   * Lists all soft-deleted services available for undelete for the given subscription.
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param [options] The optional parameters
   * @returns Promise<Models.DeletedServicesListBySubscriptionNextResponse>
   */
  listBySubscriptionNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.DeletedServicesListBySubscriptionNextResponse>;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param callback The callback
   */
  listBySubscriptionNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.DeletedServicesCollection>): void;
  /**
   * @param nextPageLink The NextLink from the previous successful call to List operation.
   * @param options The optional parameters
   * @param callback The callback
   */
  listBySubscriptionNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedServicesCollection>): void;
  listBySubscriptionNext(nextPageLink: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.DeletedServicesCollection>, callback?: msRest.ServiceCallback<Models.DeletedServicesCollection>): Promise<Models.DeletedServicesListBySubscriptionNextResponse> {
    return this.client.sendOperationRequest(
      {
        nextPageLink,
        options
      },
      listBySubscriptionNextOperationSpec,
      callback) as Promise<Models.DeletedServicesListBySubscriptionNextResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listBySubscriptionOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/deletedservices",
  urlParameters: [
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.DeletedServicesCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const getByNameOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/locations/{location}/deletedservices/{serviceName}",
  urlParameters: [
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.location
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.DeletedServiceContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const beginPurgeOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "subscriptions/{subscriptionId}/providers/Microsoft.ApiManagement/locations/{location}/deletedservices/{serviceName}",
  urlParameters: [
    Parameters.serviceName,
    Parameters.subscriptionId,
    Parameters.location
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    202: {
      bodyMapper: Mappers.DeletedServiceContract
    },
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const listBySubscriptionNextOperationSpec: msRest.OperationSpec = {
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
      bodyMapper: Mappers.DeletedServicesCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};
