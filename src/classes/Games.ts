import BaseClass from './BaseClass.js';
import { exportGame, exportGameResponse } from '../types.js';

export default class Games extends BaseClass {
  public async exportOneGame<formatValue extends 'png' | 'json'>(gameId: string, format: formatValue, options?: exportGame) {
    try {
      if (!gameId || typeof gameId !== 'string' || gameId.length !== 8) throw new Error(`Missing or invalid parameter 'gameId'. Must be 8 characters string!`)
      
      const queryArray = [];
      if (options) Object.keys(options).forEach(x => queryArray.push(`${x}=${options[x]}`))
      const query = queryArray.length ? '?' + queryArray.join('&') : '';

      const acceptHeader = format === 'json' ? 'application/json' : 'application/x-chess-pgn';
      const data = await this.request(`${this.gameAddress}/export/${gameId}${query}`, { headers: { Accept: acceptHeader } });
      const result = format === 'json' ? JSON.parse(data.body) : data.body.trim()

      type resType = formatValue extends 'png' ? string : exportGameResponse;

      return Promise.resolve(result as resType);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Download the ongoing game, or the last game played, of a user. Available in either PGN or JSON format.
   * Ongoing games have their last 3 moves omitted after move 5, as to prevent cheat bots from using this API.
  */
  public async exportOngoingGameUser<formatValue extends 'png' | 'json'>(username: string, format: formatValue, options?: exportGame) {
    try {
      if (!username || typeof username !== 'string' || !username.trim()) throw new Error(`Missing or invalid parameter 'username'`)
      
      const queryArray = [];
      if (options) Object.keys(options).forEach(x => queryArray.push(`${x}=${options[x]}`))
      const query = queryArray.length ? '?' + queryArray.join('&') : '';

      const acceptHeader = format === 'json' ? 'application/json' : 'application/x-chess-pgn';
      const data = await this.request(`${this.api}/user/${username}${query}`, { headers: { Accept: acceptHeader } });
      const result = format === 'json' ? JSON.parse(data.body) : data.body.trim()
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}