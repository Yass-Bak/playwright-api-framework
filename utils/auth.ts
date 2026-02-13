import { ENV } from './env';

export function getAuthHeaders(): Record<string, string> {
  return {
    'Authorization': `Bearer ${ENV.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };
}
