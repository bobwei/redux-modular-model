import { handleActions } from 'redux-actions';
import R from 'ramda';

import createActions from './createActions';

const createReduxModule = (
  {
    modulePrefix = 'modules/models/MODEL_NAME/redux',
    keyField = 'objectId',
  } = {},
) => {
  /* initialState */
  const initialState = {
    list: {
      all: [],
    },
    entities: {},
  };

  /* actions */
  const actions = createActions(modulePrefix);
  const { clear, concat, setDetail } = actions;

  /* reducer */
  const reducer = handleActions(
    {
      [clear]: (state, { meta: { listId } }) =>
        R.assocPath(['list', listId], [], state),
      [concat]: (state, { payload, meta: { listId } }) =>
        R.compose(
          R.assocPath(['list', listId], R.__, state),
          R.concat(payload),
          R.pathOr([], ['list', listId]),
          R.always(state),
        )(),
      [setDetail]: (state, { payload }) =>
        R.assocPath(['entities', payload[keyField]], payload, state),
    },
    initialState,
  );

  return {
    initialState,
    actions,
    reducer,
  };
};

export default createReduxModule;
