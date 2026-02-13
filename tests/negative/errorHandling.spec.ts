import { test, expect } from '@playwright/test';
import { GitHubClient } from '../../api/clients/githubClient.js';

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
    const invalidRepoName = 'invalid repo name with spaces!@#$';
    const response = await client.createRepo(invalidRepoName);

    expect(response.status()).toBe(422);

    const error = await response.json();
    expect(error.message).toContain('Validation Failed');
  });

  test('should return error for unauthorized access', async ({ request }) => {
    // Create client without auth headers
    const unauthorizedRequest = await request.get('https://api.github.com/user/repos', {
      headers: {
        'Accept': 'application/vnd.github+json',
      },
    });

    expect(unauthorizedRequest.status()).toBe(401);

    const error = await unauthorizedRequest.json();
    expect(error.message).toContain('Requires authentication');
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
    expect(error.message).toContain('name already exists');

    // Cleanup
    const owner = process.env.GITHUB_USERNAME || '';
    await client.deleteRepo(owner, repoName);
  });
});
