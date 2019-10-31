import React from 'react';
import PropTypes from 'prop-types';

import './home.scss';

class Home extends React.PureComponent {
  render() {
    const { messages, getMessages, getMessage } = this.props;
    return (
      <div className="home-page">
        <header>
          <div className="navbar navbar-dark bg-dark shadow-sm">
            <div className="container d-flex justify-content-between">
              <a href="#home" className="navbar-brand d-flex align-items-center">
                <strong>React/Redux quick start</strong>
              </a>
            </div>
          </div>
        </header>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <button type="button" id="get-messages" className="btn btn-primary" onClick={() => getMessages()}>Get messages</button>
              </div>
              <div className="col-sm">
                <button type="button" id="get-message" className="btn btn-secondary" onClick={() => getMessage(1)}>Get message 1</button>
              </div>
            </div>
            {messages.data && messages.data.length > 0 && (
              <div className="row">
                <div className="col-sm">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        messages.data.map((d) => (
                          <tr key={d.id}>
                            <td>{d.id}</td>
                            <td>{d.developer}</td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="row">
              <div className="col-md-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  messages: PropTypes.exact({
    fetching: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(PropTypes.exact({
      id: PropTypes.number.isRequired,
      developer: PropTypes.string,
    })),
  }).isRequired,
  getMessages: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
};


export default Home;
