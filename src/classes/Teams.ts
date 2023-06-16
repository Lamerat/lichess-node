import BaseClass from './BaseClass.js';
import { teamsSwiss, singleTeam, popularTeams, userPublicData, teamArenaTournament } from '../types.js';


export default class Teams extends BaseClass {
  /** Get all swiss tournaments of a team. Tournaments are sorted by reverse chronological order of start date (last starting first) */
  public async getTeamSwissTournaments(teamId: string, max: number = 100): Promise<teamsSwiss[]> {
    try {
      if (typeof teamId !== 'string' || !teamId.trim()) throw new Error(`Missing or invalid param 'teamId'`);
      if (typeof max !== 'number' || max < 1) throw new Error(`Invalid param 'max'. Must be number >= 1`);

      const data = await this.gotStream(`${this.api}/team/${teamId}/swiss?${max}`, max);
      const result = JSON.parse(JSON.stringify(data));

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Infos about a team */
  public async getSingleTeam(teamId: string): Promise<singleTeam> {
    try {
      if (typeof teamId !== 'string' || !teamId.trim()) throw new Error(`Missing or invalid param 'teamId'`);

      const result = await this.request.get(`${this.api}/team/${teamId}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Paginator of the most popular teams */
  public async getPopularTeams(page: number = 1): Promise<popularTeams> {
    try {
      if (typeof page !== 'number' || page < 1) throw new Error(`Invalid param 'page'. Must be number >= 1`);
      
      const result = await this.request.get(`${this.api}/team/all?page=${page}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** All the teams a player is a member of */
  public async teamsOfPlayer(username: string): Promise<singleTeam[]> {
    try {
      if (typeof username !== 'string' || !username.trim()) throw new Error(`Missing or invalid param 'username'`);

      const result = await this.request.get(`${this.api}/team/of/${username}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Paginator of team search results for a keyword */
  public async searchTeams(text: string = '', page: number = 1): Promise<popularTeams> {
    try {
      if (typeof text !== 'string') throw new Error(`Invalid param 'text'. Must be string`);
      if (typeof page !== 'number' || page < 1) throw new Error(`Invalid param 'page'. Must be number >= 1`);

      const result = await this.request.get(`${this.api}/team/search?text=${text}&page=${page}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getMembersOfTeam(teamId: string, limit: number = 100): Promise<userPublicData[]> {
    try {
      if (typeof teamId !== 'string' || !teamId.trim()) throw new Error(`Missing or invalid param 'teamId'`);
      if (typeof limit !== 'number' || limit < 1) throw new Error(`Invalid param 'max'. Must be number >= 1`);

      const data = await this.gotStream(`${this.api}/team/${teamId}/users`, limit);
      const result = JSON.parse(JSON.stringify(data));

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async getTeamArenaTournaments(teamId: string, max: number = 100): Promise<teamArenaTournament[]> {
    try {
      if (typeof teamId !== 'string' || !teamId.trim()) throw new Error(`Missing or invalid param 'teamId'`);
      if (typeof max !== 'number' || max < 1) throw new Error(`Invalid param 'max'. Must be number >= 1`);

      const data = await this.gotStream(`${this.api}/team/${teamId}/arena?${max}`, max);
      const result = JSON.parse(JSON.stringify(data));

      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}