import Events from 'events';
import { FluxService } from '../services/FluxService';
import FluxConstants from '../constants/FluxConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

const Channel = new Events.EventEmitter();
const CHANGE_EVENT = 'change';
let _fluxList = [];

function createItem(description) {
    return FluxService.create({
        description,
        isChecked: false
    }).then(newItem => {
        _fluxList.push(newItem);
    });
}

function updateItem(description) {
    return FluxService.update(description).then(() => {
        let itemIndex = _fluxList.findIndex(item => item.id === description.id)
        _fluxList[itemIndex] = description;
    });
}

function removeItem(id) {
    let itemIndex = _fluxList.findIndex(item => item.id === id)
    return FluxService.remove(id).then(() => {
        _fluxList.splice(itemIndex, 1);
    });
}

function clear() {
    const flux = [],
        done = [];

    _fluxList.forEach((item) => {
        if (item.isChecked) {
            done.push(item);
        } else {
            flux.push(item);
        }
    })

    done.forEach((item) => {
        removeItem(item.id);
        _fluxList = flux;
    })
}

const FluxStore = {
    async getAll() {
        if (_fluxList.length === 0) {
            _fluxList = await FluxService.list();
        }
        return _fluxList;
    },

    emitChange() {
        Channel.emit(CHANGE_EVENT);
    },

    addChangeListerner(callback) {
        Channel.on(CHANGE_EVENT, callback);
    },

    removeChangeListerner(callback) {
        Channel.removeListener(CHANGE_EVENT, callback);
    }
}

async function handleAction(action) {
    switch (action.actionType) {
        case FluxConstants.FLUX_CREATE:
            await createItem(action.description);
            FluxStore.emitChange();
            break;
        case FluxConstants.FLUX_UPDATE:
            await updateItem(action.item);
            FluxStore.emitChange();
            break;
        case FluxConstants.FLUX_REMOVE:
            await removeItem(action.id);
            FluxStore.emitChange();
            break;
        case FluxConstants.FLUX_CLEAR:
            await clear();
            FluxStore.emitChange();
            break;
    }
}

FluxStore.dispatchToken = AppDispatcher.register(handleAction);

export default FluxStore;