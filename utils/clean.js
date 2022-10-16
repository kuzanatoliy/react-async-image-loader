const { rm } = require('fs/promises');
const {
  compilerOptions: { declarationDir, outDir },
} = require('../tsconfig.json');

const paths = [declarationDir, outDir];

paths.reduce((prev, curr) => prev.then(rm(curr, { recursive: true, force: true })), Promise.resolve());
