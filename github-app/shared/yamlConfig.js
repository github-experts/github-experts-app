var YAML = require('json2yaml');

module.exports = {
  generate: function(githubUsername) {
    ymlText = YAML.stringify({
      "tutors": [{
        "handle": githubUsername,
        "email": "",
        "timezone": "America/Los_Angeles",
        "startTime": "8:00",
        "endTime": "18:00",
        "excludeWeekends": true,
        "rate": 50.00,
        "openToDonate": true
      }]
    });
    return ymlText;
  }
}
