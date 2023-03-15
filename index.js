function createEmployeeRecord(array){
    array.firstName = array[0];
    array.familyName = array[1];
    array.title = array[2];
    array.payPerHour = array[3];
    array.timeInEvents = [];
    array.timeOutEvents = [];
    return array
}

function createEmployeeRecords(arrays){
    return arrays.map(function(array) {
        return createEmployeeRecord(array)
    })
}

let createTimeInEvent = function(punchTimeIn){
    let [date, hour] = punchTimeIn.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let createTimeOutEvent = function(punchTimeOut){
    let [date, time] = punchTimeOut.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date,     
    })
        return this
}

let hoursWorkedOnDate = function(queryDate){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === queryDate
   })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === queryDate
    })
    
    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(queryDate){
    let rawWage = hoursWorkedOnDate.call(this, queryDate)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(){
    let eligibleDates = this.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor.call(rec)
      }, 0)
  }