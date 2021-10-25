#!/usr/bin/env node

// Based on https://github.com/reactjs/react-codemod/blob/master/bin/cli.js

import globby from 'globby';
import inquirer from 'inquirer';
import meow from 'meow';
import chalk from 'chalk';

import { runTransforms, Library } from './transforms';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const isGitClean = require('is-git-clean');

// Current test library choices to display in CLI
const TRANSFORMER_LIBRARY_CHOICES: { name: string; value: Library }[] = [
  {
    name: 'Protractor',
    value: 'protractor',
  },
];

// CLI
const cli = meow(
  `
Usage:      npx cypress-codemods <path> [options]

Examples:   npx cypress-codemods src
            npx cypress-codemods src/**/*.test.js

Options:
  -f, --force       Bypass Git safety checks and force codemods to run
  -d, --dry         Dry run (no changes are made to files)
  -p, --print       Print transformed files to stdout, useful for development,`,
  {
    flags: {
      force: {
        type: 'boolean',
        alias: 'f',
      },
      dry: {
        type: 'boolean',
        alias: 'd',
      },
      print: {
        type: 'boolean',
        alias: 'p',
      },
    },
  }
);

function checkGitStatus(force: boolean | undefined) {
  let clean = false;
  let errorMessage = 'Unable to determine if git directory is clean';
  try {
    clean = isGitClean.sync(process.cwd());
    errorMessage = 'Git directory is not clean';
  } catch (err) {
    if (err && err.stderr && err.stderr.indexOf('Not a git repository') >= 0) {
      clean = true;
    }
  }

  if (!clean) {
    if (force) {
      console.log(`WARNING: ${errorMessage}. Forcibly continuing.`);
    } else {
      console.log('Thank you for using cypress-codemods.');
      console.log(
        chalk.yellow(
          '\nBefore we continue, please stash or commit your git changes.'
        )
      );
      console.log(
        '\nYou may use the --force flag to override this safety check.'
      );
      process.exit(1);
    }
  }
}

function expandedFilePaths(filesBeforeExpansion: string[]) {
  const shouldExpandFiles = filesBeforeExpansion.some((file: string) =>
    file.includes('*')
  );
  return shouldExpandFiles
    ? globby.sync(filesBeforeExpansion)
    : filesBeforeExpansion;
}

if (!cli.flags.dry) {
  checkGitStatus(cli.flags.force);
}

if (
  cli.input[0] &&
  !TRANSFORMER_LIBRARY_CHOICES.find((x) => x.value === cli.input[0])
) {
  console.error('Invalid test library choice, pick one of:');
  console.error(
    TRANSFORMER_LIBRARY_CHOICES.map((x) => '- ' + x.value).join('\n')
  );
  process.exit(1);
}

inquirer
  .prompt([
    {
      type: 'list',
      name: 'library',
      message: 'Which test library are you migrating from?',
      pageSize: TRANSFORMER_LIBRARY_CHOICES.length,
      choices: TRANSFORMER_LIBRARY_CHOICES,
    },
    {
      type: 'input',
      name: 'files',
      message: 'On which directory or files should the codemods be applied?',
      when: () => !cli.input.length,
      default: '.',
      filter: (files: string) =>
        files
          .trim()
          .split(/\s+/)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((v: any) => v),
    },
  ])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .then((answers: any) => {
    const { library, files } = answers;

    const filesBeforeExpansion = cli.input.length ? cli.input : files;
    const filesExpanded = expandedFilePaths([filesBeforeExpansion]);

    if (!filesExpanded.length) {
      console.log(`No files found matching ${filesBeforeExpansion.join(' ')}`);
      return null;
    }

    return runTransforms({
      library,
      files: filesExpanded,
      flags: cli.flags,
    });
  })
  .catch((errors) => {
    console.log('errors: ', errors);
  });
