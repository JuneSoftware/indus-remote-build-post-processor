import fs from 'fs'

function run(): void {
  const filePath = 'ProjectSettings/ProjectSettings.asset';
  const settingsFile = fs.readFileSync(filePath, 'utf8');

  const regexOne = /AndroidBundleVersionCode: (.)/g
  const regexTwo = /buildNumber:\n    Standalone: (.)\n    iPhone: (.)\n    tvOS: (.)/gm;

  let buildNumberMatch = regexOne.exec(settingsFile);
  let regexTwoMatch = regexTwo.exec(settingsFile);

  console.log(`Reading File ${buildNumberMatch}`);
  console.log(`Settings File ${regexTwoMatch}`);

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
