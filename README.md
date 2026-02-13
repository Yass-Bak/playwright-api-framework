# Playwright API Testing Framework

[![API Tests](https://github.com/yourusername/playwright-api-framework/actions/workflows/api-tests.yml/badge.svg)](https://github.com/yourusername/playwright-api-framework/actions/workflows/api-tests.yml)

## 🚀 Overview

Production-grade API testing framework built with **Playwright**, **TypeScript**, and **Node.js**. This framework demonstrates enterprise-level test automation practices for REST API testing using GitHub REST API as the system under test.

## 🎯 Why This Framework is Senior-Level

### Architecture & Design
- **Clean Architecture**: Separation of concerns with distinct layers (clients, services, models, utilities)
- **SOLID Principles**: Single responsibility, dependency injection, interface segregation
- **Design Patterns**: Factory, Builder, Strategy patterns implemented
- **Scalability**: Easily extensible for new endpoints and test scenarios

### Code Quality
- **TypeScript**: Full type safety and IntelliSense support
- **ES Modules**: Modern JavaScript module system
- **Schema Validation**: Runtime type checking with AJV
- **Logging**: Comprehensive request/response logging
- **Error Handling**: Robust error handling and reporting

### Testing Best Practices
- **API-Only Testing**: No browser overhead, pure API request context
- **Dynamic Test Data**: Timestamp-based unique identifiers
- **Full CRUD Coverage**: Complete lifecycle testing
- **Negative Testing**: Error scenarios and edge cases
- **Schema Validation**: Contract testing with JSON schemas

### CI/CD & Reporting
- **GitHub Actions**: Automated test execution
- **Allure Reports**: Beautiful, interactive test reports
- **HTML Reports**: Built-in Playwright HTML reporting
- **Parallel Execution**: Fast test execution
- **Retry Mechanism**: Flaky test handling

## 📁 Project Structure

```
playwright-api-framework/
│
├── api/
│   ├── clients/
│   │   └── githubClient.ts          # API client layer
│   ├── services/                     # Business logic layer
│   └── models/                       # Data models
│
├── tests/
│   ├── users/
│   │   └── getUser.spec.ts          # User API tests
│   ├── repos/
│   │   └── repoCRUD.spec.ts         # Repository CRUD tests
│   └── negative/
│       └── errorHandling.spec.ts    # Negative test cases
│
├── utils/
│   ├── auth.ts                       # Authentication utilities
│   ├── env.ts                        # Environment configuration
│   ├── logger.ts                     # Logging utilities
│   └── schemaValidator.ts            # JSON schema validation
│
├── data/
│   └── testData.json                 # Test data
│
├── .github/
│   └── workflows/
│       └── api-tests.yml             # CI/CD pipeline
│
├── playwright.config.ts              # Playwright configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
├── .env.example                      # Environment variables template
└── README.md                         # This file
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Playwright** | API testing framework |
| **TypeScript** | Type-safe development |
| **Node.js** | Runtime environment |
| **AJV** | JSON schema validation |
| **Allure** | Test reporting |
| **dotenv** | Environment management |
| **GitHub Actions** | CI/CD automation |

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- GitHub Personal Access Token
- Git

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/playwright-api-framework.git
cd playwright-api-framework
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```bash
cp .env.example .env
```

Edit `.env` file:

```env
BASE_URL=https://api.github.com
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=your_github_username
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
```

**Get GitHub Token**: https://github.com/settings/tokens

Required scopes: `repo`, `delete_repo`

## 🚀 Running Tests

### Run all tests

```bash
npm test
```

### Run specific test suites

```bash
npm run test:users      # User API tests
npm run test:repos      # Repository CRUD tests
npm run test:negative   # Negative test cases
```

### View HTML report

```bash
npm run report:html
```

### Generate Allure report

```bash
npm run report
```

## 📊 Sample Test Output

```
Running 9 tests using 4 workers

  ✓ tests/users/getUser.spec.ts:7:3 › should get user profile successfully (1.2s)
  ✓ tests/users/getUser.spec.ts:18:3 › should validate user profile schema (0.9s)
  ✓ tests/repos/repoCRUD.spec.ts:15:3 › should complete full CRUD lifecycle (3.5s)
  ✓ tests/repos/repoCRUD.spec.ts:52:3 › should create repository with dynamic name (2.1s)
  ✓ tests/negative/errorHandling.spec.ts:9:3 › should return 404 for non-existent user (0.7s)

  9 passed (8.4s)
```

## 🎯 Test Coverage

### User API Tests
- ✅ Get user profile
- ✅ Validate user schema
- ✅ Verify required fields
- ✅ Get user repositories

### Repository CRUD Tests
- ✅ Full CRUD lifecycle (Create → Read → Update → Delete → Verify)
- ✅ Dynamic repository naming with timestamps
- ✅ Schema validation
- ✅ Update repository description
- ✅ Delete repository verification

### Negative Tests
- ✅ 404 - Non-existent user
- ✅ 404 - Non-existent repository
- ✅ 422 - Invalid repository name
- ✅ 401 - Unauthorized access
- ✅ 422 - Duplicate repository creation

## 🏗️ Framework Features

### 1. Client Layer Abstraction
```typescript
const client = new GitHubClient(request);
const response = await client.getUser('octocat');
```

### 2. Schema Validation
```typescript
SchemaValidator.validate(userData, userSchema);
```

### 3. Comprehensive Logging
```typescript
Logger.logRequest('GET', url);
Logger.logResponse('GET', url, status, responseTime);
```

### 4. Environment Management
```typescript
const config = ENV.BASE_URL;
const headers = getAuthHeaders();
```

### 5. Dynamic Test Data
```typescript
const repoName = `test-repo-${Date.now()}`;
```

## 📈 CI/CD Pipeline

GitHub Actions workflow automatically:
- ✅ Runs on push, PR, and daily schedule
- ✅ Installs dependencies (skips browser download)
- ✅ Executes all tests
- ✅ Generates Allure reports
- ✅ Uploads test artifacts
- ✅ Maintains 30-day retention

## 🎓 Learning Outcomes

This framework demonstrates:

1. **Professional API Testing**: Industry-standard patterns and practices
2. **TypeScript Mastery**: Advanced typing, interfaces, and modules
3. **Clean Code**: SOLID principles, DRY, separation of concerns
4. **Test Automation**: Comprehensive test coverage and reporting
5. **DevOps Integration**: CI/CD pipeline with GitHub Actions
6. **Documentation**: Clear, professional documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this for your portfolio or projects

## 👨‍💻 Author

**Senior SDET / Automation Architect**

This framework showcases enterprise-level API testing capabilities suitable for senior automation engineering roles.

---

**⭐ If you find this framework helpful, please give it a star!**
