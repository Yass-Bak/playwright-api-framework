import { test, expect } from '@playwright/test';
import { GitHubClient } from '../../api/clients/githubClient';

test.describe('GitHub API - Negative Test Cases', () => {
  let client: GitHubClient;

  test.beforeEach(async ({ request }) => {
    client = new GitHubClient(request);
  });

  test('should return 404 for non-existent user', async () => {
    const response = await client.getUser('this-user-definitely-does-not-exist-99999');

    expect(response.status()).toBe(404);

    const error = await response.json();
    expect(error.message).toBe('Not Found');
  });

  test('should return 404 for non-existent repository', async () => {
    const response = await client.getRepo('octocat', 'non-existent-repo-99999');

    expect(response.status()).toBe(404);

    const error = await response.json();
    expect(error.message).toBe('Not Found');
  });

  test('should handle invalid repository name', async () => {
    const invalidRepoName = 'owner/repo'; // Slashes are not allowed in name field
    const response = await client.createRepo(invalidRepoName);

    // GitHub might return 422 Unprocessable Entity or 400 Bad Request
    expect([400, 422]).toContain(response.status());

    const error = await response.json();
    if (error.errors && error.errors.length > 0) {
      // GitHub API can return "Validation Failed" or "Repository creation failed."
      expect(error.message).toMatch(/(Validation Failed|Repository creation failed)/); 
    } else {
       // Could be either depending on API version/state
       expect(error.message).toBeTruthy(); 
    }
  });

  test('should return error for unauthorized access', async ({ playwright }) => {
    // Create new context explicitly without auth headers
    const apiContext = await playwright.request.newContext({
      baseURL: 'https://api.github.com',
      extraHTTPHeaders: {
        'Accept': 'application/vnd.github+json',
      }
    });

    const unauthorizedRequest = await apiContext.get('/user/repos');
    
    // Expect 401 Unauthorized (standard) or 403 Forbidden (sometimes returned depending on rate limits/scope)
    expect([401, 403]).toContain(unauthorizedRequest.status());

    const error = await unauthorizedRequest.json();
    // Message might vary (e.g. rate limit exceeded or Requires authentication)
    expect(error.message).toBeTruthy();
  });

  test('should handle duplicate repository creation', async () => {
    const repoName = `duplicate-test-${Date.now()}`;
    
    // Create first repo
    const firstResponse = await client.createRepo(repoName);
    expect(firstResponse.status()).toBe(201);

    // Try to create duplicate
    const duplicateResponse = await client.createRepo(repoName);
    expect(duplicateResponse.status()).toBe(422);

    const error = await duplicateResponse.json();
    // GitHub API now returns "Repository creation failed." or errors array
    if (error.errors && error.errors.length > 0) {
      expect(error.errors[0].message).toContain('name already exists');
    } else {
      expect(error.message).toContain('name already exists');
    }

    // Cleanup
    const owner = process.env.GITHUB_USERNAME || '';
    await client.deleteRepo(owner, repoName);
  });
});
