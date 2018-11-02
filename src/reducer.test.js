import reducer from './reducer';
import {restartGame, makeGuess, generateAuralUpdate} from './actions';

describe('reducer', () => {
	const guess1 = 50;
	const guess2 = 60;
	const correctAnswer = 65;

	it('Should set the initial state when noting is passed in', () => {
		const state = reducer(undefined, {type: '__UNKNOWN'});
		expect(state.guesses).toEqual([]);
		expect(state.feedback).toEqual('Make your guess!');
		expect(state.correctAnswer).toBeGreaterThanOrEqual(0);
		expect(state.correctAnswer).toBeLessThanOrEqual(100);
		expect(state.auralStatus).toEqual('');
	});

	it('Should return the current state on an unknown action', () => {
		let currentState = {};
		const state = reducer(currentState, {type: '__UNKNOWN'});
		expect(state).toBe(currentState);
	});

	describe('generateAuralUpdate', () => {
		it('Should update aural status', () => {
			let state = {
				guesses: [10, 20, 30],
				feedback: `You're Hot!`,
				auralStatus: ''
			};
			state = reducer(state, generateAuralUpdate());
			expect(state.auralStatus).toEqual(
				`Here's the status of the game right now: You're Hot! You've made 3 guesses. In order of most- to least-recent, they are: 30, 20, 10`
				)
		});
	});

	describe('restartGame', () => {
		it('Should restart the game', () => {
			let state = {
				guesses: [10, 20, 30],
				correctAnswer: 40
			};
			const correctAnswer = 50;
			state = reducer(state, restartGame(correctAnswer));
			expect(state.guesses).toEqual([]);
			expect(state.feedback).toEqual('Make your guess!');
			expect(state.correctAnswer).toEqual(correctAnswer);
			expect(state.auralStatus).toEqual('');
		});
	});

	describe('makeGuess', () => {
		it('Should make a guess', () => {
			let state = {
				guesses: [],
				feedback: '',
				correctAnswer: 100
			};
			state = reducer(state, makeGuess(80));
			expect(state.guesses).toEqual([80]);
			expect(state.feedback).toEqual(`You're Warm.`);
		});
	});
})