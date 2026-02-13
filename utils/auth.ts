import { ENV } from './env.js';

export function getAuthHeaders(): Record<string, string> {
  return {
    'Authorization': `Bearer ${ENV.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };
}
