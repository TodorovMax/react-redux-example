import {
  SETCONTRACT,
  SETCONTRACTSTATUS,
  SETCONTRACTLINK,
  SETCONTRACTHANDLERSTATE,
  SETCONTRACTCOLLECTIONS,
  SETCONTRACTTEMPLATES,
  SETCONTRACTCONTACTS,
  SETSTATUSDATA,
  SETPARTICIPANTS,
  SETOPPORTUNITYPRODUCTS,
} from '../constants/contract';
import { SETLOADING } from '../constants/loading';
import {
  getContractData,
  postContract,
  getSelectors,
  getConterparties,
  getCurrentFormType,
  getIsDirty,
  getParentAccountId,
  getParentContactId,
  getParticipantinsights,
  getOpportunityProducts,
  postOpportunityProducts,
} from '../api/contract';
import { showAlert } from '../helpers/alerts';
import { filterCollections } from '../helpers/selectors';

const setContractData = (data, dispatch, redirect) => {
  const entity = data.entities[0];
  const link = entity.of_contracturl + '?view_mode=contract_only';
  dispatch({ type: SETCONTRACTLINK, payload: link });
  if (redirect) window.open(link, '_blank');
  const status = entity['statuscode@OData.Community.Display.V1.FormattedValue'];
  dispatch({ type: SETCONTRACTSTATUS, payload: status });

  const payload = {};
  if (status === 'Draft') {
    payload.Updated =
      entity['modifiedon@OData.Community.Display.V1.FormattedValue'];
    payload.Created =
      entity['createdon@OData.Community.Display.V1.FormattedValue'];
  } else if (status === 'Sent') {
    payload.Expires = entity[
      'of_expireson@OData.Community.Display.V1.FormattedValue'
    ].split(' ')[0];
    payload.Sent =
      entity['of_senton@OData.Community.Display.V1.FormattedValue'];
  } else if (status === 'Signed') {
    const lifecycle = entity.of_lifecyclecode;

    if (lifecycle === 0) {
      // Active
      payload['Active until'] =
        entity['of_activeuntil@OData.Community.Display.V1.FormattedValue'];
      payload.Signed =
        entity['of_signedon@OData.Community.Display.V1.FormattedValue'];
    } else if (lifecycle === 1) {
      // Ended
      payload.Ended =
        entity['of_endedon@OData.Community.Display.V1.FormattedValue'];
      payload.Signed =
        entity['of_signedon@OData.Community.Display.V1.FormattedValue'];
    } else if (lifecycle === 4) {
      // Awaiting
      payload.Starts =
        entity['of_startson@OData.Community.Display.V1.FormattedValue'];
      payload.Signed =
        entity['of_signedon@OData.Community.Display.V1.FormattedValue'];
    } else if (lifecycle === 5) {
      // Canceled
      payload.Signed =
        entity['of_signedon@OData.Community.Display.V1.FormattedValue'];
    } else if (lifecycle === 6) {
      // Terminated
      payload.Terminated =
        entity['of_terminatedon@OData.Community.Display.V1.FormattedValue'];
      payload.Signed =
        entity['of_signedon@OData.Community.Display.V1.FormattedValue'];
    } else if (lifecycle === 101) {
      // Active recurring
      payload.Renews =
        entity['of_renewson@OData.Community.Display.V1.FormattedValue'];
      payload.Signed =
        entity['of_signedon@OData.Community.Display.V1.FormattedValue'];
    } else if (lifecycle === 102) {
      // Active Recurring, but cancelled
      payload.Canceled =
        entity['of_declinedon@OData.Community.Display.V1.FormattedValue'];
      payload['Active until'] =
        entity['of_activeuntil@OData.Community.Display.V1.FormattedValue'];
      payload.Signed =
        entity['of_signedon@OData.Community.Display.V1.FormattedValue'];
    } else {
      payload.Signed =
        entity['of_signedon@OData.Community.Display.V1.FormattedValue'];
    }
  } else if (status === 'Declined') {
    payload.Declined =
      entity['of_declinedon@OData.Community.Display.V1.FormattedValue'];
    payload.Sent =
      entity['of_senton@OData.Community.Display.V1.FormattedValue'];
  }

  dispatch({ type: SETSTATUSDATA, payload });
  getParticipants(entity.of_contractidnumber, dispatch);
};

const getParticipants = (id, dispatch) => {
  getParticipantinsights().then(
    data => {
      const participants = [];
      for (let i = 0; i < data.entities.length; i++) {
        if (data.entities[i].of_agreementnumber === id)
          participants.push(data.entities[i]);
      }

      dispatch({ type: SETPARTICIPANTS, payload: participants });
      dispatch({ type: SETCONTRACT, payload: true });
      return dispatch({ type: SETLOADING, payload: false });
    },
    err => {
      return dispatch({ type: SETLOADING, payload: false });
    },
  );
};

export const getContract = (user, redirect, productTable) => dispatch => {
  getContractData().then(
    data => {
      if (data === null || data.entities.length === 0) {
        dispatch({
          type: SETCONTRACTSTATUS,
          payload: user
            ? 'Click Button to Create'
            : 'Oneflow User role is missing',
        });
        return dispatch({ type: SETLOADING, payload: false });
      } else {
        if (productTable) {
          postOpportunityProducts(data.entities[0].of_contractidnumber).then(
            productsRes => {
              productsRes.json().then(parsedRes => {
                if (!parsedRes.isError) {
                  const parsedData = JSON.parse(parsedRes.result);
                  if (parsedData.isError) {
                    const originalRes = JSON.parse(
                      parsedData.errorDetails.originalResponse,
                    );
                    let field_errors = '\n ';
                    if (Object.keys(originalRes.field_errors).length > 0) {
                      Object.keys(originalRes.field_errors).forEach(key => {
                        field_errors +=
                          key + ': ' + originalRes.field_errors[key] + ' \n ';
                      });
                    }
                    const alert = originalRes.error + field_errors;
                    showAlert(alert, 200, 350);
                  }
                } else {
                  showAlert(parsedRes.errorMessage || 'Error');
                }

                setContractData(data, dispatch, redirect);
              });
            },
            productsErr => {
              console.log('Error', productsErr);
              return dispatch({ type: SETLOADING, payload: false });
            },
          );
        } else {
          setContractData(data, dispatch, redirect);
        }
      }
    },
    err => {
      console.log('Error', err);
      return dispatch({ type: SETLOADING, payload: false });
    },
  );
};

export const handleContractHandler = state => dispatch => {
  if (!state) {
    dispatch({ type: SETCONTRACTCOLLECTIONS, payload: [] });
    dispatch({ type: SETCONTRACTCONTACTS, payload: [] });
    return dispatch({ type: SETCONTRACTHANDLERSTATE, payload: state });
  }

  const errors = [];

  if (getCurrentFormType() !== 2)
    errors.push(
      'A contract can only be created on an existing record. Save the changes and try again.',
    );

  if (getIsDirty())
    errors.push('Unsaved changes found. Save them and try again.');

  if (!getParentAccountId())
    errors.push(
      'Required associated entities is missing. Please add Company to Opportunity',
    );

  if (!getParentContactId())
    errors.push(
      'Required associated entities is missing. Please add Contact to Opportunity',
    );

  if (errors.length === 0) {
    return dispatch({ type: SETCONTRACTHANDLERSTATE, payload: state });
  } else {
    const lineHeight = 50;
    const minHeight = 150;
    const calculatedErrorHeight = minHeight + errors.length * lineHeight;
    const errorMessagesString = errors.join('\n ');
    showAlert(errorMessagesString, calculatedErrorHeight);
  }
};

const getSelectorsData = (type, callback) => {
  getSelectors(type).then(
    result => {
      if (result.ok) {
        result.json().then(response => {
          const collectionsData = JSON.parse(
            response.Result || response.result,
          );
          if (collectionsData.isError) {
            showAlert(collectionsData.errorDetails);
          } else {
            const oneflowResponse = collectionsData.oneflowResponse;
            callback(oneflowResponse);
          }
        });
      }
    },
    err => {
      showAlert(err);
    },
  );
};

export const getContractSelectors = () => dispatch => {
  getSelectorsData('of_GetCollections', collectionRes => {
    if (collectionRes.length === 0) {
      showAlert('User doesn’t have access to any collections');
    } else {
      const collections = [];
      collectionRes.forEach(item => {
        collections.push({
          value: item.id,
          text: item.name,
        });
      });

      getSelectorsData('of_GetTemplates', templateRes => {
        if (templateRes.collection.length === 0) {
          showAlert('User doesn’t have access to any templates');
        } else {
          const templates = [];

          templateRes.collection.forEach(item => {
            templates.push({
              value: item.agreement.id,
              text: item.name,
              agreement: item.agreement,
            });
          });

          getOpportunityProducts().then(data => {
            dispatch({ type: SETOPPORTUNITYPRODUCTS, payload: data.entities });
            const sortedCollection = filterCollections(collections, templates);
            dispatch({
              type: SETCONTRACTCOLLECTIONS,
              payload: sortedCollection,
            });

            dispatch({ type: SETCONTRACTTEMPLATES, payload: templates });
          });
        }
      });
    }
  });
};

export const getContactsData = () => dispatch => {
  getConterparties().then(
    result => {
      if (result.ok) {
        result.json().then(response => {
          if (response.isError) {
            showAlert(response.errorMessage);
          } else {
            const structures = JSON.parse(response.result);
            const contacts = [];
            structures.forEach(structure => {
              const company = structure.accountName
                ? structure.accountName
                : '';
              structure.participants.forEach(participant => {
                const id = participant.id;
                const contact = participant.name ? participant.name : '';
                const email = participant.email ? participant.email : '';
                const phone = participant.phone ? participant.phone : '';

                contacts.push({
                  company,
                  id,
                  contact,
                  email,
                  phone,
                });
              });
            });

            return dispatch({ type: SETCONTRACTCONTACTS, payload: contacts });
          }
        });
      } else {
        return showAlert(result.status);
      }
    },
    error => {
      return showAlert(error.message);
    },
  );
};

export const createContract = (
  collection,
  template,
  selectedParticipants,
  productTable,
) => dispatch => {
  dispatch({ type: SETLOADING, payload: true });
  getContractData().then(data => {
    if (data === null || data.entities.length === 0) {
      postContract(collection.value, template.value, selectedParticipants).then(
        res => {
          if (res.ok) {
            res.json().then(response => {
              const result = JSON.parse(response.result);

              if (result.isError) {
                const errorDetails = result.errorDetails;
                const errorMessage = errorDetails.error || '';
                let errorMessageRead = errorDetails.reason_readable || '';

                const jsonOriginalResponse = JSON.parse(
                  errorDetails.originalResponse,
                );
                if (jsonOriginalResponse && jsonOriginalResponse.field_errors) {
                  const fields = JSON.stringify(
                    jsonOriginalResponse.field_errors,
                  );
                  const stringForError = fields
                    .split('{')
                    .join('')
                    .split('}')
                    .join('')
                    .split('"')
                    .join('');

                  if (!errorMessageRead) {
                    errorMessageRead = stringForError;
                  }
                }

                const getMessage = errorMessage + '\n ' + errorMessageRead;
                dispatch({ type: SETLOADING, payload: false });
                return showAlert(getMessage);
              } else {
                dispatch({ type: SETCONTRACTHANDLERSTATE, payload: false });
                return getContract(true, true, productTable)(dispatch);
              }
            });
          }
        },
        err => {
          dispatch({ type: SETLOADING, payload: false });
          showAlert(err.message);
        },
      );
    } else {
      showAlert('You already have contract.');
      dispatch({ type: SETLOADING, payload: false });
      dispatch({ type: SETCONTRACTHANDLERSTATE, payload: false });
      setContractData(data, dispatch);
    }
  });
};
