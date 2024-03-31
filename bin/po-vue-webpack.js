#!/usr/bin/env node

import { program } from 'commander';
import { createProject } from './po-vue-webpack-create.js';

program
  .command('create <projectName>')
  .action((projectName) => {
    createProject(projectName);
  });
program.parse();