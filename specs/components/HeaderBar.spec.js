import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { HeaderBar } from '../../src/containers/HeaderBar';
import { Link } from 'react-router';


describe("Navigation Bar", () => {
  
  it("contains logout button if loggedIn", function() {

  	const sampleUser = {"email":"sample@example.com", "loggedIn": true}

    const wrapper = shallow(
      <HeaderBar user={sampleUser}>
        <div className="unique" />
      </HeaderBar>
    );
    expect(wrapper.find('#logout-button').name()).to.equal('button');
  });

  it("doesnt contain logout link if not loggedIn", function() {

  	const sampleUser = {"email":"sample@example.com", "loggedIn": false}

    const wrapper = mount(<HeaderBar user={sampleUser} />);
    expect(wrapper.find('#logout-button')).to.have.length(0);
  });
});
