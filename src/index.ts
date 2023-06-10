import TV from './classes/TV.js';
import Users from './classes/Users.js';
import Games from './classes/Games.js';
import Simuls from './classes/Simuls.js';
import Studies from './classes/Studies.js';
import Puzzles from './classes/Puzzles.js';
import Account from './classes/Account.js';
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
  private accountObject: Account;
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
    this.accountObject = new Account(token);
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
  get account() { return this.accountObject };
  get analysis() { return this.analysisObject };
  get relations() { return this.relationsObject };
  get openingExplorer() { return this.openingExplorerObject };
}



const main = async () => {
  try {
    const elka = new Lichess()

    const res = await elka.account.getMyKidModeStatus()
    const res1 = await elka.account.setMyKidModeStatus(false)

    console.log(res)
    console.log(res1)
    
  } catch (error) {
    console.log(error.message)
  }
}

main()
