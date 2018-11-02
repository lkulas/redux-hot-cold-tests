import React from 'react';
import {shallow, mount} from 'enzyme';

import GuessCount from './guess-count';

describe('<GuessCount />', () => {
	it('Renders without crashing', () => {
		shallow(<GuessCount />);
	});

	it('Should render a guess count', () => {
		const guessCount = 5;
		const wrapper = shallow(<GuessCount guessCount={guessCount}/>);

		expect(wrapper.contains(guessCount)).toEqual(true);
	});
});