import { APIRequestContext } from '@playwright/test';
import { getAuthHeaders } from '../../utils/auth';
import { Logger } from '../../utils/logger';
import { ENV } from '../../utils/env';

export class GitHubClient {
  private request: APIRequestContext;
  private baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = ENV.BASE_URL;
  }

  async getUser(username: string) {
    const startTime = Date.now();
    const url = `${this.baseURL}/users/${username}`;
    
    Logger.logRequest('GET', url);
    
    const response = await this.request.get(url, {
      headers: getAuthHeaders(),
    });
    
    Logger.logResponse('GET', url, response.status(), Date.now() - startTime);
    
    return response;
  }

  async getUserRepos(username: string) {
    const startTime = Date.now();
    const url = `${this.baseURL}/users/${username}/repos`;
    
    Logger.logRequest('GET', url);
    
    const response = await this.request.get(url, {
      headers: getAuthHeaders(),
    });
    
    Logger.logResponse('GET', url, response.status(), Date.now() - startTime);
    
    return response;
  }

  async createRepo(repoName: string, description?: string, isPrivate: boolean = false) {
    const startTime = Date.now();
    const url = `${this.baseURL}/user/repos`;
    
    Logger.logRequest('POST', url);
    
    const response = await this.request.post(url, {
      headers: getAuthHeaders(),
      data: {
        name: repoName,
        description: description || `Test repository created at ${new Date().toISOString()}`,
        private: isPrivate,
        auto_init: true,
      },
    });
    
    Logger.logResponse('POST', url, response.status(), Date.now() - startTime);
    
    return response;
  }

  async getRepo(owner: string, repoName: string) {
    const startTime = Date.now();
    const url = `${this.baseURL}/repos/${owner}/${repoName}`;
    
    Logger.logRequest('GET', url);
    
    const response = await this.request.get(url, {
      headers: getAuthHeaders(),
    });
    
    Logger.logResponse('GET', url, response.status(), Date.now() - startTime);
    
    return response;
  }

  async updateRepo(owner: string, repoName: string, description: string) {
    const startTime = Date.now();
    const url = `${this.baseURL}/repos/${owner}/${repoName}`;
    
    Logger.logRequest('PATCH', url);
    
    const response = await this.request.patch(url, {
      headers: getAuthHeaders(),
      data: {
        description: description,
      },
    });
    
    Logger.logResponse('PATCH', url, response.status(), Date.now() - startTime);
    
    return response;
  }

  async deleteRepo(owner: string, repoName: string) {
    const startTime = Date.now();
    const url = `${this.baseURL}/repos/${owner}/${repoName}`;
    
    Logger.logRequest('DELETE', url);
    
    const response = await this.request.delete(url, {
      headers: getAuthHeaders(),
    });
    
    Logger.logResponse('DELETE', url, response.status(), Date.now() - startTime);
    
    return response;
  }
}
