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
import * as Mappers from "../models/notificationRecipientEmailMappers";
import * as Parameters from "../models/parameters";
import { ApiManagementClientContext } from "../apiManagementClientContext";

/** Class representing a NotificationRecipientEmail. */
export class NotificationRecipientEmail {
  private readonly client: ApiManagementClientContext;

  /**
   * Create a NotificationRecipientEmail.
   * @param {ApiManagementClientContext} client Reference to the service client.
   */
  constructor(client: ApiManagementClientContext) {
    this.client = client;
  }

  /**
   * Gets the list of the Notification Recipient Emails subscribed to a notification.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier. Possible values include:
   * 'RequestPublisherNotificationMessage', 'PurchasePublisherNotificationMessage',
   * 'NewApplicationNotificationMessage', 'BCC', 'NewIssuePublisherNotificationMessage',
   * 'AccountClosedPublisher', 'QuotaLimitApproachingPublisherNotificationMessage'
   * @param [options] The optional parameters
   * @returns Promise<Models.NotificationRecipientEmailListByNotificationResponse>
   */
  listByNotification(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, options?: msRest.RequestOptionsBase): Promise<Models.NotificationRecipientEmailListByNotificationResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier. Possible values include:
   * 'RequestPublisherNotificationMessage', 'PurchasePublisherNotificationMessage',
   * 'NewApplicationNotificationMessage', 'BCC', 'NewIssuePublisherNotificationMessage',
   * 'AccountClosedPublisher', 'QuotaLimitApproachingPublisherNotificationMessage'
   * @param callback The callback
   */
  listByNotification(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, callback: msRest.ServiceCallback<Models.RecipientEmailCollection>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier. Possible values include:
   * 'RequestPublisherNotificationMessage', 'PurchasePublisherNotificationMessage',
   * 'NewApplicationNotificationMessage', 'BCC', 'NewIssuePublisherNotificationMessage',
   * 'AccountClosedPublisher', 'QuotaLimitApproachingPublisherNotificationMessage'
   * @param options The optional parameters
   * @param callback The callback
   */
  listByNotification(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RecipientEmailCollection>): void;
  listByNotification(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.RecipientEmailCollection>, callback?: msRest.ServiceCallback<Models.RecipientEmailCollection>): Promise<Models.NotificationRecipientEmailListByNotificationResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        notificationName,
        options
      },
      listByNotificationOperationSpec,
      callback) as Promise<Models.NotificationRecipientEmailListByNotificationResponse>;
  }

  /**
   * Determine if Notification Recipient Email subscribed to the notification.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier. Possible values include:
   * 'RequestPublisherNotificationMessage', 'PurchasePublisherNotificationMessage',
   * 'NewApplicationNotificationMessage', 'BCC', 'NewIssuePublisherNotificationMessage',
   * 'AccountClosedPublisher', 'QuotaLimitApproachingPublisherNotificationMessage'
   * @param email Email identifier.
   * @param [options] The optional parameters
   * @returns Promise<Models.NotificationRecipientEmailCheckEntityExistsResponse>
   */
  checkEntityExists(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, email: string, options?: msRest.RequestOptionsBase): Promise<Models.NotificationRecipientEmailCheckEntityExistsResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier. Possible values include:
   * 'RequestPublisherNotificationMessage', 'PurchasePublisherNotificationMessage',
   * 'NewApplicationNotificationMessage', 'BCC', 'NewIssuePublisherNotificationMessage',
   * 'AccountClosedPublisher', 'QuotaLimitApproachingPublisherNotificationMessage'
   * @param email Email identifier.
   * @param callback The callback
   */
  checkEntityExists(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, email: string, callback: msRest.ServiceCallback<boolean>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier. Possible values include:
   * 'RequestPublisherNotificationMessage', 'PurchasePublisherNotificationMessage',
   * 'NewApplicationNotificationMessage', 'BCC', 'NewIssuePublisherNotificationMessage',
   * 'AccountClosedPublisher', 'QuotaLimitApproachingPublisherNotificationMessage'
   * @param email Email identifier.
   * @param options The optional parameters
   * @param callback The callback
   */
  checkEntityExists(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, email: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<boolean>): void;
  checkEntityExists(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, email: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<boolean>, callback?: msRest.ServiceCallback<boolean>): Promise<Models.NotificationRecipientEmailCheckEntityExistsResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        notificationName,
        email,
        options
      },
      checkEntityExistsOperationSpec,
      callback) as Promise<Models.NotificationRecipientEmailCheckEntityExistsResponse>;
  }

  /**
   * Adds the Email address to the list of Recipients for the Notification.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier. Possible values include:
   * 'RequestPublisherNotificationMessage', 'PurchasePublisherNotificationMessage',
   * 'NewApplicationNotificationMessage', 'BCC', 'NewIssuePublisherNotificationMessage',
   * 'AccountClosedPublisher', 'QuotaLimitApproachingPublisherNotificationMessage'
   * @param email Email identifier.
   * @param [options] The optional parameters
   * @returns Promise<Models.NotificationRecipientEmailCreateOrUpdateResponse>
   */
  createOrUpdate(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, email: string, options?: msRest.RequestOptionsBase): Promise<Models.NotificationRecipientEmailCreateOrUpdateResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier. Possible values include:
   * 'RequestPublisherNotificationMessage', 'PurchasePublisherNotificationMessage',
   * 'NewApplicationNotificationMessage', 'BCC', 'NewIssuePublisherNotificationMessage',
   * 'AccountClosedPublisher', 'QuotaLimitApproachingPublisherNotificationMessage'
   * @param email Email identifier.
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, email: string, callback: msRest.ServiceCallback<Models.RecipientEmailContract>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier. Possible values include:
   * 'RequestPublisherNotificationMessage', 'PurchasePublisherNotificationMessage',
   * 'NewApplicationNotificationMessage', 'BCC', 'NewIssuePublisherNotificationMessage',
   * 'AccountClosedPublisher', 'QuotaLimitApproachingPublisherNotificationMessage'
   * @param email Email identifier.
   * @param options The optional parameters
   * @param callback The callback
   */
  createOrUpdate(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, email: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.RecipientEmailContract>): void;
  createOrUpdate(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, email: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.RecipientEmailContract>, callback?: msRest.ServiceCallback<Models.RecipientEmailContract>): Promise<Models.NotificationRecipientEmailCreateOrUpdateResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        notificationName,
        email,
        options
      },
      createOrUpdateOperationSpec,
      callback) as Promise<Models.NotificationRecipientEmailCreateOrUpdateResponse>;
  }

  /**
   * Removes the email from the list of Notification.
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier. Possible values include:
   * 'RequestPublisherNotificationMessage', 'PurchasePublisherNotificationMessage',
   * 'NewApplicationNotificationMessage', 'BCC', 'NewIssuePublisherNotificationMessage',
   * 'AccountClosedPublisher', 'QuotaLimitApproachingPublisherNotificationMessage'
   * @param email Email identifier.
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  deleteMethod(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, email: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier. Possible values include:
   * 'RequestPublisherNotificationMessage', 'PurchasePublisherNotificationMessage',
   * 'NewApplicationNotificationMessage', 'BCC', 'NewIssuePublisherNotificationMessage',
   * 'AccountClosedPublisher', 'QuotaLimitApproachingPublisherNotificationMessage'
   * @param email Email identifier.
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, email: string, callback: msRest.ServiceCallback<void>): void;
  /**
   * @param resourceGroupName The name of the resource group.
   * @param serviceName The name of the API Management service.
   * @param notificationName Notification Name Identifier. Possible values include:
   * 'RequestPublisherNotificationMessage', 'PurchasePublisherNotificationMessage',
   * 'NewApplicationNotificationMessage', 'BCC', 'NewIssuePublisherNotificationMessage',
   * 'AccountClosedPublisher', 'QuotaLimitApproachingPublisherNotificationMessage'
   * @param email Email identifier.
   * @param options The optional parameters
   * @param callback The callback
   */
  deleteMethod(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, email: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
  deleteMethod(resourceGroupName: string, serviceName: string, notificationName: Models.NotificationName, email: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<void>, callback?: msRest.ServiceCallback<void>): Promise<msRest.RestResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        serviceName,
        notificationName,
        email,
        options
      },
      deleteMethodOperationSpec,
      callback);
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listByNotificationOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}/recipientEmails",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.notificationName,
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
      bodyMapper: Mappers.RecipientEmailCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const checkEntityExistsOperationSpec: msRest.OperationSpec = {
  httpMethod: "HEAD",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}/recipientEmails/{email}",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.notificationName,
    Parameters.email,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    204: {},
    404: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const createOrUpdateOperationSpec: msRest.OperationSpec = {
  httpMethod: "PUT",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}/recipientEmails/{email}",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.notificationName,
    Parameters.email,
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
      bodyMapper: Mappers.RecipientEmailContract
    },
    201: {
      bodyMapper: Mappers.RecipientEmailContract
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};

const deleteMethodOperationSpec: msRest.OperationSpec = {
  httpMethod: "DELETE",
  path: "subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/notifications/{notificationName}/recipientEmails/{email}",
  urlParameters: [
    Parameters.resourceGroupName,
    Parameters.serviceName,
    Parameters.notificationName,
    Parameters.email,
    Parameters.subscriptionId
  ],
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  serializer
};
