import { showAlert } from '../helpers/alerts';
import { deleteRecord } from '../api/sidebar';
import { getContractData } from '../api/contract';
import { SETCONTRACT, SETCONTRACTCOLLECTIONS, SETCONTRACTCONTACTS} from '../constants/contract';
import { SETLOADING } from '../constants/loading';

export const deleteContract = () => dispatch => {
  dispatch({ type: SETLOADING, payload: true });
  dispatch({ type: SETCONTRACTCOLLECTIONS, payload: [] });
  dispatch({ type: SETCONTRACTCONTACTS, payload: [] });
  getContractData().then(data => {
    if (data === null || data.entities.length === 0) {
      showAlert(
        'The contract has been deleted already, please refresh the page.',
      );
    } else {
      const contractId = data.entities[0].of_oneflowcontractid;
      deleteRecord(contractId).then(
        () => {
          dispatch({ type: SETLOADING, payload: false });
          dispatch({
            type: SETCONTRACT,
            payload: false,
          });
        },
        err => {
          showAlert(err.message);
          dispatch({ type: SETLOADING, payload: false });
        },
      );
    }
  });
};
