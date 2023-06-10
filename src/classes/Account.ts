import BaseClass from './BaseClass.js';
import { userPublicData, preferencesResponse } from '../types.js';

export default class Account extends BaseClass {
  /** Public information about the logged in user */
  public async getMyProfile(): Promise<userPublicData> {
    try {
      const result = await this.request.get(`${this.api}/account`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Read the email address of the logged in user */
  public async getMyEmailAddress(): Promise<{ email: string }> {
    try {
      const result = await this.request.get(`${this.api}/account/email`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Read the preferences of the logged in user */
  public async getMyPreferences(): Promise<preferencesResponse> {
    try {
      const result = await this.request.get(`${this.api}/account/preferences`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Read the kid mode status of the logged in user */
  public async getMyKidModeStatus(): Promise<{ kid: boolean }> {
    try {
      const result = await this.request.get(`${this.api}/account/kid`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /** Read the kid mode status of the logged in user */
  public async setMyKidModeStatus(v: boolean): Promise<{ ok: boolean }> {
    try {
      if (typeof v !== 'boolean') throw new Error(`Missing or invalid parameter 'v'. Must be boolean!`)

      const result = await this.request.post(`${this.api}/account/kid?v=${v}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}