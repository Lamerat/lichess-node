import TV from './classes/TV.js';
import Users from './classes/Users.js';
import Games from './classes/Games.js';
import Teams from './classes/Teams.js';
import Simuls from './classes/Simuls.js';
import Studies from './classes/Studies.js';
import Puzzles from './classes/Puzzles.js';
import Account from './classes/Account.js';
import Analysis from './classes/Analysis.js';
import Relations from './classes/Relations.js';
import Tablebase from './classes/Tablebase.js';
import Messaging from './classes/Messaging.js';
import Broadcasts from './classes/Broadcasts.js';
import ExternalEngine from './classes/ExternalEngine.js';
import OpeningExplorer from './classes/OpeningExplorer.js';
import ArenaTournaments from './classes/ArenaTournaments.js';

export default class Lichess {
  private tvObject: TV;
  private usersObject: Users;
  private gamesObject: Games;
  private teamsObject: Teams;
  private simulsObject: Simuls;
  private puzzlesObject: Puzzles;
  private studiesObject: Studies;
  private accountObject: Account;
  private tableObject: Tablebase;
  private analysisObject: Analysis;
  private messageObject: Messaging;
  private relationsObject: Relations;
  private broadcastsObject: Broadcasts;
  private externalEnginesObject: ExternalEngine;
  private openingExplorerObject: OpeningExplorer;
  private arenaTournamentsObject: ArenaTournaments;

  
  constructor(token?: string) {
    this.tvObject = new TV(token);
    this.usersObject = new Users(token);
    this.gamesObject = new Games(token);
    this.teamsObject = new Teams(token);
    this.simulsObject = new Simuls(token);
    this.studiesObject = new Studies(token);
    this.tableObject = new Tablebase(token);
    this.puzzlesObject = new Puzzles(token);
    this.accountObject = new Account(token);
    this.analysisObject = new Analysis(token);
    this.messageObject = new Messaging(token);
    this.relationsObject = new Relations(token);
    this.broadcastsObject = new Broadcasts(token);
    this.openingExplorerObject = new OpeningExplorer(token);
    this.arenaTournamentsObject = new ArenaTournaments(token);
    this.externalEnginesObject = new ExternalEngine(token);
  }

  get tv() { return this.tvObject; }
  get users() { return this.usersObject; }
  get games() { return this.gamesObject; }
  get teams() { return this.teamsObject; }
  get simuls() { return this.simulsObject; }
  get puzzles() { return this.puzzlesObject; }
  get tablebase() { return this.tableObject; }
  get studies() { return this.studiesObject; }
  get account() { return this.accountObject; }
  get analysis() { return this.analysisObject; }
  get messaging() { return this.messageObject; }
  get relations() { return this.relationsObject; }
  get broadcasts() { return this.broadcastsObject; }
  get externalEngine() { return this.externalEnginesObject; }
  get openingExplorer() { return this.openingExplorerObject; }
  get arenaTournaments() { return this.arenaTournamentsObject; }
}

const elka = new Lichess('lip_1sxViZxTVc3UKVOWuJMm');

// elka.externalEngine.listExternalEngines()

elka.externalEngine.createExternalEngine({
  name: 'myTestEngine',
  maxThreads: 1,
  maxHash: 1,
  defaultDepth: 0,
  providerSecret: 'minLengthIs16characters'
})
// elka.externalEngine.getExternalEngine('eei_jQ6erJtMOqey')
// elka.externalEngine.updateExternalEngine('eei_jQ6erJtMOqey', {
//   name: 'myTestEngine2',
//   maxThreads: 3,
//   maxHash: 1,
//   defaultDepth: 3,
//   variants: ['atomic', 'chess', 'horde'],
//   providerSecret: 'minLengthIs16characters22'
// })
// elka.externalEngine.deleteExternalEngine('eei_jQ6erJtMOqey')
  .then(x => console.log(x))
  .catch(e => console.log(e.message));