import { playerObject, realTimeUser, perfType, topTenObject, userPublicData, performanceStatisticsUser, userById } from './types.js';
import { teamMember } from './types.js';
import got from 'got';
import ndJSON from 'ndjson'


export default class Lichess {
  private static api: string = 'https://lichess.org/api';
  private static validPerfType = ['ultraBullet', 'bullet', 'blitz', 'rapid', 'classical', 'chess960', 'crazyhouse', 'antichess', 'atomic', 'horde', 'kingOfTheHill', 'racingKings', 'threeCheck'];
  private token: string = null;
  private headers: object;
  private static request = got.extend({
    hooks: {
      beforeError: [
        (error: any) => {
          const { response } = error;
          if (response && response.body) {
            error.message = response.body.error
            error.code = response.statusCode
          }
          return error;
        }
      ]
    },
    mutableDefaults: true
  })
  

  constructor(token: string = null) {
    this.token = token;
    this.headers = token ? { Authorization: `Bearer ${this.token}` } : {}
  }


  private gotStream(url: string, limit: number = 100) {
    return new Promise((resolve, reject) => {
      const result = [];
      let counter = 1;

      const stream = Lichess.request.stream(url, { headers: { ...this.headers } })
        .on('error', (error) => reject(error))
        .pipe(ndJSON.parse())
        .on('data', (data) => {
          result.push(data)
          if (counter >= limit) stream.end()
          counter = counter + 1
        })
        .on('end', () => resolve(result))
    })
  }


  /** Get real-time users status */
  public async getRealTimeUsersStatus(options: { ids: string[], withGameIds?: boolean }): Promise<realTimeUser[]> {
    try {
      const { ids, withGameIds = false } = options;

      if (!ids) throw new Error(`Missing option 'ids'!`);
      if (!Array.isArray(ids) || ids.length === 0 || ids.length > 100) throw new Error(`Option 'ids' must be array with min. 1 record and max 100 records!`);
      if (ids.some(x => typeof x !== 'string')) throw new Error(`'Option 'ids' must be array of strings!`);

      const query = `?ids=${ids.join(',')}&withGameIds=${withGameIds}`;
      const result = await Lichess.request.get(`${Lichess.api}/users/status${query}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }


  /** Get the top 10 players for each speed and variant */
  public async getAllTopTen(): Promise<playerObject> {
    try {
      const result = await Lichess.request.get(`${Lichess.api}/player`);
      return Promise.resolve(JSON.parse(result.body))
    } catch (error) {
      return Promise.reject(error)
    }
  }


  /** Get the leaderboard for a single speed or variant (a.k.a. perfType). There is no leaderboard for correspondence or puzzles */
  public async getOneLeaderboard(options: { nb: number, perfType: perfType }): Promise<{ users: topTenObject[] }> {
    try {
      const { nb, perfType } = options

      if (typeof nb !== 'number' || nb < 1 || nb > 200) throw new Error(`Option 'nb' must be number between 1 - 200!`)
      if (!Lichess.validPerfType.includes(perfType)) throw new Error(`Option 'perfType' is invalid! Valid is ${Lichess.validPerfType.join(' | ')}.`)

      const result = await Lichess.request.get(`${Lichess.api}/player/top/${nb}/${perfType}`, { headers: { Accept: 'application/vnd.lichess.v3+json' } });
      return Promise.resolve(JSON.parse(result.body))
    } catch (error) {
      return Promise.reject(error)
    }
  }


  /** Read public data of a user */
  public async getUserPublicData(options: { username: string, trophies?: boolean }): Promise<userPublicData> {
    try {
      const { username, trophies = false } = options

      if (!username || typeof username !== 'string' || !username.trim().length) throw new Error(`Missing or invalid option 'username'! Must be string with min 1 symbol.`)
      if (typeof trophies !== 'boolean') throw new Error(`Invalid option 'trophies'! Must be boolean.`)

      const result = await Lichess.request.get(`${Lichess.api}/user/${username}?${trophies}`, { headers: { ...this.headers } });
      return Promise.resolve(JSON.parse(result.body))
    } catch (error) {
      return Promise.reject(error)
    }
  }


  /** Read rating history of a user, for all perf types. There is at most one entry per day. Format of an entry is [year, month, day, rating]. month starts at zero (January) */
  public async getRatingHistoryOfUser(options: { username: string, response?: 'raw' | 'formatted' }): Promise<{ name: string, points: number[] }[]> {
    try {
      const { username, response = 'raw' } = options

      if (!username || typeof username !== 'string' || !username.trim().length) throw new Error(`Missing or invalid option 'username'! Must be string with min 1 symbol.`)
      if (!response || typeof response !== 'string') throw new Error(`Missing or invalid option 'response'!`)

      const result = await Lichess.request.get(`${Lichess.api}/user/${username}/rating-history`);

      if (response === 'formatted') {
        const raw = JSON.parse(result.body)
        const formatted = raw.map((x: { name: string, points: number[] }) => {
          const points = x.points.map(p => {
            const date = `${p[0]}-${p[1] + 1 > 9 ? p[1] + 1 : '0' + (p[1] + 1)}-${p[2] > 9 ? p[2] : '0' + p[2]}`
            return { date, rating: p[3] }
          })
          return { ...x, points }
        })
        return Promise.resolve(formatted)
      } else {
        return Promise.resolve(JSON.parse(result.body))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }


  /** Read performance statistics of a user, for a single performance. Similar to the performance pages on the website https://lichess.org/@/thibault/perf/bullet */
  public async getPerformanceStatisticsOfUser(options: { username: string, perf: perfType }): Promise<performanceStatisticsUser> {
    try {
      const { username, perf } = options

      if (!username || typeof username !== 'string' || !username.trim().length) throw new Error(`Missing or invalid option 'username'! Must be string with min 1 symbol.`)
      if (!Lichess.validPerfType.includes(perf)) throw new Error(`Option 'perf' is invalid! Valid is ${Lichess.validPerfType.join(' | ')}.`)

      const result = await Lichess.request.get(`${Lichess.api}/user/${username}/perf/${perf}`);
      return Promise.resolve(JSON.parse(result.body))
    } catch (error) {
      return Promise.reject(error)
    }
  }


  /** Read data to generate the activity feed of a user */
  public async getUserActivity(options: { username: string }): Promise<object[]> {
    try {
      const { username } = options;

      if (!username || typeof username !== 'string' || !username.trim().length) throw new Error(`Missing or invalid option 'username'! Must be string with min 1 symbol.`);

      const result = await Lichess.request.get(`${Lichess.api}/user/${username}/activity`);
      return Promise.resolve(JSON.parse(result.body))
    } catch (error) {
      return Promise.reject(error)
    }
  }


  /** Get up to 300 users by their IDs. Users are returned in the same order as the IDs */
  public async getUsersByID(options: { usersIds: string[] }): Promise<userById[]> {
    try {
      const { usersIds } = options;

      if (!usersIds || !Array.isArray(usersIds) || !usersIds.length) throw new Error(`Missing or invalid option 'usersIds'! Must be array of strings with min. 1 record.`);
      if (usersIds.length > 300) throw new Error(`Option 'usersIds' can include max 300 ids!`)
      if (usersIds.some(x => typeof x !== 'string')) throw new Error(`Option 'userIds' include invalid record! All must be 'string' type.`)

      const result = await Lichess.request.post(`${Lichess.api}/users`, { body: usersIds.join(',') });
      return Promise.resolve(JSON.parse(result.body))
    } catch (error) {
      return Promise.reject(error)
    }
  }


  /** Members are sorted by reverse chronological order of joining the team (most recent first). Token only required if the list of members is private */
  public async getMembersOfTeam(options: { teamId: string, limit?: number }): Promise<teamMember[]> {
    try {
      const { teamId, limit = 100 } = options;

      if (!teamId || typeof teamId !== 'string' || !teamId.trim().length) throw new Error(`Missing or invalid option 'teamId'! Must be string with min 1 symbol.`);
      if (typeof limit !== 'number' || limit < 1) throw new Error(`Invalid option 'limit'. Must be number bigger for zero`)

      const data = await this.gotStream(`${Lichess.api}/team/${teamId}/users`, limit);
      const result = JSON.parse(JSON.stringify(data));
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
