import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects';

import { ActionsTypeSaga, searchInfoWorkerSaga, tableReducer } from './table-reducer';

const reducers = combineReducers({
  table: tableReducer,
});
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducers, applyMiddleware(sagaMiddleware));
export type RootStateType = ReturnType<typeof reducers>;

function* rootWatcher() {
  yield takeEvery<ActionsTypeSaga>('TABLE/SEARCH-INFO', searchInfoWorkerSaga);
}

sagaMiddleware.run(rootWatcher);

// @ts-ignore
window.store = store;
