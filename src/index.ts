#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import chalk from 'chalk';
import * as template from './utils/template';
import * as shell from 'shelljs';

const TEMPLATES_DIR = path.join(__dirname, 'templates');
const CHOICES = fs.readdirSync(TEMPLATES_DIR).filter(name => {
  if (name.startsWith('.')) return false;
  return fs.statSync(path.join(TEMPLATES_DIR, name)).isDirectory();
});
const QUESTIONS: inquirer.QuestionCollection<{ template: string; name: string }> = [
  {
    name: 'template',
    type: 'list',
    message: 'What template would you like to use?',
    choices: CHOICES
  },
  {
    name: 'name',
    type: 'input',
    message: 'Please input a new project name:'
  }
];

export interface CliOptions {
  projectName: string;
  templateName: string;
  templatePath: string;
  targetPath: string;
}

const CURR_DIR = process.cwd();

async function main() {
  const answers = await inquirer.prompt<{ template: string; name: string }>(QUESTIONS);
  const projectChoice = answers.template;
  const projectName = answers.name.trim();

  if (!projectName) {
    console.error(chalk.red('Project name cannot be empty.'));
    process.exit(1);
  }

  const templatePath = path.join(__dirname, 'templates', projectChoice);
  const targetPath = path.join(CURR_DIR, projectName);

  const options: CliOptions = {
    projectName,
    templateName: projectChoice,
    templatePath,
    targetPath
  };

  if (!createProject(targetPath)) {
    return;
  }

  createDirectoryContents(templatePath, targetPath, projectName);

  postProcess(options);
}

main().catch(error => {
  console.error(chalk.red('An unexpected error occurred:'), error);
  process.exit(1);
});

function createProject(projectPath: string) {
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`));
    return false;
  }

  fs.mkdirSync(projectPath, { recursive: true });
  return true;
}

const SKIP_FILES = ['node_modules', '.template.json', '.git'];

function createDirectoryContents(templatePath: string, destinationPath: string, projectName: string) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = path.join(templatePath, file);
    const writePath = path.join(destinationPath, file);
    const stats = fs.statSync(origFilePath);

    if (SKIP_FILES.includes(file)) return;

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');
      contents = template.render(contents, { projectName });
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(writePath, { recursive: true });
      createDirectoryContents(origFilePath, writePath, projectName);
    }
  });
}

function postProcess(options: CliOptions) {
  const isNode = fs.existsSync(path.join(options.templatePath, 'package.json'));
  if (isNode) {
    if (shell.cd(options.targetPath).code !== 0) {
      console.error(chalk.red('Failed to change directory to the new project path.'));
      return false;
    }

    const result = shell.exec('npm install');
    if (result.code !== 0) {
      console.error(chalk.red('npm install failed while installing template dependencies.'));
      return false;
    }
  }

  return true;
}


