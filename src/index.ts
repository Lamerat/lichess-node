import { playerObject, realTimeUser, perfType, topTenObject, userPublicData, performanceStatisticsUser, userById, pngJSON } from './types.js';
import { teamMember, liveStreamer, crosstable, autocompleteUserName, mastersDatabase, masterResponse, lichessGamesRequest } from './types.js';
import { playerGamesOpening, playerGamesOpeningResponse, puzzleType, yourPuzzle, puzzleDashBoardResponse, stormDashboardResponse } from './types.js';
import got from 'got';
import ndJSON from 'ndjson'


export default class Lichess {
  private static api: string = 'https://lichess.org/api';
  private static explorer: string = 'https://explorer.lichess.ovh'
  private static validPerfType = ['ultraBullet', 'bullet', 'blitz', 'rapid', 'classical', 'chess960', 'crazyhouse', 'antichess', 'atomic', 'horde', 'kingOfTheHill', 'racingKings', 'threeCheck'];
  private token: string = null;
  private headers: object;
  private static request = got.extend({
    hooks: {
      beforeError: [
        (error: any) => {
          const { response } = error;
          if (response && response.body) {
            error.message = response.body.error || JSON.parse(response.body)
            error.code = response.statusCode
          }
          return error;
        }
      ]
    },
    mutableDefaults: true
  })

  private static pngParser(png: string) {
    const pngToArray = png.split('\n').filter(x => x)
    const result: pngJSON = {}
    pngToArray.forEach(x => {
      if (x.startsWith('[') && x.endsWith(']')) {
        const [tag, ...rest]: string[] = x.slice(1, x.length - 1).split(' ').map(x => x.replaceAll('"', ''))
        const camelCaseTag = [...tag]
        camelCaseTag[0] = camelCaseTag[0].toLowerCase()
        result[camelCaseTag.join('')] = rest.join( ' ')
      } else {
        result.moves = x
      }
    })
    return result
  }
  

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


  /** Get basic info about currently streaming users. This API is very fast and cheap on lichess side. So you can call it quite often (like once every 5 seconds) */
  public async getLiveStreamers(): Promise<liveStreamer[]> {
    try {
      const result = await Lichess.request.get(`${Lichess.api}/streamer/live`);
      return Promise.resolve(JSON.parse(result.body))
    } catch (error) {
      return Promise.reject(error);
    }
  }


  /** Get basic info about currently streaming users. This API is very fast and cheap on lichess side. So you can call it quite often (like once every 5 seconds) */
  public async getCrossTable(options: { user1: string, user2: string, matchup: boolean }): Promise<crosstable> {
    try {
      const { user1, user2, matchup = false } = options

      if (!user1 || typeof user1 !== 'string' || !user1.trim().length) throw new Error(`Missing or invalid option 'user1'! Must be string with min 1 symbol.`);
      if (!user2 || typeof user2 !== 'string' || !user2.trim().length) throw new Error(`Missing or invalid option 'user2'! Must be string with min 1 symbol.`);
      if (typeof matchup !== 'boolean') throw new Error(`Invalid option 'matchup'! Must be boolean.`)
      
      const result = await Lichess.request.get(`${Lichess.api}/crosstable/${user1}/${user2}?matchup=${matchup}`);
      return Promise.resolve(JSON.parse(result.body))
    } catch (error) {
      return Promise.reject(error);
    }
  }


  /** Get basic info about currently streaming users. This API is very fast and cheap on lichess side. So you can call it quite often (like once every 5 seconds) */
  public async autocompleteUsernames<bool extends boolean>(options: { term: string, obj: bool, friend: boolean }){
    try {
      const { term, obj, friend } = options;

      if (!term || typeof term !== 'string' || term.trim().length < 3) throw new Error(`Missing or invalid option 'term'! Must be string with min 3 characters.`);
      if (typeof obj !== 'boolean') throw new Error(`Invalid option 'obj'! Must be boolean.`);
      if (typeof friend !== 'boolean') throw new Error(`Invalid option 'friend'! Must be boolean.`);
      
      type resType = bool extends true ? autocompleteUserName : string[]
      const res = await Lichess.request.get(`${Lichess.api}/player/autocomplete?term=${term}&object=${obj}&friend=${friend}`);
      const result: resType = JSON.parse(res.body);

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // RELATIONS
  /** Get users followed by the logged in user */
  public async getUsersFollowed(limit: number = 10): Promise<userPublicData[]> {
    try {
      if (typeof limit !== 'number' || limit < 1) throw new Error(`Invalid option 'limit'. Must be number bigger for zero`)

      const data = await this.gotStream(`${Lichess.api}/rel/following`, limit);
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

      const result = await Lichess.request.post(`${Lichess.api}/rel/${action}/${username}`, { headers: { ...this.headers } });
      return Promise.resolve(JSON.parse(result.body))
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // OPENING EXPLORER
  public async mastersDatabase(options?: mastersDatabase): Promise<masterResponse> {
    try {
      if (options?.topGames && (typeof options.topGames !== 'number' || options.topGames > 15)) throw new Error(`Invalid option 'topGames'. Must be number <= 15`)

      const queryArray = options ? Object.keys(options).map(x => `${x}=${options[x]}`) : []
      const query = queryArray.length ? '?' + queryArray.join('&') : ''

      const result = await Lichess.request.get(`${Lichess.explorer}/masters${query}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Games sampled from all Lichess players */
  public async lichessGames(options?: lichessGamesRequest): Promise<masterResponse> {
    try {
      if (options?.topGames && (typeof options.topGames !== 'number' || options.topGames > 4)) throw new Error(`Invalid option 'topGames'. Must be number <= 4`)
      if (options?.recentGames && (typeof options.recentGames !== 'number' || options.recentGames > 4)) throw new Error(`Invalid option 'recentGames'. Must be number <= 4`)
      
      const queryArray = options
      ? Object.keys(options).map(x => Array.isArray(options[x]) ? `${x}=${options[x].join(',')}` : `${x}=${options[x]}`)
      : []
      
      const query = queryArray.length ? '?' + queryArray.join('&') : ''
      
      const result = await Lichess.request.get(`${Lichess.explorer}/lichess${query}`);
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
      const data = await this.gotStream(`${Lichess.explorer}/player${query}`, 1);
      return Promise.resolve(JSON.parse(JSON.stringify(data[0])));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async OTBMasterGame<formatValue extends 'png' | 'json'>(gameId: string, format: formatValue) {
    try {
      const data = await Lichess.request.get(`${Lichess.explorer}/master/pgn/${gameId}`, { headers: { "accept":"application/x-ndjson" } });
      type resType = formatValue extends 'png' ? string : pngJSON;
      const result = format === 'png' ? data.body : Lichess.pngParser(data.body);
      return result as resType;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // PUZZLES
/** Get the daily puzzle */
  public async getTheDailyPuzzle(): Promise<puzzleType> {
    try {
      const result = await Lichess.request.get(`${Lichess.api}/puzzle/daily`);
      return Promise.resolve(JSON.parse(result.body))
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Get a single Lichess puzzle in JSON format */
  public async getPuzzleByID(id: string): Promise<puzzleType> {
    try {
      if (!id || typeof id !== 'string' || !id.trim().length) throw new Error(`Missing or invalid option 'id'!`)
      const result = await Lichess.request.get(`${Lichess.api}/puzzle/${id}`);
      return Promise.resolve(JSON.parse(result.body))
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
      : []
      
      const query = queryArray.length ? '?' + queryArray.join('&') : '';
      const data = await this.gotStream(`${Lichess.api}/puzzle/activity${query}`, max);

      return Promise.resolve(JSON.parse(JSON.stringify(data)));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Download your puzzle dashboard as JSON. Also includes all puzzle themes played, with aggregated results */
  public async getYourPuzzleDashboard(options: { days: number }): Promise<puzzleDashBoardResponse> {
    try {
      const { days } = options;
      if (!days || typeof days !== 'number' || days < 1) throw new Error(`Missing or invalid option days. Must be number >= 1`)
      console.log(`${Lichess.api}/puzzle/dashboard/${days}`)

      const result = await Lichess.request.get(`${Lichess.api}/puzzle/dashboard/${days}`, { headers: { ...this.headers } });
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Get the storm dashboard of a player. Download the storm dashboard of any player as JSON. Contains the aggregated high scores, and the history of storm runs aggregated by days. Use ?days=0 if you only care about the high scores */
  public async getTheStormDashboardOfPlayer(options: { username: string, days?: number }): Promise<stormDashboardResponse> {
    try {
      const { username, days } = options
      if (!username || typeof username !== 'string' || !username.trim().length) throw new Error(`Missing or invalid option 'username'! Must be string with min 1 symbol.`)
      if (days && (typeof days !== 'number' || days < 0 || days > 365)) throw new Error(`Invalid option 'days'. Must be number >= 0 and <= 365`)

      const query = days !== undefined ? `?days=${days}` : '';
      const result = await Lichess.request.get(`${Lichess.api}/storm/dashboard/${username}${query}`);

      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Create a new private puzzle race. The Lichess user who creates the race must join the race page, and manually start the race when enough players have joined */
  public async createAndJoinPuzzleRace(): Promise<{ id: string, url: string }> {
    try {
      const result = await Lichess.request.post(`${Lichess.api}/racer`, { headers: { ...this.headers } });
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}


const elka = new Lichess('lip_iFMseA5wiKm35DPdqM9M')

elka.createAndJoinPuzzleRace()
  .then(x => console.log(x)).catch(e => console.log(e.message))