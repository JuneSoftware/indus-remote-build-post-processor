import fs from 'fs';
import { EOL } from 'os';

function run(): void {
  const filePath = 'ProjectSettings/ProjectSettings.asset';
  const settingsFile = fs.readFileSync(filePath, 'utf8');

  const regexOne = new RegExp('AndroidBundleVersionCode: (.)', 'g');
  const regexTwo = new RegExp(`buildNumber:${EOL}    Standalone: (.)${EOL}    iPhone: (.)${EOL}    tvOS: (.)`, 'gm');

  let buildNumberMatch = regexOne.exec(settingsFile);
  let regexTwoMatch = regexTwo.exec(settingsFile);

  if(!buildNumberMatch)
    return;

  if(!regexTwoMatch)
    return;

  let modifiedFile = settingsFile;
  let buildNumber = parseInt(buildNumberMatch[1]);
  buildNumber++;

  modifiedFile = modifiedFile.replace(buildNumberMatch[0], `AndroidBundleVersionCode: ${buildNumber}`);
  modifiedFile = modifiedFile.replace(regexTwoMatch[0], `buildNumber:\r\n    Standalone: ${buildNumber}\r\n    iPhone: ${buildNumber}\r\n    tvOS: ${buildNumber}`)
  
  fs.writeFileSync(filePath, modifiedFile);

  console.log(`Build number ${buildNumber}`);
  console.log(`Modified Settings ${modifiedFile}`);
}

run()
