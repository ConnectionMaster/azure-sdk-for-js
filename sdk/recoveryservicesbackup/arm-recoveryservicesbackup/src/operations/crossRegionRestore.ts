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
import * as Mappers from "../models/crossRegionRestoreMappers";
import * as Parameters from "../models/parameters";
import { RecoveryServicesBackupClientContext } from "../recoveryServicesBackupClientContext";

/** Class representing a CrossRegionRestore. */
export class CrossRegionRestore {
  private readonly client: RecoveryServicesBackupClientContext;

  /**
   * Create a CrossRegionRestore.
   * @param {RecoveryServicesBackupClientContext} client Reference to the service client.
   */
  constructor(client: RecoveryServicesBackupClientContext) {
    this.client = client;
  }

  /**
   * @summary Restores the specified backed up data in a different region as compared to where the
   * data is backed up.
   * @param azureRegion Azure region to hit Api
   * @param parameters resource cross region restore request
   * @param [options] The optional parameters
   * @returns Promise<msRest.RestResponse>
   */
  trigger(
    azureRegion: string,
    parameters: Models.CrossRegionRestoreRequest,
    options?: msRest.RequestOptionsBase
  ): Promise<msRest.RestResponse> {
    return this.beginTrigger(azureRegion, parameters, options).then((lroPoller) =>
      lroPoller.pollUntilFinished()
    );
  }

  /**
   * @summary Restores the specified backed up data in a different region as compared to where the
   * data is backed up.
   * @param azureRegion Azure region to hit Api
   * @param parameters resource cross region restore request
   * @param [options] The optional parameters
   * @returns Promise<msRestAzure.LROPoller>
   */
  beginTrigger(
    azureRegion: string,
    parameters: Models.CrossRegionRestoreRequest,
    options?: msRest.RequestOptionsBase
  ): Promise<msRestAzure.LROPoller> {
    return this.client.sendLRORequest(
      {
        azureRegion,
        parameters,
        options
      },
      beginTriggerOperationSpec,
      options
    );
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const beginTriggerOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path:
    "subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{azureRegion}/backupCrossRegionRestore",
  urlParameters: [Parameters.azureRegion, Parameters.subscriptionId],
  queryParameters: [Parameters.apiVersion1],
  headerParameters: [Parameters.acceptLanguage],
  requestBody: {
    parameterPath: "parameters",
    mapper: {
      ...Mappers.CrossRegionRestoreRequest,
      required: true
    }
  },
  responses: {
    200: {},
    202: {},
    default: {
      bodyMapper: Mappers.NewErrorResponse
    }
  },
  serializer
};
