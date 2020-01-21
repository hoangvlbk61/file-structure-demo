import { put, takeLatest, delay} from "redux-saga/effects";
import REDUX_TYPES from '../const/redux-types';
import { fetchs, fetchLazy, creates, updates, deletes} from '../services/post'

const _fetch = function*({payload}) {
    const response = yield fetchs();
    yield delay(1000);
    yield put({
        type: REDUX_TYPES.POST.RECV_DATA,
        payload: {
            actionType: 'fetch',
            dataTypes: 'posts',
            data: response,
            status: 200
        }
    })
};

const _create = function*({payload}) {
    yield console.log("_create _create_create_create", payload);
    const response = yield creates(payload);
    yield console.log("_create response", response);
    yield put({
        type: REDUX_TYPES.POST.RECV_DATA,
        payload: {
            actionType: 'create',
            dataTypes: 'posts',
            data: response,
            status: response.status
        }
    })
    const fetchResponse = yield fetchLazy(1, 10)
    yield put({
        type: REDUX_TYPES.POST.RECV_DATA,
        payload: {
            actionType: 'fetch',
            dataTypes: 'posts',
            data: fetchResponse.data
        }
    })
    yield put({
        type: REDUX_TYPES.POST.RECV_DATA,
        payload: {
            actionType: 'fetch',
            dataTypes: 'pagination',
            data: fetchResponse.pagination
        }
    })
}

const _update = function*({payload}) {
    yield console.log("_update _update_update_update", payload);
    const response = yield updates(payload);
    console.log("edit response: ", response);
    
    yield put({
        type: REDUX_TYPES.POST.RECV_DATA,
        payload: {
            actionType: 'update',
            dataTypes: 'posts',
            data: response,
            status: response.status
        }
    })
    const fetchResponse = yield fetchLazy(1, 10)
    yield put({
        type: REDUX_TYPES.POST.RECV_DATA,
        payload: {
            actionType: 'fetch',
            dataTypes: 'posts',
            data: fetchResponse.data
        }
    })
    yield put({
        type: REDUX_TYPES.POST.RECV_DATA,
        payload: {
            actionType: 'fetch',
            dataTypes: 'pagination',
            data: fetchResponse.pagination
        }
    })
}

const _delete = function*({payload}) {
    yield console.log("_delete _delete", payload);
    const response = yield deletes(payload.Id);
    yield console.log("_delete _delete response", response);
    yield put({
        type: REDUX_TYPES.POST.RECV_DATA,
        payload: {
            actionType: 'delete',
            dataTypes: 'posts',
            data: payload,
            status: response.status
        }
    })

    const fetchResponse = yield fetchLazy(payload.pageNo, 10)
    yield put({
        type: REDUX_TYPES.POST.RECV_DATA,
        payload: {
            actionType: 'fetch',
            dataTypes: 'posts',
            data: fetchResponse.data
        }
    })
    yield put({
        type: REDUX_TYPES.POST.RECV_DATA,
        payload: {
            actionType: 'fetch',
            dataTypes: 'pagination',
            data: fetchResponse.pagination
        }
    })
}

const _detail = function*() {
    yield console.log("_detail _detail_detail_detail");
}

export default function*() {
	yield takeLatest(REDUX_TYPES.POST.FETCH, _fetch);
    yield takeLatest(REDUX_TYPES.POST.CREATE, _create);
    yield takeLatest(REDUX_TYPES.POST.UPDATE, _update);
    yield takeLatest(REDUX_TYPES.POST.DELETE, _delete);
    yield takeLatest(REDUX_TYPES.POST.DETAIL, _detail);
}
