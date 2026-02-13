import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://api.github.com',
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  GITHUB_USERNAME: process.env.GITHUB_USERNAME || '',
};

export function validateEnv(): void {
  if (!ENV.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is required. Please set it in .env file');
  }
}
