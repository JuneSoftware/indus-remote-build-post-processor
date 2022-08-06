import core from '@actions/core'
import fs from 'fs';
import { EOL } from 'os';

function run(): void {
  const incrementBuildNumber = core.getBooleanInput('incrementBuildNumber');
  
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

  if(incrementBuildNumber)
    buildNumber++;

  modifiedFile = modifiedFile.replace(buildNumberMatch[0], `AndroidBundleVersionCode: ${buildNumber}`);
  modifiedFile = modifiedFile.replace(regexTwoMatch[0], `buildNumber:${EOL}    Standalone: ${buildNumber}${EOL}    iPhone: ${buildNumber}${EOL}    tvOS: ${buildNumber}`)
  
  fs.writeFileSync(filePath, modifiedFile);

  console.log(`Build number ${buildNumber}`);
  console.log(`Modified Settings ${modifiedFile}`);
}

run()
