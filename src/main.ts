import * as core from '@actions/core'
import fs from 'fs';
import { EOL } from 'os';

function run(): void {
  const updateChangelog = core.getInput('updateChangelog');
  const buildLinks = core.getInput('buildLinks');
  const buildVersion = core.getInput('buildVersion');
  const buildPrefix = core.getInput('buildPrefix');

  if (buildLinks && updateChangelog == 'true') {
    const buildLinksArray = buildLinks.split(',');
    addBuildLinks(buildLinksArray, buildVersion, buildPrefix);
  }
}

function addBuildLinks(buildLinks : string[], buildVersion : string, buildPrefix : string) : void {
  const changelogMDFilePath = 'Changelogs/Changelog.md';
  const changelogJSONFilePath = 'Changelogs/Changelog.json';
  const linkReg = /- \[(.*)\]\((.*)\)/g; 
  const dateReg = /## \[(.*)\](.*)/g;

  let changelogMDFile = fs.readFileSync(changelogMDFilePath, 'utf8');
  let changelogJSONFile = fs.readFileSync(changelogJSONFilePath, 'utf8');
  let logJson = JSON.parse(changelogJSONFile);

  const currentdate = new Date(); 
  const date = currentdate.getUTCDate().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const month = (currentdate.getUTCMonth()+1).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const year = currentdate.getUTCFullYear().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const hours = currentdate.getUTCHours().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const minutes = currentdate.getUTCMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const seconds = currentdate.getUTCSeconds().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  const datetime = date + "-" + month  + "-" + year + " " + hours + ":" + minutes + ":" + seconds;

  const dateLinkMatch = changelogMDFile.matchAll(dateReg);
  for(const match of dateLinkMatch){
    if(match && match.index && match[1] == buildVersion){
      console.log(match[0]);
      changelogMDFile = changelogMDFile.replace(`${match[0]}`, `## [${buildVersion}] - ${datetime}`);
    }
  }

  buildLinks.forEach(link => {
    if(link){
      const platform = link.split('/')[0];
      const buildLinkMatch = changelogMDFile.matchAll(linkReg);

      for(const match of buildLinkMatch){
        if(match && match.index){
          if(platform == match[1] && match[2].includes(buildVersion)){
            changelogMDFile = changelogMDFile.replace(`${match[0]}`, `- [${platform}](${buildPrefix}${link})`);
            console.log(`Found ${match[1]} : ${match[2]}`);
          }
        }
      }

      let releases = logJson['releases'];
      for(let release of releases) {
        if(release['versionNumber'] === buildVersion){
          release['releaseDate'] = datetime;
          let links = release['links'];
          for(let buildLink of links){
            if(buildLink['title'] === platform){
              buildLink['link'] = `${buildPrefix}${link}`;
              console.log(buildLink['link']);
            }
          }
        }
      }
    }
  });

  let releases = logJson['releases'];
  for(let release of releases) {
    if(release['versionNumber'] === buildVersion){
      let links = release['links'];
      for(let i= links.length; i--;){
        if(links[i]['link'] === buildVersion){
          console.log(`Removed from JSON ${links[i]['title']} : ${links[i]['link']}`);
          links.splice(i, 1);
        }
      }
    }
  }

  let modifiedLinkMatch = changelogMDFile.matchAll(linkReg);
  for(const match of modifiedLinkMatch){
    if(match && match.index){
      if(match[2] == buildVersion){
        changelogMDFile = changelogMDFile.replace(`${match[0]}${EOL}`, '');
        console.log(`Removed ${match[1]} : ${match[2]}`);
      }
    }
  }

  fs.writeFileSync(changelogJSONFilePath, JSON.stringify(logJson));
  fs.writeFileSync(changelogMDFilePath, changelogMDFile);
}

run()
