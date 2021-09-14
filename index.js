/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// populates a record from an Array
// 1) has a function called createEmployeeRecord
// createEmployeeRecord
// 2) populates a firstName field from the 0th element
// 3) populates a familyName field from the 1th element
// 4) populates a title field from the 2th element
// 5) populates a payPerHour field from the 3th element
// 6) initializes a field, timeInEvents, to hold an empty Array
// 7) initializes a field, timeOutEvents, to hold an empty Array
function createEmployeeRecord(array) {
    const employeeInfo = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employeeInfo;
};

// process an Array of Arrays into an Array of employee records
// 1) has a function called createEmployeeRecords
// createEmployeeRecords
// 2) its implementation makes use of of the createEmployeeRecord function
// 3) creates two records
// 4) correctly assigns the first names
function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord);
};

// it adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
// 1) has a function called createTimeInEvent
// createTimeInEvent
// 2) creates the correct type
// 3) extracts the correct date
// 4) extracts the correct hour
function createTimeInEvent(dataStamp) {
    let [date, hour] = dataStamp.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return this;
};

// it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
// 1) has a function called createTimeOutEvent
// createTimeOutEvent
// 2) creates the correct type
// 3) extracts the correct date
// 4) extracts the correct hour
function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return this;
};

// Given an employee record with a date-matched timeInEvent and timeOutEvent
// 1) hoursWorkedOnDate calculates the hours worked when given an employee record and a date
// hoursWorkedOnDate
// 2) calculates that the employee worked 2 hours
function hoursWorkedOnDate(date) {
    let inEvent = this.timeInEvents.find(function (e) {
        return e.date === date
    });

    let outEvent = this.timeOutEvents.find(function (e) {
        return e.date === date
    });

    return (outEvent.hour - inEvent.hour) / 100
};

// Given an employee record with a date-matched timeInEvent and timeOutEvent
// 1) wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
// wagesEarnedOnDate
// 2) calculates that the employee earned 54 dollars
// 3) uses hoursWorkedOnDate
function wagesEarnedOnDate(date) {
    const total = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return parseFloat(total.toString())
};

// Dependent functions: findEmployeeByFirstName(collection, firstNameString)
// 7) exists
// 8) finds "Loki" 
function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function (e) {
        return e.firstName === firstName
    });
};

// Full Payroll Test
// from several imported CSV structures
// calculatePayroll
// 8) exists
// 9) correctly sums the payroll burden to $11,880 when passed an array of employee records
function calculatePayroll(array) {
    const reducer = (previousValue, currentValue) => previousValue + allWagesFor.call(currentValue)
    return array.reduce(reducer, 0)
};