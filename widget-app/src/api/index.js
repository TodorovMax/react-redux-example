const oneflowParent = window.parent.Xrm;
const Api = oneflowParent.WebApi;
const executionContext = oneflowParent.Utility.getGlobalContext();

export { oneflowParent, Api, executionContext };
