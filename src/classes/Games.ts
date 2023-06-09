import BaseClass from './BaseClass.js';
import { exportGame, exportGameResponse, exportGamesOptions } from '../types.js';

export default class Games extends BaseClass {

  private specialStream(url: string, headers: object): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const result = [];

      this.request.stream(url, headers)
        .on('error', (error) => reject(error))
        .on('data', (data) => result.push(data))
        .on('end', () => resolve(result))
    })
  }

  /** Download one game in either PGN or JSON format. Ongoing games have their last 3 moves omitted after move 5, as to prevent cheat bots from using this API. */
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
      if (options) Object.keys(options).forEach(x => queryArray.push(`${x}=${options[x]}`));
      const query = queryArray.length ? '?' + queryArray.join('&') : '';
      
      const acceptHeader = format === 'json' ? 'application/json' : 'application/x-chess-pgn';
      const data = await this.request(`${this.api}/user/${username}/current-game${query}`, { headers: { Accept: acceptHeader } });
      const result = format === 'json' ? JSON.parse(data.body) : data.body.trim()

      type resType = formatValue extends 'png' ? string : exportGameResponse;
      
      return Promise.resolve(result as resType);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Download all games of any user in PGN or ndjson format. Games are sorted by reverse chronological order (most recent first). */
  public async exportGamesUser<formatValue extends 'png' | 'json'>(username: string, format: formatValue, options?: exportGamesOptions) {
    try {
      if (!username || typeof username !== 'string' || !username.trim()) throw new Error(`Missing or invalid parameter 'username'`);

      const { since, until, max } = options;

      if (since && since < 1356998400070) throw new Error(`Invalid option 'since'. Must be integer >= 1356998400070`);
      if (until && until < 1356998400070) throw new Error(`Invalid option 'until'. Must be integer >= 1356998400070`);
      if (!max || typeof max !== 'number' || max < 1) options.max = 100;

      const queryArray = [];
      if (options) Object.keys(options).forEach(x => queryArray.push(`${x}=${options[x]}`));
      const query = queryArray.length ? '?' + queryArray.join('&') : '';

      const acceptHeader = format === 'json' ? 'application/x-ndjson' : 'application/x-chess-pgn';
      const data = await this.specialStream(`${this.api}/games/user/${username}${query}`, { headers: { ...this.headers, Accept: acceptHeader } });

      const splitData: string[] = [];

      if (format === 'json') {
        data.forEach(x => Buffer.from(x).toString('utf8').split('\n').filter(s => s).forEach(s => splitData.push(s)));
      } else {
        data.forEach(x => Buffer.from(x).toString('utf8').split('[Event').filter(s => s).map(s => '[Event' + s).forEach(s => splitData.push(s.trim())));
      }

      const result = format === 'json' ? splitData.map(x => JSON.parse(x)) : splitData.map(x => x);
      type resType = formatValue extends 'png' ? string[] : exportGameResponse[];

      return Promise.resolve(result as resType);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}