/* eslint-disable global-require */
import { createStore } from 'redux';

import createReduxModule from '../../src/createReduxModule';

it('can createReduxModule', () => {
  const { default: reducer, initialState } = createReduxModule({
    keyField: 'id',
  });
  const { getState } = createStore(reducer, initialState);
  expect(getState()).toEqual(require('./data/initialState.json'));
});

it('can setList and setDetail', () => {
  const {
    default: reducer,
    setList,
    setDetail,
    initialState,
  } = createReduxModule({ keyField: 'id' });
  const { getState, dispatch } = createStore(reducer, initialState);
  dispatch(setList([{ id: 1, title: 'test1' }]));
  dispatch(setDetail({ id: 2, title: 'test2' }));
  expect(getState()).toEqual(require('./data/result-0.json'));
});

it('can setList to different list path', () => {
  const { default: reducer, setList, initialState } = createReduxModule({
    keyField: 'id',
  });
  const { getState, dispatch } = createStore(reducer, initialState);
  dispatch(setList([{ id: 1, title: 'test1' }], { path: "bob's list" }));
  expect(getState()).toEqual(require('./data/result-1.json'));
});
