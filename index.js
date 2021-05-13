/* Your Code Here */

function createEmployeeRecord(record){
    const employee = {
        firstName: record[0],
        familyName : record[1], 
        title: record[2], 
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(records){
    return records.map(record => {
        return createEmployeeRecord(record)
    })
}

function createTimeInEvent(time){
    const TimeIn = {
        type: "TimeIn", 
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0]
    }
    this.timeInEvents.push(TimeIn)
    return this
}

function createTimeOutEvent(time){
    const TimeOut = {
        type: "TimeOut", 
        hour: parseInt(time.split(" ")[1]),
        date: time.split(" ")[0]
    }
    this.timeOutEvents.push(TimeOut)
    return this
}

function hoursWorkedOnDate(date){
    const timeIn = this.timeInEvents.find(e=> e.date === date)
    const timeOut = this.timeOutEvents.find(e=> e.date === date)
    return (timeOut.hour - timeIn.hour) * 0.01
}


function wagesEarnedOnDate(date){
    const hours = hoursWorkedOnDate.call(this, date)
    const rate = this.payPerHour
    return rate * hours
}

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

function findEmployeeByFirstName(arr, firstName){
    return arr.find(employee => employee.firstName === firstName)
}

function calculatePayroll(records){
    const pay = records.map(record => allWagesFor.call(record))
    return pay.reduce((a, b) => a+b)
}