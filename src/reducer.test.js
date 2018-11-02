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
		expect(state.auralStatus).toEqual('');
	});

	it('Should return the current state on an unknown action', () => {
		let currentState = {};
		const state = reducer(currentState, {type: '__UNKNOWN'});
		expect(state).toBe(currentState);
	});

	describe('generateAuralUpdate', () => {
		it('Should update aural status', () => {
			let state;
			state = reducer(state, makeGuess(50));
			state = reducer(state, generateAuralUpdate());
			expect(state.auralStatus).not.toBeNull();
		});
	});

	describe('restartGame', () => {
		it('Should restart the game', () => {
			let state;
			state = reducer(state, makeGuess(50));
			state = reducer(state, restartGame());
			expect(state.guesses).toEqual([]);
			expect(state.feedback).toEqual('Make your guess!');
			expect(state.auralStatus).toEqual('');
		});
	});

	describe('makeGuess', () => {
		it('Should make a guess', () => {
			let state;
			state = reducer(state, makeGuess(80));
			expect(state.guesses).toEqual([80]);
		});
	});

})