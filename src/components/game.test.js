import React from 'react';
import {shallow, mount} from 'enzyme';

import Game from './game';

describe('<Game />', () => {

	it('Renders without crashing', () => {
		shallow(<Game />);
	});

	it('Has correct initial state', () => {
		const wrapper = shallow(<Game />);

		expect(wrapper.state('guesses')).toHaveLength(0);
		expect(wrapper.state('feedback')).toEqual('Make your guess!');
		expect(wrapper.state('auralStatus')).toEqual('');
		expect(wrapper.state('correctAnswer')).toBeGreaterThanOrEqual(0);
		expect(wrapper.state('correctAnswer')).toBeLessThanOrEqual(100);
	});

	it('Can restart a game', () => {
		const wrapper = shallow(<Game />);

		wrapper.setState({
			guesses: [10, 20, 25, 26],
			feedback: 'Test feedback',
			correctAnswer: -1
		});

		wrapper.instance().restartGame();

		expect(wrapper.state('guesses')).toHaveLength(0);
		expect(wrapper.state('feedback')).toEqual('Make your guess!');
		expect(wrapper.state('auralStatus')).toEqual('');
		expect(wrapper.state('correctAnswer')).toBeGreaterThanOrEqual(0);
		expect(wrapper.state('correctAnswer')).toBeLessThanOrEqual(100);		
	});

	it('Can make a guess', () => {
		const wrapper = shallow(<Game />);

		wrapper.setState({
			correctAnswer: 1
		});

		wrapper.instance().makeGuess(60);
		expect(wrapper.state('guesses')).toEqual([60]);
		expect(wrapper.state('feedback')).toEqual('You\'re Ice Cold...');

		wrapper.instance().makeGuess(35);
		expect(wrapper.state('guesses')).toEqual([60, 35]);
		expect(wrapper.state('feedback')).toEqual('You\'re Cold...');

		wrapper.instance().makeGuess(15);
		expect(wrapper.state('guesses')).toEqual([60, 35, 15]);
		expect(wrapper.state('feedback')).toEqual('You\'re Warm.');

		wrapper.instance().makeGuess(5);
		expect(wrapper.state('guesses')).toEqual([60, 35, 15, 5]);
		expect(wrapper.state('feedback')).toEqual('You\'re Hot!');

		wrapper.instance().makeGuess(1);
		expect(wrapper.state('guesses')).toEqual([60, 35, 15, 5, 1]);
		expect(wrapper.state('feedback')).toEqual('You got it!');
	});

	it('Generates aural updates', () => {
		const wrapper = shallow(<Game />);

		wrapper.setState({
			correctAnswer: 1
		});

		wrapper.instance().makeGuess(10);
		wrapper.instance().generateAuralUpdate();

		expect(wrapper.state('auralStatus')).toEqual('Here\'s the status of the game right now: You\'re Hot! You\'ve made 1 guess. It was: 10')
	});
});