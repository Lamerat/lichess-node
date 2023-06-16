import BaseClass from './BaseClass.js';
import { puzzleType, yourPuzzle, puzzleDashBoardResponse, stormDashboardResponse } from '../types.js';

export default class Puzzles extends BaseClass {
  /** Get the daily puzzle */
  public async getTheDailyPuzzle(): Promise<puzzleType> {
    try {
      const result = await this.request.get(`${this.api}/puzzle/daily`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Get a single Lichess puzzle in JSON format */
  public async getPuzzleByID(id: string): Promise<puzzleType> {
    try {
      if (!id || typeof id !== 'string' || !id.trim().length) throw new Error(`Missing or invalid option 'id'!`);
      const result = await this.request.get(`${this.api}/puzzle/${id}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Download your puzzle activity in ndjson format */
  public async getYourPuzzleActivity(options?: { max?: number, before?: number }): Promise<yourPuzzle[]> {
    try {
      const max = options?.max || 1;
      const before = options?.before || 1356998400070;

      if (max < 1) throw new Error(`Invalid option 'max'. Must be >= 1`);
      if (before < 1356998400070) throw new Error(`Invalid option 'max'. Must be >= 1356998400070`);

      const queryArray = options
      ? Object.keys(options).map(x => Array.isArray(options[x]) ? `${x}=${options[x].join(',')}` : `${x}=${options[x]}`)
      : [];
      
      const query = queryArray.length ? '?' + queryArray.join('&') : '';
      const data = await this.gotStream(`${this.api}/puzzle/activity${query}`, max);

      return Promise.resolve(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Download your puzzle dashboard as JSON. Also includes all puzzle themes played, with aggregated results */
  public async getYourPuzzleDashboard(options: { days: number }): Promise<puzzleDashBoardResponse> {
    try {
      const { days } = options;
      if (!days || typeof days !== 'number' || days < 1) throw new Error(`Missing or invalid option days. Must be number >= 1`);
      console.log(`${this.api}/puzzle/dashboard/${days}`);

      const result = await this.request.get(`${this.api}/puzzle/dashboard/${days}`, { headers: { ...this.headers } });
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Get the storm dashboard of a player. Download the storm dashboard of any player as JSON. Contains the aggregated high scores, and the history of storm runs aggregated by days. Use ?days=0 if you only care about the high scores */
  public async getTheStormDashboardOfPlayer(options: { username: string, days?: number }): Promise<stormDashboardResponse> {
    try {
      const { username, days } = options;
      if (!username || typeof username !== 'string' || !username.trim().length) throw new Error(`Missing or invalid option 'username'! Must be string with min 1 symbol.`);
      if (days && (typeof days !== 'number' || days < 0 || days > 365)) throw new Error(`Invalid option 'days'. Must be number >= 0 and <= 365`);

      const query = days !== undefined ? `?days=${days}` : '';
      const result = await this.request.get(`${this.api}/storm/dashboard/${username}${query}`);

      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Create a new private puzzle race. The Lichess user who creates the race must join the race page, and manually start the race when enough players have joined */
  public async createAndJoinPuzzleRace(): Promise<{ id: string, url: string }> {
    try {
      const result = await this.request.post(`${this.api}/racer`, { headers: { ...this.headers } });
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

