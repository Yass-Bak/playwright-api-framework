import Ajv, { JSONSchemaType } from 'ajv';

const ajv = new Ajv();

export class SchemaValidator {
  static validate<T>(data: any, schema: JSONSchemaType<T>): void {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    
    if (!valid) {
      throw new Error(`Schema validation failed: ${JSON.stringify(validate.errors, null, 2)}`);
    }
  }
}

export const userSchema: JSONSchemaType<any> = {
  type: 'object',
  properties: {
    login: { type: 'string' },
    id: { type: 'number' },
    node_id: { type: 'string' },
    avatar_url: { type: 'string' },
    url: { type: 'string' },
    type: { type: 'string' },
    name: { type: 'string', nullable: true },
    company: { type: 'string', nullable: true },
    blog: { type: 'string', nullable: true },
    location: { type: 'string', nullable: true },
    email: { type: 'string', nullable: true },
    bio: { type: 'string', nullable: true },
    public_repos: { type: 'number' },
    followers: { type: 'number' },
    following: { type: 'number' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
  },
  required: ['login', 'id', 'node_id', 'avatar_url', 'url', 'type', 'public_repos', 'followers', 'following', 'created_at', 'updated_at'],
  additionalProperties: true,
};

export const repoSchema: JSONSchemaType<any> = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    node_id: { type: 'string' },
    name: { type: 'string' },
    full_name: { type: 'string' },
    private: { type: 'boolean' },
    owner: { type: 'object' },
    html_url: { type: 'string' },
    description: { type: 'string', nullable: true },
    fork: { type: 'boolean' },
    url: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
    pushed_at: { type: 'string', nullable: true },
    size: { type: 'number' },
    stargazers_count: { type: 'number' },
    watchers_count: { type: 'number' },
    language: { type: 'string', nullable: true },
    forks_count: { type: 'number' },
    open_issues_count: { type: 'number' },
    default_branch: { type: 'string' },
  },
  required: ['id', 'node_id', 'name', 'full_name', 'private', 'owner', 'html_url', 'fork', 'url', 'created_at', 'updated_at', 'size', 'stargazers_count', 'watchers_count', 'forks_count', 'open_issues_count', 'default_branch'],
  additionalProperties: true,
};
