import { createAction } from 'redux-actions';

const createActions = modulePrefix => {
  const listMetaCreator = (payload, { listId = 'all' } = {}) => ({ listId });

  const clear = createAction(
    `${modulePrefix}:clear`,
    undefined,
    listMetaCreator,
  );
  const concat = createAction(
    `${modulePrefix}:concat`,
    undefined,
    listMetaCreator,
  );
  const setDetail = createAction(`${modulePrefix}:setDetail`);

  return {
    clear,
    concat,
    setDetail,
  };
};

export default createActions;
