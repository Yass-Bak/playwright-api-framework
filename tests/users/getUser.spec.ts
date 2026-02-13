import { test, expect } from '@playwright/test';
import { GitHubClient } from '../../api/clients/githubClient.js';
import { SchemaValidator, userSchema } from '../../utils/schemaValidator.js';
import testData from '../../data/testData.json';

test.describe('GitHub Users API - GET User Profile', () => {
  let client: GitHubClient;

  test.beforeEach(async ({ request }) => {
    client = new GitHubClient(request);
  });

  test('should get user profile successfully', async () => {
    const username = testData.testUsers[0].username;
    const response = await client.getUser(username);

    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.login).toBe(username);
    expect(user.id).toBeGreaterThan(0);
    expect(user.type).toBe('User');
  });

  test('should validate user profile schema', async () => {
    const username = testData.testUsers[0].username;
    const response = await client.getUser(username);

    expect(response.status()).toBe(200);

    const user = await response.json();
    SchemaValidator.validate(user, userSchema);
  });

  test('should verify user profile contains required fields', async () => {
    const username = testData.testUsers[0].username;
    const response = await client.getUser(username);

    const user = await response.json();

    expect(user).toHaveProperty('login');
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('avatar_url');
    expect(user).toHaveProperty('url');
    expect(user).toHaveProperty('public_repos');
    expect(user).toHaveProperty('followers');
    expect(user).toHaveProperty('following');
    expect(user).toHaveProperty('created_at');
  });

  test('should get user repositories', async () => {
    const username = testData.testUsers[0].username;
    const response = await client.getUserRepos(username);

    expect(response.status()).toBe(200);

    const repos = await response.json();
    expect(Array.isArray(repos)).toBeTruthy();
  });
});
