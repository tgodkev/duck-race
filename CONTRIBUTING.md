# Contributing to Duck Race

Thank you for your interest in contributing to Duck Race! We welcome contributions from everyone. This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Expected Behavior

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Trolling or insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- Git
- A code editor (VS Code recommended)
- Basic knowledge of React, TypeScript, and Next.js

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**:
```bash
git clone https://github.com/YOUR_USERNAME/duck-race.git
cd duck-race
```

3. **Add upstream remote**:
```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/duck-race.git
```

4. **Install dependencies**:
```bash
npm install
```

5. **Create a feature branch**:
```bash
git checkout -b feature/your-feature-name
```

6. **Start the development server**:
```bash
npm run dev
```

## Development Workflow

### Branch Naming Convention

Use descriptive branch names with the following prefixes:

- `feature/` - New features (e.g., `feature/add-sound-effects`)
- `fix/` - Bug fixes (e.g., `fix/timer-display-bug`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/race-logic`)
- `test/` - Adding tests (e.g., `test/duck-movement`)
- `style/` - Code style changes (e.g., `style/format-components`)

### Keeping Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Enable strict mode in `tsconfig.json`
- Define proper types and interfaces
- Avoid using `any` type unless absolutely necessary
- Use type inference where appropriate

### React/Next.js

- Use functional components with hooks
- Follow the React hooks rules
- Use Next.js App Router conventions
- Keep components small and focused
- Extract reusable logic into custom hooks

### Code Style

We use ESLint for code linting. Ensure your code passes linting:

```bash
npm run lint
```

#### General Guidelines

- **Indentation**: 2 spaces (no tabs)
- **Quotes**: Double quotes for JSX, single quotes for TypeScript
- **Semicolons**: Required
- **Line Length**: Maximum 100 characters
- **Naming Conventions**:
  - Components: PascalCase (e.g., `DuckRacer.tsx`)
  - Functions: camelCase (e.g., `calculateSpeed()`)
  - Constants: UPPER_SNAKE_CASE (e.g., `MAX_DUCKS`)
  - Interfaces: PascalCase with 'I' prefix optional (e.g., `Duck` or `IDuck`)

#### Component Structure

```typescript
// 1. Imports
import React from 'react';
import type { ComponentProps } from './types';

// 2. Types/Interfaces
interface DuckRacerProps {
  name: string;
  position: number;
}

// 3. Component
export default function DuckRacer({ name, position }: DuckRacerProps) {
  // 3a. Hooks
  const [speed, setSpeed] = useState(0);

  // 3b. Effects
  useEffect(() => {
    // ...
  }, []);

  // 3c. Handlers
  const handleMove = () => {
    // ...
  };

  // 3d. Render
  return (
    <div>{/* ... */}</div>
  );
}
```

### File Organization

```
components/
├── DuckRacer/
│   ├── DuckRacer.tsx       # Component
│   ├── DuckRacer.test.tsx  # Tests
│   ├── types.ts            # Type definitions
│   └── index.ts            # Barrel export
```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(race): add speed boost power-up
fix(timer): correct countdown display issue
docs(readme): update installation instructions
refactor(duck): optimize movement calculation
test(race): add unit tests for race logic
```

### Commit Message Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to..." not "moves cursor to...")
- First line should be 50 characters or less
- Capitalize first letter of subject
- Don't end subject with a period
- Separate subject from body with a blank line
- Wrap body at 72 characters
- Use body to explain what and why, not how

## Pull Request Process

### Before Submitting

1. **Update your branch** with the latest changes from `main`
2. **Test your changes** thoroughly
3. **Run linting**: `npm run lint`
4. **Build the project**: `npm run build`
5. **Update documentation** if needed
6. **Add tests** for new features

### Creating a Pull Request

1. **Push your branch** to your fork:
```bash
git push origin feature/your-feature-name
```

2. **Open a pull request** on GitHub

3. **Fill out the PR template** with:
   - Clear description of changes
   - Related issue numbers (e.g., "Fixes #123")
   - Screenshots/GIFs for UI changes
   - Testing instructions

### PR Title Format

Follow the same convention as commit messages:

```
feat(race): add speed boost power-up
```

### Review Process

- At least one maintainer must approve your PR
- All CI checks must pass
- Address all review comments
- Keep your PR focused and small (easier to review)
- Be responsive to feedback

### After Approval

- Maintainers will merge your PR
- Your branch will be deleted
- Your contribution will be credited in release notes

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Writing Tests

- Write tests for all new features
- Maintain or improve code coverage
- Use descriptive test names
- Test edge cases and error conditions
- Mock external dependencies

### Test Structure

```typescript
describe('DuckRacer', () => {
  it('should render duck name correctly', () => {
    // Arrange
    const name = 'Quackers';

    // Act
    render(<DuckRacer name={name} />);

    // Assert
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
```

## Documentation

### Code Comments

- Write self-documenting code when possible
- Add comments for complex logic
- Use JSDoc for functions and components
- Keep comments up-to-date with code changes

### JSDoc Example

```typescript
/**
 * Calculates the duck's new position based on current speed and time delta
 * @param currentPosition - Current position on the track (0-1000)
 * @param speed - Current speed in units per second
 * @param deltaTime - Time elapsed since last update in milliseconds
 * @returns New position on the track
 */
function calculateNewPosition(
  currentPosition: number,
  speed: number,
  deltaTime: number
): number {
  return currentPosition + (speed * deltaTime / 1000);
}
```

### Updating Documentation

- Update README.md for user-facing changes
- Update GAME_RULES.md for gameplay changes
- Add inline documentation for complex code
- Create guides in `/docs` for major features

## Reporting Bugs

### Before Reporting

1. Check if the bug has already been reported
2. Test with the latest version
3. Gather information about the issue

### Bug Report Template

Use GitHub Issues with the following information:

- **Title**: Clear, concise description
- **Description**: Detailed explanation of the bug
- **Steps to Reproduce**: Step-by-step instructions
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**:
  - OS and version
  - Browser and version
  - Node.js version
  - npm/yarn version

## Suggesting Features

### Feature Request Template

- **Title**: Clear feature description
- **Problem**: What problem does this solve?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other approaches considered
- **Additional Context**: Mockups, examples, references

### Feature Discussion

- Open an issue to discuss the feature first
- Get feedback from maintainers before implementing
- Consider backward compatibility
- Think about performance implications

## Questions?

- Open a GitHub Discussion for general questions
- Join our community chat (if available)
- Check existing documentation first
- Tag maintainers for urgent issues

## Recognition

Contributors will be:
- Listed in the project's contributors section
- Credited in release notes
- Recognized in the community

Thank you for contributing to Duck Race! Every contribution, no matter how small, is valuable and appreciated.

---

**Happy Coding!** 🦆
