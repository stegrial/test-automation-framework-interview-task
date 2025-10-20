/* eslint-disable max-len */
const {env, argv, exit} = require('process');
const {readFileSync} = require('fs');

const project = argv.find((value) => /^project=.+$/.test(value))?.replace(/^project=/, '');
const scenario = argv.find((value) => /^name=.+$/.test(value))?.replace(/^name=/, '');
const environmentName = argv.find((arg) => /^env=.+$/.test(arg))?.replace(/^env=/, '');
const browser = argv.find((value) => /^(?:webkit|firefox)$/.test(value));
const device = argv.find((value) => /^(?:mobile|tablet)$/.test(value));
const headless = argv.includes('headless');

if (!project) {
  console.error('Project name not provided!');
  exit(1);
}

if (!scenario) {
  console.log('Scenario name not provided! Executing all scenarios.');
}

const environments = JSON.parse(readFileSync(`projects/${project}/data/environments.json`).toString());
let environment;
if (!environmentName) {
  console.log('Environment name not provided! Using default environment.');
  environment = environments['default'];
} else {
  try {
    environment = environments[environmentName];
  } catch (error) {
    console.error('Environment does not exist!');
    exit(1);
  }
}

env.PROJECT = project;
env.ENVIRONMENT_NAME = environmentName || 'default';
env.ENVIRONMENT = environment;
env.BROWSER = browser || 'chromium';
env.DEVICE = device || 'desktop';
env.HEADLESS = headless ? 'true' : null;

let additionalTags;
if (env.PARAMS) {
  additionalTags = `--tags '${env.PARAMS}'`;
} else {
  additionalTags = '';
}

const common = [
  `projects/${project}/features/**/*.feature`,
  `--require projects/${project}/hooks/hooks.ts`,
  `--require projects/${project}/step_definitions/*.ts`,
  '--require-module ts-node/register',
  '--no-strict',
  additionalTags,
];
if (scenario) common.push(`--name "${scenario}"`);

module.exports = {
  local: `${common.join(' ')} -f @cucumber/pretty-formatter`,
  regression: `${common.join(' ')} --format ./modules/allure_reporter.ts:test.txt`,
};
