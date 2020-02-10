// Your code here
function createEmployeeRecord(employeeRecord) {
  return {
    'firstName' : employeeRecord[0],
    'familyName' : employeeRecord[1],
    'title' : employeeRecord[2],
    'payPerHour': employeeRecord[3],
    'timeInEvents' : [],
    'timeOutEvents': [],
  }
}

function  createEmployeeRecords(arrayOfEmployees) {
  return arrayOfEmployees.map(createEmployeeRecord)
}

function createTimeInEvent(employeeObject, dateStamp) {
  let hours = parseInt(dateStamp.split(" ")[1]);
  let date = dateStamp.split(" ")[0];
  employeeObject['timeInEvents'].push(
    {'type' : "TimeIn",
     'hour' : hours,
     'date' : date
    });
  return employeeObject;
}

function createTimeOutEvent(employeeObject, dateStamp) {
  let hours = parseInt(dateStamp.split(" ")[1]);
  let date = dateStamp.split(" ")[0];
  employeeObject['timeOutEvents'].push(
    {'type' : "TimeOut",
     'hour' : hours,
     'date' : date
    });
  return employeeObject;  
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
  let timeInRecord = employeeRecord['timeInEvents'].find(record => (record['date'] == dateStamp));
  let timeOutRecord = employeeRecord['timeOutEvents'].find(record => (record['date'] == dateStamp));
  return (timeOutRecord.hour - timeInRecord.hour)/100;
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
  return hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  let wages = employeeRecord.timeInEvents.reduce((total, record) => wagesEarnedOnDate(employeeRecord, record.date)+total, 0);
  return wages;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(record => record.firstName ===  firstName);
}

function calculatePayroll(employeeRecordArray) {
  return employeeRecordArray.reduce((total, record) => allWagesFor(record) + total, 0);
}