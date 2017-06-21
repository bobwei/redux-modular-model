/* eslint-disable global-require */
import { createStore } from 'redux';

import createReduxModule from '../../src/createReduxModule';

it('can createReduxModule', () => {
  const { reducer, initialState } = createReduxModule({
    keyField: 'id',
  });
  const { getState } = createStore(reducer, initialState);
  expect(getState()).toEqual(require('./data/initialState.json'));
});

it('can concat and setDetail', () => {
  const {
    initialState,
    actions: { concat, setDetail },
    reducer,
  } = createReduxModule({ keyField: 'id' });
  const { getState, dispatch } = createStore(reducer, initialState);
  dispatch(concat([{ id: 1, title: 'test1' }]));
  dispatch(setDetail({ id: 2, title: 'test2' }));
  expect(getState()).toEqual(require('./data/result-0.json'));
});

it('can concat to different listId', () => {
  const { initialState, actions: { concat }, reducer } = createReduxModule({
    keyField: 'id',
  });
  const { getState, dispatch } = createStore(reducer, initialState);
  dispatch(concat([{ id: 1, title: 'test1' }], { listId: "bob's list" }));
  expect(getState()).toEqual(require('./data/result-1.json'));
});
