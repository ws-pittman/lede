import * as chalk from 'chalk';

import { globProm, asyncMap, existsProm } from "../utils";


export async function lsCommand(args, workingDir) {
  let projects = await globProm(`${workingDir}/*`);
  let existingProjects = await asyncMap(projects, async (p) => {
    try {
      let file = await existsProm(`${p}/projectSettings.js`);
      if (file.file) {
        return p.split('/')[p.split('/').length -1]
      }
    } catch(e) {
      if (e.code !== 'ENOENT') {
        console.log(e)
      }
      return null;
    }
  });
  existingProjects.filter(x => x !== null)
    .forEach((p, i) => {
      if (i % 2 === 0) {
        console.log(chalk.bgCyan.bold.black(" " + p + " "))
      } else {
        console.log(chalk.bgWhite.bold.black(" " + p + " "))
      }
    });
}