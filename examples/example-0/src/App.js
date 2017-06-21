import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import R from 'ramda';
import { actions as postActions } from './models/Post/redux';

import './App.css';

const App = ({ posts }) =>
  <div>
    {posts.map(({ objectId, title }) =>
      <div key={objectId}>
        {title}
      </div>,
    )}
  </div>;

export default compose(
  connect(
    R.applySpec({
      posts: R.pathOr([], ['Post', 'list', 'all']),
    }),
    dispatch => bindActionCreators(postActions, dispatch),
  ),
  lifecycle({
    componentDidMount() {
      const { concat } = this.props;
      concat(
        [...new Array(10)].map((obj, i) => ({
          objectId: i,
          title: `title ${i}`,
        })),
      );
    },
  }),
)(App);
