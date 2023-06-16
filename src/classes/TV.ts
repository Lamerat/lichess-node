import BaseClass from './BaseClass.js';
import { tvGames, streamGame, streamGameResponse } from '../types.js';
import { Request } from 'got';

export default class TV extends BaseClass {
  private stream: Request;

  /** Get basic info about the best games being played for each speed and variant, but also computer games and bot games */
  public async getCurrentGames(): Promise<tvGames> {
    try {
      const result = await this.request(`${this.api}/tv/channels`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Stream positions and moves of the current TV game in ndjson. A summary of the game is sent as a first message, and when the featured game changes */
  public async streamCurrentTVGame(): Promise<Request> {
    try {
      this.stream = this.request.stream(`${this.api}/tv/feed`);
      return Promise.resolve(this.stream);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Close stream current games */
  public stopCurrentTVGameStream() {
    try {
      if (this.stream) {
        this.stream.destroy();
        this.stream = null;
      } else {
        throw new Error(`Can't find active stream`);
      }

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Get a list of ongoing games for a given TV channel. Similar to lichess.org/games. Available in PGN or ndjson format, depending on the request Accept header */
  public async getBestOngoingGames<formatValue extends 'png' | 'json'>(channel: string, format: formatValue, options?: streamGame,) {
    try {
      const { clocks, moves, nb, opening, pgnInJson, tags } = options;

      if (!channel || typeof channel !== 'string' || !channel.toString().trim()) throw new Error(`Missing or invalid option 'channel'. Must be string!`);
      if (nb && (typeof nb !== 'number' || nb < 1 || nb > 30)) throw new Error(`Invalid option 'nb'. Must be number >= 1 and <= 30!`);
      if (clocks !== undefined && typeof clocks !== 'boolean') throw new Error(`Invalid option 'clocks'. Must be boolean!`);
      if (moves !== undefined && typeof moves !== 'boolean') throw new Error(`Invalid option 'moves'. Must be boolean!`);
      if (opening !== undefined && typeof opening !== 'boolean') throw new Error(`Invalid option 'opening'. Must be boolean!`);
      if (pgnInJson !== undefined && typeof pgnInJson !== 'boolean') throw new Error(`Invalid option 'pgnInJson'. Must be boolean!`);
      if (tags !== undefined && typeof tags !== 'boolean') throw new Error(`Invalid option 'tags'. Must be boolean!`);

      const queryArray = [];
      Object.keys(options).filter(x => x !== 'channel' && x !== 'format').forEach(x => {
        if (options[x]) queryArray.push(`${x}=${options[x]}`);
      });

      type resType = formatValue extends 'png' ? string[] : streamGameResponse[];

      const query = queryArray.length ? '?' + queryArray.join('&') : '';
      const acceptHeader = format === 'json' ? 'application/x-ndjson' : 'application/x-chess-pgn';
      const data = await this.request(`${this.api}/tv/${channel}${query}`, { headers: { Accept: acceptHeader } });
      const result = format === 'json' ? data.body.trim().split(/\n/).map(s => JSON.parse(s)) : data.body.trim().split(/\[Event/).map(x => '[Event'.concat(x).trim());
      
      return Promise.resolve(result as resType);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}