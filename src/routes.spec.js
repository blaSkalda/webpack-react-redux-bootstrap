import React from 'react';
import { mount, configure } from 'enzyme';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import routes from './routes';

configure({ adapter: new Adapter() });

describe.only('Routes ', () => {
  const state = {
    messages: {
      data: [{
        id: 1,
        developer: 'Skalda',
      }],
      fetching: false,
    },
  };

  const fakeStore = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => state,
  };

  const fakeStoreFetching = {
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => ({
      messages: {
        data: [{
          id: 1,
          developer: 'Skalda',
        }],
        fetching: true,
      },
    }),
  };

  const renderRoutes = (store) => mount(
    <HashRouter>
      <Provider store={store}>{routes}</Provider>
    </HashRouter>,
  );

  it('should match default route to home page and not fetching data', () => {
    expect(renderRoutes(fakeStore).find('.home-page').length).toEqual(1);
  });

  it('should match default route to home page with not authenticated user', () => {
    const wrapper = renderRoutes(fakeStoreFetching);
    expect(
      wrapper.find('.home-page').length,
    ).toEqual(1);
  });
});
