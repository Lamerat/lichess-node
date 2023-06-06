import BaseClass from './BaseClass.js';
import { userPublicData } from '../types.js';

export default class Relations extends BaseClass {
  /** Get users followed by the logged in user */
  public async getUsersFollowed(limit: number = 10): Promise<userPublicData[]> {
    try {
      if (typeof limit !== 'number' || limit < 1) throw new Error(`Invalid option 'limit'. Must be number bigger for zero`)

      const data = await this.gotStream(`${this.api}/rel/following`, limit);
      const result = JSON.parse(JSON.stringify(data));
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Follow or unfollow a player, adding or remove them to your list of Lichess friends. */
  public async followUnfollowPlayer(options: { username: string, action: 'follow' | 'unfollow' }): Promise<{ ok: boolean }> {
    try {
      const { username, action } = options;
      if (!username || typeof username !== 'string' || !username.trim().length) throw new Error(`Missing or invalid option 'username'! Must be string with min 1 symbol.`);
      if (!action || typeof action !== 'string') throw new Error(`Missing or invalid option 'action'! Must be follow or unfollow`);

      const result = await this.request.post(`${this.api}/rel/${action}/${username}`, { headers: { ...this.headers } });
      return Promise.resolve(JSON.parse(result.body))
    } catch (error) {
      return Promise.reject(error);
    }
  }
}