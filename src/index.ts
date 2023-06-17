import TV from './classes/TV.js';
import Bot from './classes/Bot.js';
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
  private botObject: Bot;
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
    this.botObject = new Bot(token);
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
  get bot() { return this.botObject; }
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
