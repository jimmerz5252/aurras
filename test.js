const Mocha = require('mocha');
const { assert } = require('chai');
const _ = require('lodash');

/**
 * Problem:
 * You are given some data containing {employee, manager} pairs, please
 * build an organization chart from this set of data. Some sample input (line 74) and
 * output (line 113) can be found at the bottom.
 *
 * Task:
 * Implement the buildOrgChart function
 * - Each report (employee) should occupy one row with their names printed
 *   one column deeper than their managers, indented by dashes (-)
 *
 * - Reports should have one more dash than their respective managers. The 
 *   top-level manager should not be indented. (See sample output below)
 *
 * - Reports should be sorted alphabetically at each level
 *
 * - Assume each report only has one manager
 *
 * - Assume all names are unique
 *
 * * OPTIONAL *
 * - If there are no top level managers, the function should throw an error
 *
 * - If there is a circular chain of command, the function should throw
 *   an error. (i.e. Employee A -> Employee B -> Employee C -> Employee A)
 *
 *
 * Expectations:
 * - All tests should pass
 *
 **/

// Returns n number of dashes as a string, or an empty string if n is 0
function printDashes(n) {
  return "-".repeat(n); 
}

/* Your implementation below */

function buildOrgChart(employeeManagerPairs) {
  let results = '';
  
  var reports = {};
  
  for(var i = 0; i < employeeManagerPairs.length; i++){
    
    if(reports[employeeManagerPairs[i].manager] == undefined){
      reports[employeeManagerPairs[i].manager] = [];
    }
    
    reports[employeeManagerPairs[i].manager].push(employeeManagerPairs[i].employee);   
    
  }
  
  
  //   find top level managers.
  var topLevel = ''
  for(var i = 0; i < employeeManagerPairs.length; i++){
  
    if( employeeManagerPairs[i].manager == ''){
        topLevel = employeeManagerPairs[i].employee;
    }
  }
  
  var processing = [{ employee: topLevel, level: 0}]
  var dashes = '';
  
  while(processing.length > 0){
    
    
    var nextPerson = processing.pop();
    
    results += printDashes(nextPerson.level) + nextPerson.employee + '\n'; 
    
    // Add people to be processed.
    if(reports[nextPerson] != undefined){
      
      var morePeople = reports[nextPerson].sort().reverse();
      for(var i = 0; i < morePeople.length; i++){
        processing.push({ employee: morePeople[i], level: nextPerson.level + 1});
      }
    }
    
  }

  return results.trim();
}

/* End of your implementation */

const mocha = new Mocha();
mocha.suite.emit('pre-require', this, 'solution', mocha);

describe('Interview - Build org chart', function () {
  it('should build the org chart', function () {
    assert.equal(buildOrgChart(orgData), output.trim());
  });

  /* OPTIONAL BELOW */

//  it('should throw an error if there are no top level managers', function () {
//    assert.throws(() => {
//      buildOrgChart(noTopLevelOrgData);
//    }, 'No top level managers found');
//  });

//  it('should throw an error if there is a circular chain of command', function () {
//    assert.throws(() => {
//      buildOrgChart(circularOrgData);
//    }, 'Circular chain detected');
//  });
});

mocha.run();

/* Data */

const orgData = [
  { employee: 'jared', manager: 'beck' },
  { employee: 'sofia', manager: 'beck' },
  { employee: 'carl', manager: 'jared' },
  { employee: 'luka', manager: 'sofia' },
  { employee: 'safiyyah', manager: 'sofia' },
  { employee: 'lex', manager: 'carl' },
  { employee: 'julia', manager: 'sofia' },
  { employee: 'edward', manager: 'sofia' },
  { employee: 'patty', manager: 'carl' },
  { employee: 'lorenzo', manager: 'beck' },
  { employee: 'beck', manager: '' },
  { employee: 'mike', manager: 'sofia' },
  { employee: 'jess', manager: 'carl' },
  { employee: 'tess', manager: 'beck' },
  { employee: 'polly', manager: 'beck' },
  { employee: 'summer', manager: 'carl' },
  { employee: 'jack', manager: 'carl' },
  { employee: 'kylo', manager: 'beck' },
  { employee: 'dione', manager: 'carl' },
  { employee: 'jon', manager: 'carl' },
  { employee: 'matt', manager: 'sofia' },
  { employee: 'zach', manager: 'sofia' },
  { employee: 'luke', manager: 'carl' },
  { employee: 'tom', manager: 'beck' },
  { employee: 'chris', manager: 'sofia' },
  { employee: 'alisa', manager: 'carl' },
  { employee: 'jeff', manager: 'carl' },
  { employee: 'ashelee', manager: 'carl' },
  { employee: 'louis', manager: 'sofia' },
  { employee: 'maisy', manager: 'edward' },
  { employee: 'tammy', manager: 'tom' },
  { employee: 'jay', manager: 'edward' },
  { employee: 'jonathan', manager: 'louis' },
  { employee: 'vince', manager: 'edward' },
  { employee: 'billy', manager: 'carl' },
  { employee: 'bruno', manager: 'carl' },
];

const output = `
beck
-jared
--carl
---alisa
---ashelee
---billy
---bruno
---dione
---jack
---jeff
---jess
---jon
---lex
---luke
---patty
---summer
-kylo
-lorenzo
-polly
-sofia
--chris
--edward
---jay
---maisy
---vince
--julia
--louis
---jonathan
--luka
--matt
--mike
--safiyyah
--zach
-tess
-tom
--tammy`;

/* Data for optional tasks */

const noTopLevelOrgData = [
  { employee: 'jared', manager: 'beck' },
  { employee: 'sofia', manager: 'beck' },
  { employee: 'carl', manager: 'jared' },
  { employee: 'luka', manager: 'sofia' },
  { employee: 'safiyyah', manager: 'sofia' },
  { employee: 'lex', manager: 'carl' },
  { employee: 'julia', manager: 'sofia' },
  { employee: 'edward', manager: 'sofia' },
  { employee: 'patty', manager: 'carl' },
  { employee: 'lain', manager: 'beck' },
  { employee: 'mike', manager: 'sofia' },
  { employee: 'jess', manager: 'carl' },
  { employee: 'tess', manager: 'beck' },
  { employee: 'polly', manager: 'beck' },
  { employee: 'summer', manager: 'carl' },
  { employee: 'jack', manager: 'carl' },
  { employee: 'bianca', manager: 'beck' },
  { employee: 'dione', manager: 'carl' },
  { employee: 'jon', manager: 'carl' },
  { employee: 'matt', manager: 'sofia' },
  { employee: 'zach', manager: 'sofia' },
  { employee: 'luke', manager: 'carl' },
  { employee: 'tom', manager: 'beck' },
  { employee: 'chris', manager: 'sofia' },
  { employee: 'alisa', manager: 'carl' },
  { employee: 'jeff', manager: 'carl' },
  { employee: 'ashelee', manager: 'carl' },
  { employee: 'louis', manager: 'sofia' },
  { employee: 'maisy', manager: 'edward' },
  { employee: 'tammy', manager: 'tom' },
  { employee: 'jay', manager: 'edward' },
  { employee: 'jonathan', manager: 'louis' },
  { employee: 'vince', manager: 'edward' },
  { employee: 'billy', manager: 'carl' },
  { employee: 'bruno', manager: 'carl' },
];

const circularOrgData = [
  { employee: 'beck', manager: '' },
  { employee: 'jared', manager: 'beck' },
  { employee: 'sofia', manager: 'beck' },
  { employee: 'carl', manager: 'jared' },
  { employee: 'luka', manager: 'sofia' },
  { employee: 'safiyyah', manager: 'sofia' },
  { employee: 'lex', manager: 'carl' },
  { employee: 'julia', manager: 'sofia' },
  { employee: 'edward', manager: 'sofia' },
  { employee: 'patty', manager: 'carl' },
  { employee: 'lain', manager: 'beck' },
  { employee: 'mike', manager: 'sofia' },
  { employee: 'jess', manager: 'carl' },
  { employee: 'tess', manager: 'beck' },
  { employee: 'polly', manager: 'beck' },
  { employee: 'summer', manager: 'carl' },
  { employee: 'jack', manager: 'carl' },
  { employee: 'bianca', manager: 'beck' },
  { employee: 'dione', manager: 'carl' },
  { employee: 'jon', manager: 'carl' },
  { employee: 'matt', manager: 'sofia' },
  { employee: 'zach', manager: 'sofia' },
  { employee: 'luke', manager: 'carl' },
  { employee: 'tom', manager: 'beck' },
  { employee: 'chris', manager: 'sofia' },
  { employee: 'jared', manager: 'lex' },
  { employee: 'alisa', manager: 'carl' },
  { employee: 'jeff', manager: 'carl' },
  { employee: 'ashelee', manager: 'carl' },
  { employee: 'louis', manager: 'sofia' },
  { employee: 'maisy', manager: 'edward' },
  { employee: 'tammy', manager: 'tom' },
  { employee: 'jay', manager: 'edward' },
  { employee: 'jonathan', manager: 'louis' },
  { employee: 'vince', manager: 'edward' },
  { employee: 'billy', manager: 'carl' },
  { employee: 'bruno', manager: 'carl' },
];
