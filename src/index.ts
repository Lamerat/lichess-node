import Users from './classes/Users.js'
import Puzzles from './classes/Puzzles.js';
import Relations from './classes/Relations.js';
import OpeningExplorer from './classes/OpeningExplorer.js';

export default class Lichess {
  private usersObject: Users;
  private relationsObject: Relations;
  private puzzlesObject: Puzzles;
  private openingExplorerObject: OpeningExplorer;
  
  constructor(token?: string) {
    this.usersObject = new Users(token);
    this.relationsObject = new Relations(token);
    this.puzzlesObject = new Puzzles(token);
    this.openingExplorerObject = new OpeningExplorer(token);
  }

  get users() { return this.usersObject };
  get relations() { return this.relationsObject };
  get puzzles() { return this.puzzlesObject };
  get openingExplorer() { return this.openingExplorerObject };
}

const elka = new Lichess()
elka.openingExplorer.lichessGames({ variant: 'atomic' })
  .then(x => console.log(x)).catch(e => console.log(e.message))