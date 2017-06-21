import createReduxModule from 'redux-modular-model/lib/createReduxModule';

const { actions, reducer } = createReduxModule({
  modulePrefix: 'modules/models/Post/redux',
});

export { actions, reducer as default };
