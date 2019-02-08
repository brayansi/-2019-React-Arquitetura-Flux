import FluxConstants from '../constants/FluxConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const FluxActions = {
    create(description) {
        AppDispatcher.dispatch({
            actionType: FluxConstants.FLUX_CREATE,
            description
        })
    },

    update(item) {
        AppDispatcher.dispatch({
            actionType: FluxConstants.FLUX_UPDATE,
            item
        })
    },

    remove(id) {
        AppDispatcher.dispatch({
            actionType: FluxConstants.FLUX_REMOVE,
            id
        })
    },

    clear() {
        AppDispatcher.dispatch({
            actionType: FluxConstants.FLUX_CLEAR,
        })
    }
}

export default FluxActions;