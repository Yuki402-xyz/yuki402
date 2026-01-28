# Testing Guide

This document provides information about the test suite for the Yuki402 project.

## Test Framework

This project uses:
- **Jest** - JavaScript testing framework
- **React Testing Library** - Testing utilities for React components
- **@testing-library/jest-dom** - Custom Jest matchers for DOM assertions

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

### Test Files

Tests are located next to the code they test in `__tests__` directories:

```
app/
├── api/
│   └── chat/
│       ├── __tests__/
│       │   └── route.test.js        # API route tests
│       └── route.js
├── components/
│   ├── __tests__/
│   │   ├── Button.test.js           # Button component tests
│   │   └── WalletProvider.test.js   # Wallet provider tests
│   ├── Button.js
│   └── WalletProvider.js
lib/
└── __tests__/
    ├── constants.test.js            # Constants tests
    └── solana.test.js               # Solana utilities tests
```

### Test Coverage

Current test coverage includes:

#### 1. **Solana Utilities** ([lib/solana.js:10](lib/solana.js#L10))
- Token balance fetching
- Error handling for missing accounts
- Balance formatting with decimals and commas
- Edge cases (zero balance, connection errors)

#### 2. **Button Components** ([app/components/Button.js](app/components/Button.js))
- PrimaryButton, SecondaryButton, OutlineButton, NavButton
- Internal vs external link rendering
- Icon display logic
- Custom className application
- Proper href attributes

#### 3. **API Chat Route** ([app/api/chat/route.js:14](app/api/chat/route.js#L14))
- Message processing
- Multiple message formats (parts vs content)
- Streaming response handling
- AI SDK integration

#### 4. **Wallet Provider** ([app/components/WalletProvider.js](app/components/WalletProvider.js))
- Children rendering
- Provider wrapping

#### 5. **Constants** ([lib/constants.js](lib/constants.js))
- Token mint address validation
- Decimal configuration
- RPC endpoint configuration

## Test Configuration

### Jest Config ([jest.config.js](jest.config.js))

The Jest configuration includes:
- Next.js integration for proper module resolution
- jsdom test environment for DOM testing
- Path mapping for `@/` imports
- Contract tests exclusion (Hardhat tests are separate)

### Setup File ([jest.setup.js](jest.setup.js))

The setup file provides:
- Testing Library matchers
- TextEncoder/TextDecoder polyfills for Node.js
- Next.js router mocks
- Framer Motion mocks
- Solana wallet adapter mocks
- Environment variable defaults

## Mocking Strategy

### External Dependencies

The test suite mocks the following external dependencies:

1. **Solana Web3.js** - Mocked to avoid real blockchain connections
2. **Solana SPL Token** - Mocked for token operations
3. **Wallet Adapters** - Mocked to simulate wallet connections
4. **OpenRouter AI SDK** - Mocked to avoid real API calls
5. **Framer Motion** - Mocked to simplify animation testing
6. **Next.js Router** - Mocked for navigation testing

### Environment Variables

Tests use mock environment variables:
```javascript
NEXT_PUBLIC_YUKI_TOKEN_MINT = 'test-mint-address'
NEXT_PUBLIC_SOLANA_RPC_URL = 'https://api.mainnet-beta.solana.com'
OPENROUTER_API_KEY = 'test-api-key'
YUKI_SYSTEM_PROMPT = 'You are Yuki, a helpful AI assistant.'
```

## Writing New Tests

### Component Test Template

```javascript
import { render, screen } from '@testing-library/react'
import YourComponent from '../YourComponent'

describe('YourComponent', () => {
  it('should render correctly', () => {
    render(<YourComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })
})
```

### API Route Test Template

```javascript
import { POST } from '../route'

describe('API Route', () => {
  it('should handle requests', async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ data: 'test' })
    }

    const response = await POST(mockRequest)
    expect(response).toBeDefined()
  })
})
```

### Utility Function Test Template

```javascript
import { yourFunction } from '../yourModule'

describe('yourFunction', () => {
  it('should perform expected operation', () => {
    const result = yourFunction('input')
    expect(result).toBe('expected output')
  })
})
```

## Best Practices

1. **Test Behavior, Not Implementation** - Focus on what the code does, not how it does it
2. **Use Descriptive Test Names** - Test names should clearly describe what they're testing
3. **Keep Tests Independent** - Each test should run independently without relying on others
4. **Mock External Dependencies** - Avoid real API calls, file system access, or blockchain operations
5. **Test Edge Cases** - Include tests for error conditions, empty states, and boundary conditions
6. **Maintain Test Coverage** - Aim for high coverage of critical paths

## Excluded from Testing

### Smart Contract Tests

Smart contract tests are located in `/contracts/test/` and use Hardhat instead of Jest:
- `PaymentGateway.test.js`
- `SpendingLimits.test.js`
- `X402Registry.test.js`

To run contract tests, use Hardhat:
```bash
cd contracts
npx hardhat test
```

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "TextEncoder is not defined"
**Solution**: The jest.setup.js file includes polyfills. Make sure it's referenced in jest.config.js

**Issue**: Module not found errors
**Solution**: Check that all dependencies are installed with `npm install`

**Issue**: Tests timeout
**Solution**: Increase Jest timeout or check for unresolved promises in your code

## Test Statistics

- **Test Suites**: 5
- **Total Tests**: 50
- **All Passing**: ✓

## Future Improvements

Potential areas for expanded test coverage:
- [ ] Integration tests for chat interface
- [ ] E2E tests with Playwright or Cypress
- [ ] Snapshot tests for component rendering
- [ ] Performance tests for critical paths
- [ ] Accessibility tests with jest-axe
- [ ] Visual regression tests
