import TV from './classes/TV.js';
import Users from './classes/Users.js';
import Games from './classes/Games.js';
import Simuls from './classes/Simuls.js';
import Puzzles from './classes/Puzzles.js';
import Analysis from './classes/Analysis.js';
import Relations from './classes/Relations.js';
import Tablebase from './classes/Tablebase.js';
import OpeningExplorer from './classes/OpeningExplorer.js';

export default class Lichess {
  private usersObject: Users;
  private relationsObject: Relations;
  private puzzlesObject: Puzzles;
  private openingExplorerObject: OpeningExplorer;
  private tvObject: TV;
  private analysisObject: Analysis;
  private tableObject: Tablebase;
  private simulsObject: Simuls;
  private gamesObject: Games;
  
  constructor(token?: string) {
    this.usersObject = new Users(token);
    this.relationsObject = new Relations(token);
    this.puzzlesObject = new Puzzles(token);
    this.openingExplorerObject = new OpeningExplorer(token);
    this.tvObject = new TV(token);
    this.analysisObject = new Analysis(token);
    this.tableObject = new Tablebase(token);
    this.simulsObject = new Simuls(token);
    this.gamesObject = new Games(token);
  }

  get users() { return this.usersObject };
  get relations() { return this.relationsObject };
  get puzzles() { return this.puzzlesObject };
  get openingExplorer() { return this.openingExplorerObject };
  get tv() { return this.tvObject };
  get analysis() { return this.analysisObject };
  get tablebase() { return this.tableObject };
  get simuls() { return this.simulsObject };
  get games() { return this.gamesObject };
}

const elka = new Lichess()

// elka.analysis.getCloudEvaluation({ fen: 'rnbqkbnr/ppp1pppp/8/3pP3/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2', variant: 'standard' })
//   .then(x => console.log(x))
//   .catch(e => console.log(e.message))

elka.games.exportOneGame('VgOsDjmn', 'json', { clocks: true, players: 'https://gist.githubusercontent.com/ornicar/6bfa91eb61a2dcae7bcd14cce1b2a4eb/raw/768b9f6cc8a8471d2555e47ba40fb0095e5fba37/gistfile1.txt' })
  .then(x => console.log(x))
  .catch(e => console.log(e.message))