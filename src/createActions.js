import { createAction } from 'redux-actions';

const createActions = modulePrefix => {
  const concat = createAction(
    `${modulePrefix}:concat`,
    undefined,
    (payload, { listId = 'all' } = {}) => ({ listId }),
  );
  const setDetail = createAction(`${modulePrefix}:setDetail`);

  return {
    concat,
    setDetail,
  };
};

export default createActions;
