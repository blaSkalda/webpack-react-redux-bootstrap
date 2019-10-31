/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './home';

Enzyme.configure({ adapter: new Adapter() });

describe('<Home />', () => {
  const props = {
    messages: {
      data: [],
      fetching: false,
    },
    getMessages: jest.fn(),
    getMessage: jest.fn(),
  };

  it('renders <Home />', () => {
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders <Home /> component and triggers get messages', () => {
    const wrapper = shallow(<Home {...props} />);
    props.getMessages.mockReset();

    wrapper.find('#get-messages').simulate('click');

    expect(props.getMessages.mock.calls.length).toEqual(1);
  });

  it('renders <Home /> component and triggers get message', () => {
    const wrapper = shallow(<Home {...props} />);
    props.getMessage.mockReset();

    wrapper.find('#get-message').simulate('click');

    expect(props.getMessage.mock.calls.length).toEqual(1);
  });
});
