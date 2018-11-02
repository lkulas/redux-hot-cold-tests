import React from 'react';
import {shallow, mount} from 'enzyme';

import AuralStatus from './aural-status';

describe('<AuralStatus />', () => {

	it('Renders without crashing', () => {
		shallow(<AuralStatus />);
	});

	it('Renders a status update', () => {
		let status = 'This is a test status';
		let wrapper = shallow(<AuralStatus auralStatus={status} />);
		expect(wrapper.contains(status)).toEqual(true);
	});
});