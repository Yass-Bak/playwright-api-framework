import { test, expect } from '@playwright/test';
import { GitHubClient } from '../../api/clients/githubClient.js';
import { SchemaValidator, repoSchema } from '../../utils/schemaValidator.js';
import { ENV } from '../../utils/env.js';

test.describe('GitHub Repos API - Full CRUD Flow', () => {
  let client: GitHubClient;
  let repoName: string;
  const owner = ENV.GITHUB_USERNAME;

  test.beforeEach(async ({ request }) => {
    client = new GitHubClient(request);
    repoName = `test-repo-${Date.now()}`;
  });

  test('should complete full CRUD lifecycle for repository', async () => {
    // CREATE
    const createResponse = await client.createRepo(repoName, 'Test repository for API automation');
    expect(createResponse.status()).toBe(201);

    const createdRepo = await createResponse.json();
    expect(createdRepo.name).toBe(repoName);
    expect(createdRepo.owner.login).toBe(owner);
    expect(createdRepo.private).toBe(false);

    // Validate schema
    SchemaValidator.validate(createdRepo, repoSchema);

    // READ - Verify creation
    const getResponse = await client.getRepo(owner, repoName);
    expect(getResponse.status()).toBe(200);

    const fetchedRepo = await getResponse.json();
    expect(fetchedRepo.name).toBe(repoName);
    expect(fetchedRepo.id).toBe(createdRepo.id);

    // UPDATE
    const newDescription = `Updated description at ${new Date().toISOString()}`;
    const updateResponse = await client.updateRepo(owner, repoName, newDescription);
    expect(updateResponse.status()).toBe(200);

    const updatedRepo = await updateResponse.json();
    expect(updatedRepo.description).toBe(newDescription);

    // DELETE
    const deleteResponse = await client.deleteRepo(owner, repoName);
    expect(deleteResponse.status()).toBe(204);

    // VERIFY DELETION - Should return 404
    const verifyResponse = await client.getRepo(owner, repoName);
    expect(verifyResponse.status()).toBe(404);
  });

  test('should create repository with dynamic name', async () => {
    const response = await client.createRepo(repoName);
    
    expect(response.status()).toBe(201);
    
    const repo = await response.json();
    expect(repo.name).toBe(repoName);
    expect(repo.owner.login).toBe(owner);

    // Cleanup
    await client.deleteRepo(owner, repoName);
  });

  test('should update repository description', async () => {
    // Setup - Create repo
    await client.createRepo(repoName);

    // Test - Update description
    const newDescription = 'Updated via API automation test';
    const response = await client.updateRepo(owner, repoName, newDescription);

    expect(response.status()).toBe(200);

    const repo = await response.json();
    expect(repo.description).toBe(newDescription);

    // Cleanup
    await client.deleteRepo(owner, repoName);
  });

  test('should delete repository successfully', async () => {
    // Setup - Create repo
    await client.createRepo(repoName);

    // Test - Delete
    const response = await client.deleteRepo(owner, repoName);

    expect(response.status()).toBe(204);

    // Verify deletion
    const verifyResponse = await client.getRepo(owner, repoName);
    expect(verifyResponse.status()).toBe(404);
  });
});
