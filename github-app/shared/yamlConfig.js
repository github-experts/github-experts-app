var YAML = require('json2yaml');

module.exports = {
  generate: function(githubUsername) {
    ymlText = `
---
experts: 
- handle: '${githubUsername}'
  email: ''
  timeZone: 'America/Los_Angeles'
  startTime: '8:00'
  endTime: '18:00'
  excludeWeekends: true
  rate: 50
  openToDonate: true
`;
  return ymlText;
  }
}
