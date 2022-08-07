import * as core from '@actions/core'
import fs from 'fs';
import { EOL } from 'os';

function run(): void {
  const incrementBuildNumber = core.getInput('incrementBuildNumber');
  const buildLinks = core.getInput('buildLinks');
  const buildVersion = core.getInput('buildVersion');
  
  const settingsFilePath = 'ProjectSettings/ProjectSettings.asset';
  const settingsFile = fs.readFileSync(settingsFilePath, 'utf8');

  const regexOne = new RegExp('AndroidBundleVersionCode: (.)', 'g');
  const regexTwo = new RegExp(`buildNumber:${EOL}    Standalone: (.)${EOL}    iPhone: (.)${EOL}    tvOS: (.)`, 'gm');

  if (buildLinks) {
    const buildLinksArray = buildLinks.split(',');
    addBuildLinks(buildLinksArray, buildVersion);
  }

  let buildNumberMatch = regexOne.exec(settingsFile);
  let regexTwoMatch = regexTwo.exec(settingsFile);

  if(!buildNumberMatch)
    return;

  if(!regexTwoMatch)
    return;

  let modifiedFile = settingsFile;
  let buildNumber = parseInt(buildNumberMatch[1]);

  if(incrementBuildNumber == 'true')
    buildNumber++;

  modifiedFile = modifiedFile.replace(buildNumberMatch[0], `AndroidBundleVersionCode: ${buildNumber}`);
  modifiedFile = modifiedFile.replace(regexTwoMatch[0], `buildNumber:${EOL}    Standalone: ${buildNumber}${EOL}    iPhone: ${buildNumber}${EOL}    tvOS: ${buildNumber}`)
  
  fs.writeFileSync(settingsFilePath, modifiedFile);

  console.log(`Build number ${buildNumber}`);
  console.log(`Modified Settings ${modifiedFile}`);
}

function addBuildLinks(buildLinks : string[], buildVersion : string) : void {
  buildLinks.forEach(link => {
    if(link){
      const platform = link.split('/')[0];
      console.log(`Build link for ${platform} : ${link} : ${buildVersion}`);
    }
  });
}

run()
