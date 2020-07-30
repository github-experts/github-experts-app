var YAML = require('json2yaml');

/*
Yaml	Description
tutors:	Array of tutors
- patniko	GitHub username of repo subject matter expert
  - timezone: PST	Timezone the maintainer lives in
  - startTime: 8	Beginning of the tutoring window in military time
  - endTime: 18	End of the tutoring window in military time
  - excludeWeekends: true	Tutor does not accept requests for weekends
  - rate: 50.00	Rate for a 30 minute tutoring session
  - donateTime: true	Open to donating time
*/

module.exports = {
  generate: function(githubUsername) {
    ymlText = YAML.stringify({
      "tutors": [{
        "username": githubUsername,
        "timezone": "PST",
        "startTime": 8,
        "endTime": 18,
        "excludeWeekends": true,
        "rate": 50.00,
        "donateTime": true
      }]
    });
    return ymlText;
  }
}

