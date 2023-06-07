import BaseClass from './BaseClass.js';
import { mastersDatabase, masterResponse, lichessGamesRequest, playerGamesOpening, playerGamesOpeningResponse, pngJSON } from '../types.js';

export default class OpeningExplorer extends BaseClass {
  public async mastersDatabase(options?: mastersDatabase): Promise<masterResponse> {
    try {
      if (options?.topGames && (typeof options.topGames !== 'number' || options.topGames > 15)) throw new Error(`Invalid option 'topGames'. Must be number <= 15`)

      const queryArray = options ? Object.keys(options).map(x => `${x}=${options[x]}`) : []
      const query = queryArray.length ? '?' + queryArray.join('&') : ''

      const result = await this.request.get(`${this.explorer}/masters${query}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Games sampled from all Lichess players. Responds with a stream of newline delimited JSON. Will start indexing on demand, immediately respond with the current results, and stream more updates until indexing is complete. The stream is throttled and deduplicated. Empty lines may be sent to avoid timeouts. Will index new games at most once per minute, and revisit previously ongoing games at most once every day. */
  public async lichessGames(options?: lichessGamesRequest): Promise<masterResponse> {
    try {
      if (options?.topGames && (typeof options.topGames !== 'number' || options.topGames > 4)) throw new Error(`Invalid option 'topGames'. Must be number <= 4`)
      if (options?.recentGames && (typeof options.recentGames !== 'number' || options.recentGames > 4)) throw new Error(`Invalid option 'recentGames'. Must be number <= 4`)
      
      const queryArray = options
      ? Object.keys(options).map(x => Array.isArray(options[x]) ? `${x}=${options[x].join(',')}` : `${x}=${options[x]}`)
      : []
      
      const query = queryArray.length ? '?' + queryArray.join('&') : ''
      
      const result = await this.request.get(`${this.explorer}/lichess${query}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Games of a Lichess player */
  public async playerGames(options?: playerGamesOpening): Promise<playerGamesOpeningResponse> {
    try {
      if (options?.recentGames && (typeof options.recentGames !== 'number' || options.recentGames > 8)) throw new Error(`Invalid option 'recentGames'. Must be number <= 8`)
      const queryArray = options
      ? Object.keys(options).map(x => Array.isArray(options[x]) ? `${x}=${options[x].join(',')}` : `${x}=${options[x]}`)
      : []
      
      const query = queryArray.length ? '?' + queryArray.join('&') : ''
      const data = await this.gotStream(`${this.explorer}/player${query}`, 1);
      return Promise.resolve(JSON.parse(JSON.stringify(data[0])));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async OTBMasterGame<formatValue extends 'png' | 'json'>(gameId: string, format: formatValue) {
    try {
      const data = await this.request.get(`${this.explorer}/master/pgn/${gameId}`, { headers: { "accept":"application/x-ndjson" } });
      type resType = formatValue extends 'png' ? string : pngJSON;
      const result = format === 'png' ? data.body : this.pngParser(data.body);
      return Promise.resolve(result as resType);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}