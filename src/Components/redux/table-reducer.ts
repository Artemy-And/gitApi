import { call, put } from 'redux-saga/effects';
import { infoAPI } from '../api/api';

const initialState = {
  setSearching: false,
  array: [] as Array<any>,
};

type SetNewArrACType = {
  type: typeof SET_NEW_ARR
  array: Array<any>
};

type SetInputACType = {
  type: typeof SET_INPUT
  value: boolean
};

type AllACTypes =
    | SetNewArrACType
    | SetInputACType;

type ActionSearchInfoAppType = {
  params:string
};

export interface ActionsTypeSaga extends ReturnType<typeof searchInfoApp>, ActionSearchInfoAppType{type: 'TABLE/SEARCH-INFO'}

export const SET_NEW_ARR = 'SET_NEW_ARR';
export const SET_INPUT = 'SET_INPUT';

export type InitialStateType = {
  array: Array<any>
  setSearching: boolean,
};

export function tableReducer(state: InitialStateType = initialState,
  action: AllACTypes): InitialStateType {
  switch (action.type) {
    case SET_NEW_ARR:
      return { ...state, array: action.array };
    case SET_INPUT:
      return { ...state, setSearching: action.value };
    default:
      return state;
  }
}

export const setNewArrAC = (array: Array<any>): SetNewArrACType => ({
  type: SET_NEW_ARR,
  array,
});
export const setSearchingAC = (value: boolean): SetInputACType => ({
  type: SET_INPUT,
  value,
});

export function* searchInfoWorkerSaga(action:ActionsTypeSaga) {
  try {
    yield put(setSearchingAC(true));
    const res = yield call(infoAPI.searchInfoApp, action.params);
    console.log(res.status);
    yield put(setNewArrAC(res.items));
    yield put(setSearchingAC(false));
  } catch (e) {
    throw new Error(e);
  }
  yield put(setSearchingAC(false));
}

export const searchInfoApp = (params: string) => ({ type: 'TABLE/SEARCH-INFO', params });
