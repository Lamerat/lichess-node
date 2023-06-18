import Lichess from '../src/index.js';
import { expect } from 'chai';
import 'dotenv/config';

const token = process.env.TOKEN;

describe('Simuls', function() {
  it('With wrong auth token', async function() {
    const chess = new Lichess('invalidToken');
    try {
      await chess.simuls.getCurrentSimuls();
    } catch (error) {
      expect(error.name).equal('HTTPError');
      expect(error.message.error).equal('No such token');
    }
  });

  it('With right auth token', async function() {
    const chess = new Lichess(token);
    const res = await chess.simuls.getCurrentSimuls();
    expect(res).property('created');
    expect(res).property('pending');
    expect(res).property('finished');
    expect(res).property('started');
  });

  it('Without auth token', async function() {
    const chess = new Lichess();
    const res = await chess.simuls.getCurrentSimuls();
    expect(res).property('created');
    expect(res).property('pending');
    expect(res).property('finished');
    expect(res).property('started');
  });
});

describe('Puzzle', function() {
  const chess = new Lichess(token);
  let puzzleId: string; 

  it('Get the daily puzzle', async function() {
    const res = await chess.puzzles.getTheDailyPuzzle();
    expect(res).property('game');
    expect(res).property('puzzle');
    puzzleId = res.puzzle.id;
  });

  it('Get a puzzle by its ID', async function() {
    const res = await chess.puzzles.getPuzzleByID(puzzleId);
    expect(res).property('game');
    expect(res).property('puzzle');
  });

  it('Get your puzzle activity', async function() {
    const res = await chess.puzzles.getYourPuzzleActivity();
    expect(Array.isArray(res)).true;

    if (res.length) {
      expect(res[0]).property('puzzle');
      expect(res[0]).property('date');
      expect(res[0]).property('win');
    }

    await chess.puzzles.getYourPuzzleActivity({ max: -10 }).catch(error => expect(error.message).equals(`Invalid option 'max'. Must be >= 1`));
    await chess.puzzles.getYourPuzzleActivity({ before: 100 }).catch(error => expect(error.message).equals(`Invalid option 'max'. Must be >= 1356998400070`));
  });
});
