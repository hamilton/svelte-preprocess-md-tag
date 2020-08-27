/*
This file runs the entire test suite.

Each test has a before.svelte and after.svelte file in samples/.

*/

import { readdirSync } from "fs";
import { setupTest } from "./setup-test";

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const directories = getDirectories(__dirname + "/samples");

directories.forEach((dir) => {
  let fullDir = `${__dirname}/samples/${dir}`;
  describe(dir, () => {
    setupTest(fullDir);
  });
});
