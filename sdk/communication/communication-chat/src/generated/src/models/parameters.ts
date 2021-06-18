/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationParameter,
  OperationURLParameter,
  OperationQueryParameter
} from "@azure/core-http";
import {
  SendReadReceiptRequest as SendReadReceiptRequestMapper,
  SendChatMessageRequest as SendChatMessageRequestMapper,
  UpdateChatMessageRequest as UpdateChatMessageRequestMapper,
  CommunicationIdentifierModel as CommunicationIdentifierModelMapper,
  AddChatParticipantsRequest as AddChatParticipantsRequestMapper,
  UpdateChatThreadRequest as UpdateChatThreadRequestMapper,
  CreateChatThreadRequest as CreateChatThreadRequestMapper
} from "../models/mappers";

export const accept: OperationParameter = {
  parameterPath: "accept",
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Accept",
    type: {
      name: "String"
    }
  }
};

export const endpoint: OperationURLParameter = {
  parameterPath: "endpoint",
  mapper: {
    serializedName: "endpoint",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const chatThreadId: OperationURLParameter = {
  parameterPath: "chatThreadId",
  mapper: {
    serializedName: "chatThreadId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const maxPageSize: OperationQueryParameter = {
  parameterPath: ["options", "maxPageSize"],
  mapper: {
    serializedName: "maxPageSize",
    type: {
      name: "Number"
    }
  }
};

export const skip: OperationQueryParameter = {
  parameterPath: ["options", "skip"],
  mapper: {
    serializedName: "skip",
    type: {
      name: "Number"
    }
  }
};

export const apiVersion: OperationQueryParameter = {
  parameterPath: "apiVersion",
  mapper: {
    defaultValue: "2021-04-05-preview6",
    isConstant: true,
    serializedName: "api-version",
    type: {
      name: "String"
    }
  }
};

export const contentType: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const sendReadReceiptRequest: OperationParameter = {
  parameterPath: "sendReadReceiptRequest",
  mapper: SendReadReceiptRequestMapper
};

export const sendChatMessageRequest: OperationParameter = {
  parameterPath: "sendChatMessageRequest",
  mapper: SendChatMessageRequestMapper
};

export const startTime: OperationQueryParameter = {
  parameterPath: ["options", "startTime"],
  mapper: {
    serializedName: "startTime",
    type: {
      name: "DateTime"
    }
  }
};

export const chatMessageId: OperationURLParameter = {
  parameterPath: "chatMessageId",
  mapper: {
    serializedName: "chatMessageId",
    required: true,
    type: {
      name: "String"
    }
  }
};

export const contentType1: OperationParameter = {
  parameterPath: ["options", "contentType"],
  mapper: {
    defaultValue: "application/merge-patch+json",
    isConstant: true,
    serializedName: "Content-Type",
    type: {
      name: "String"
    }
  }
};

export const updateChatMessageRequest: OperationParameter = {
  parameterPath: "updateChatMessageRequest",
  mapper: UpdateChatMessageRequestMapper
};

export const participantCommunicationIdentifier: OperationParameter = {
  parameterPath: "participantCommunicationIdentifier",
  mapper: CommunicationIdentifierModelMapper
};

export const addChatParticipantsRequest: OperationParameter = {
  parameterPath: "addChatParticipantsRequest",
  mapper: AddChatParticipantsRequestMapper
};

export const updateChatThreadRequest: OperationParameter = {
  parameterPath: "updateChatThreadRequest",
  mapper: UpdateChatThreadRequestMapper
};

export const nextLink: OperationURLParameter = {
  parameterPath: "nextLink",
  mapper: {
    serializedName: "nextLink",
    required: true,
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};

export const createChatThreadRequest: OperationParameter = {
  parameterPath: "createChatThreadRequest",
  mapper: CreateChatThreadRequestMapper
};

export const repeatabilityRequestId: OperationParameter = {
  parameterPath: ["options", "repeatabilityRequestId"],
  mapper: {
    serializedName: "repeatability-request-id",
    type: {
      name: "String"
    }
  }
};
