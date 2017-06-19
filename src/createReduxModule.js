import { handleActions, createAction } from 'redux-actions';
import { assocPath } from 'ramda';

const createReduxModule = (
  {
    modulePrefix = 'modules/models/MODEL_NAME/redux',
    keyField = 'objectId',
  } = {},
) => {
  const initialState = {
    list: {
      all: [],
    },
    entities: {},
  };

  const setList = createAction(
    `${modulePrefix}:setList`,
    undefined,
    (payload, { path } = {}) => assocPath(['path'], path, {}),
  );
  const setDetail = createAction(`${modulePrefix}:setDetail`);

  const reducer = handleActions(
    {
      [setList]: (state, { payload, meta: { path = 'all' } }) =>
        assocPath(['list', path], payload, state),
      [setDetail]: (state, { payload }) =>
        assocPath(['entities', payload[keyField]], payload, state),
    },
    initialState,
  );

  return {
    initialState,
    setList,
    setDetail,
    default: reducer,
  };
};

export default createReduxModule;
