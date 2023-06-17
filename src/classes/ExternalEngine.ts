import BaseClass from './BaseClass.js';
import { externalEngineResponse, externalEngineRequest } from '../types.js';

export default class ExternalEngine extends BaseClass {
  /** Lists all external engines that have been registered for the user, and the credentials required to use them */
  public async listExternalEngines(): Promise<externalEngineResponse[]> {
    try {
      const result = await this.request.get(`${this.api}/external-engine`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }


  /** Registers a new external engine for the user. It can then be selected and used on the analysis board. After registering, the provider should start waiting for analysis requests. */
  public async createExternalEngine(options: externalEngineRequest): Promise<externalEngineResponse> {
    try {
      const { name, maxThreads, maxHash, defaultDepth, providerSecret } = options;

      if (typeof name !== 'string' || !name.trim() || name.length < 3 || name.length > 200)
        throw new Error(`Missing or invalid option 'name'. Must be string with length between 3 and 200 characters!`);
      if (typeof maxThreads !== 'number' || maxThreads < 1 || maxThreads > 65536) throw new Error(`Missing or invalid option 'maxThreads'. Must be number between 1 and 65536.`);
      if (typeof maxHash !== 'number' || maxHash < 1 || maxHash > 1048576) throw new Error(`Missing or invalid option 'maxHash'. Must be number between 1 and 1048576.`);
      if (typeof defaultDepth !== 'number' || defaultDepth < 0 || defaultDepth > 246) throw new Error(`Missing or invalid option 'defaultDepth'. Must be number between 0 and 246.`);
      if (typeof providerSecret !== 'string' || !providerSecret.trim() || providerSecret.length < 16 || providerSecret.length > 1024)
        throw new Error(`Missing or invalid option 'providerSecret'. Must be string with length between 16 and 1024 characters!`);
      
      const result = await this.request.post(`${this.api}/external-engine`, { json: options });
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }


  /** Get properties and credentials of an external engine */
  public async getExternalEngine(id: string): Promise<externalEngineResponse> {
    try {
      if (typeof id !== 'string' || !id.trim()) throw new Error(`Missing or invalid parameter 'id'. Must be string!`);

      const result = await this.request.get(`${this.api}/external-engine/${id}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }


   /** Updates the properties of an external engine */
  public async updateExternalEngine(id: string, options: externalEngineRequest): Promise<externalEngineResponse> {
    try {
      const { name, maxThreads, maxHash, defaultDepth, providerSecret } = options;

      if (typeof id !== 'string' || !id.trim()) throw new Error(`Missing or invalid parameter 'id'. Must be string!`);
      if (typeof name !== 'string' || !name.trim() || name.length < 3 || name.length > 200)
        throw new Error(`Missing or invalid option 'name'. Must be string with length between 3 and 200 characters!`);
      if (typeof maxThreads !== 'number' || maxThreads < 1 || maxThreads > 65536) throw new Error(`Missing or invalid option 'maxThreads'. Must be number between 1 and 65536.`);
      if (typeof maxHash !== 'number' || maxHash < 1 || maxHash > 1048576) throw new Error(`Missing or invalid option 'maxHash'. Must be number between 1 and 1048576.`);
      if (typeof defaultDepth !== 'number' || defaultDepth < 0 || defaultDepth > 246) throw new Error(`Missing or invalid option 'defaultDepth'. Must be number between 0 and 246.`);
      if (typeof providerSecret !== 'string' || !providerSecret.trim() || providerSecret.length < 16 || providerSecret.length > 1024)
        throw new Error(`Missing or invalid option 'providerSecret'. Must be string with length between 16 and 1024 characters!`);

      const result = await this.request.put(`${this.api}/external-engine/${id}`, { json: options });
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }


  /** Unregister an external engine. */
  public async deleteExternalEngine(id: string): Promise<{ ok: boolean }> {
    try {
      if (typeof id !== 'string' || !id.trim()) throw new Error(`Missing or invalid parameter 'id'. Must be string!`);

      const result = await this.request.delete(`${this.api}/external-engine/${id}`);
      return Promise.resolve(JSON.parse(result.body));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}