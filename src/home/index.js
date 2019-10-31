// @flow

import { connect } from 'react-redux';
import Home from './home';
import { getMessages, getMessage } from '../services/messages';

const mapState = ({ messages }) => ({
  messages,
});

const mapDispatch = {
  getMessages,
  getMessage,
};

export default connect(
  mapState,
  mapDispatch,
)(Home);
