import TV from './classes/TV.js';
import Users from './classes/Users.js';
import Puzzles from './classes/Puzzles.js';
import Relations from './classes/Relations.js';
import OpeningExplorer from './classes/OpeningExplorer.js';

export default class Lichess {
  private usersObject: Users;
  private relationsObject: Relations;
  private puzzlesObject: Puzzles;
  private openingExplorerObject: OpeningExplorer;
  private tvObject: TV
  
  constructor(token?: string) {
    this.usersObject = new Users(token);
    this.relationsObject = new Relations(token);
    this.puzzlesObject = new Puzzles(token);
    this.openingExplorerObject = new OpeningExplorer(token);
    this.tvObject = new TV(token);
  }

  get users() { return this.usersObject };
  get relations() { return this.relationsObject };
  get puzzles() { return this.puzzlesObject };
  get openingExplorer() { return this.openingExplorerObject };
  get tv() { return this.tvObject };
}

const elka = new Lichess()

elka.tv.streamCurrentTVGame().then(x =>
  x
    .on('error', (error) => Promise.reject(error))
    .on('data', (data) => {
        const elka = JSON.parse(data)
        console.log(elka)
    })
    .on('close', () => console.log('end')))

elka.tv.getBestOngoingGames('blitz', 'json', { clocks: true, moves: true, nb: 2, pgnInJson: true, opening: true, tags: true })
  .then(x => console.log(x[0].clocks)).catch(e => console.log(e.message))

setTimeout(() => elka.tv.stopCurrentTVGameStream(), 5000)