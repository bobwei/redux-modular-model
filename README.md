# redux-modular-model

Create reusable redux modules for CRUD models with ease.

[Redux module](https://github.com/erikras/ducks-modular-redux) is a proposal for bundling reducers, action types and actions when using Redux.

- [Usage Example](#usage-example)
- [References](#reference)


## Usage Example

#### src/models/Post/redux/index.js

Create redux module for each models

```js
import createReduxModule from 'redux-modular-model/lib/createReduxModule';

const { actions, reducer } = createReduxModule({
  modulePrefix: 'modules/models/Post/redux',
});

export { actions, reducer as default };
```

#### src/index.js

Combine reducers for each models with combineReducers

```js
import postReducr from './models/Post/redux';

const rootReducer = combineReducers({
  Post: postReducr,
});
const store = createStore(rootReducer)
```

Then we will have the same state tree for each model

```js
const state = {
  Post: {
    list: {
      all: [],
    },
    entities: {},
  },
};
```

We can use built-in actions to update state for each model.

```js
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import compose from 'recompose/compose';

import { actions as postActions } from 'models/Post/redux';

/*
  Fetch post list from api and concat results to all list.
*/
class Page extends React.Component {
  componentDidMount() {
    const { concat } = this.props;
    API
      .getPostList()
      .then(results => concat(results));
  }

  render() {
    ...
  }
}

export default compose(
  connect(
    state => ({
      posts: state.Post.list.all,
    }),
    dispatch => bindActionCreators(postActions, dispatch),
  ),
)(Page);
```

Then state tree will become
```js
const state = {
  Post: {
    list: {
      all: [
        {
          objectId: 1,
          title: 'post 1',
        },
        {
          objectId: 2,
          title: 'post 2',
        },
      ],
    },
    entities: {},
  },
};
```


## References

- [Reusing Reducer Logic](http://redux.js.org/docs/recipes/reducers/ReusingReducerLogic.html)
