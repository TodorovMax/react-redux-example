const oneflowParent = window.parent.Xrm;
const Api = oneflowParent.WebApi;
const executionContext = oneflowParent.Utility.getGlobalContext();

const oneflowRequest = (action) => {
  const request = {
    getMetadata: () => ({
      boundParameter: null,
      parameterTypes: {},
      operationType: 0,
      operationName: action,
    }),
  };

  return Api.execute(request);
};

export {
  oneflowParent, Api, executionContext, oneflowRequest,
};
