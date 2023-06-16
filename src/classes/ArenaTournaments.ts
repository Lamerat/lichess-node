import BaseClass from './BaseClass.js';
import { arenaTournamentsResponse, arenaTournamentDetails } from '../types.js';

export default class ArenaTournaments extends BaseClass {
  /** Get recently finished, ongoing, and upcoming tournaments */
  public async getCurrentTournaments(): Promise<arenaTournamentsResponse> {
    try {
      const result = await this.request.get(`${this.api}/tournament`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Get detailed info about recently finished, current, or upcoming tournament's duels, player standings, and other info */
  public async getInfoAboutArenaTournament(id: string): Promise<arenaTournamentDetails> {
    try {
      if (typeof id !== 'string' || !id.trim()) throw new Error(`Invalid parameter 'id'. Must be string!`)

      const result = await this.request.get(`${this.api}/tournament/${id}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
