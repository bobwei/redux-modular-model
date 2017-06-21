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
  const { concat, setDetail } = actions;

  /* reducer */
  const reducer = handleActions(
    {
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
