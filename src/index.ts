import TV from './classes/TV.js';
import Users from './classes/Users.js';
import Games from './classes/Games.js';
import Simuls from './classes/Simuls.js';
import Studies from './classes/Studies.js';
import Puzzles from './classes/Puzzles.js';
import Analysis from './classes/Analysis.js';
import Relations from './classes/Relations.js';
import Tablebase from './classes/Tablebase.js';
import OpeningExplorer from './classes/OpeningExplorer.js';

export default class Lichess {
  private tvObject: TV;
  private usersObject: Users;
  private gamesObject: Games;
  private simulsObject: Simuls;
  private puzzlesObject: Puzzles;
  private studiesObject: Studies;
  private tableObject: Tablebase;
  private analysisObject: Analysis;
  private relationsObject: Relations;
  private openingExplorerObject: OpeningExplorer;
  
  constructor(token?: string) {
    this.tvObject = new TV(token);
    this.usersObject = new Users(token);
    this.gamesObject = new Games(token);
    this.simulsObject = new Simuls(token);
    this.studiesObject = new Studies(token);
    this.tableObject = new Tablebase(token);
    this.puzzlesObject = new Puzzles(token);
    this.analysisObject = new Analysis(token);
    this.relationsObject = new Relations(token);
    this.openingExplorerObject = new OpeningExplorer(token);
  }

  get tv() { return this.tvObject };
  get users() { return this.usersObject };
  get games() { return this.gamesObject };
  get simuls() { return this.simulsObject };
  get puzzles() { return this.puzzlesObject };
  get tablebase() { return this.tableObject };
  get studies() { return this.studiesObject };
  get analysis() { return this.analysisObject };
  get relations() { return this.relationsObject };
  get openingExplorer() { return this.openingExplorerObject };
}



const elka = new Lichess()

elka.studies.listStudiesUser('sea_flanker', 10)
  .then(x => console.log(x.map(x => x.id)))
  .catch(e => console.log(e.message))
