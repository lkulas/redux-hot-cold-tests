import React from 'react';
import {shallow, mount} from 'enzyme';

import GuessSection from './guess-section';

describe('<GuessSection />', () => {
	it('Renders without crashing', () => {
		shallow(<GuessSection />);
	});
});