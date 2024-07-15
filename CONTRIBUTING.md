# Git commit specifications

In order to maintain consistency and readability of commit information, we use the following specifications for Git commits.

## Commit type

- **add**: Add files
- **del** / **remove**: Delete files
- **upd**: Update files
- **feat**: New features
- **fix**: Bug fixes
- **docs**: Document changes
- **style**: Code format (changes that do not affect code operation)
- **refactor**: Code refactoring (neither new features nor bug fixes)
- **perf**: Performance optimization
- **test**: Add or modify tests
- **build**: Changes to the build system or external dependencies (such as webpack, npm)
- **ci**: Changes to continuous integration related files
- **chore**: Other daily affairs
- **revert**: Revert the last commit
- **merge**: Merge PRs

## Commit format

Each commit must follow the following format:

```text
<type>(<scope>): <subject>

<body>

<footer>