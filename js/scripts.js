var _MS_PER_DAY = 24 * 60 * 60 * 1000; //24H * 60M * 60s * 1000ms
var _HOURS_IN_DAY = 24;
var _HOUR = 60;
var _SECONDS = 60;
var _MILISECONDS = 1000;


//Relevant to the page
var currentDate = new Date();
var todayDD = currentDate.getDate();
var todayMM = currentDate.getMonth();
var todayYYYY= currentDate.getFullYear();
var todaysDateString = new Date().toJSON().slice(0,10).replace(/-/g,'/');


var fromHH, fromMM,toHH,toMM, fromDate, toDate;
var milDifference; //the difference between the hours in mil seconds
var extractedHour, extractedMinutes, extractedDays, result;


function submitButton() {
    //fetch the values from the fields
    fromHH = document.getElementById("fromHour");
    fromMM = document.getElementById("fromMinute");
    toHH = document.getElementById("toHour");
    toMM = document.getElementById("toMinute");
    fromDate = new Date (document.getElementById("fromDate").value);
    toDate = new Date (document.getElementById("toDate").value);

    //creates a simple date object
    var from = new Date (fromDate.getFullYear(),fromDate.getMonth(),fromDate.getDate(),fromHH.value,fromMM.value);
    var to =  new Date (toDate.getFullYear(),toDate.getMonth(),toDate.getDate(),toHH.value,toMM.value);


    //calculate date difference
    dates_differences(from,to);

    //print result
    var resultString = resultString = extractedHour+ " hours" +", "+extractedMinutes+" Minutes";

    if (extractedDays >= 1){
        resultString = extractedDays + " Days, "+resultString;
    }

    document.getElementById("result").value= resultString;

}



//Date calculation is done in ms therefore the dates need to be converted
function dates_differences(from,to){
    var utcFrom = Date.UTC(from.getFullYear(),from.getMonth(),from.getDate(),from.getHours(),from.getMinutes());
    var utcTo= Date.UTC(to.getFullYear(),to.getMonth(),to.getDate(),to.getHours(),to.getMinutes());

    milDifference=  convert_ms_to_hr(utcTo-utcFrom) ;
    //console.log("Calculating diff: "+ milDifference) ;

}

/*
This method recieves the time difference in miliseconds, extracts days, hours and minutes
 */
function convert_ms_to_hr(msTime){
      result =  msTime/(_MILISECONDS*_SECONDS * _HOUR);

       extractedHour = parseInt(result);
       extractedMinutes = (msTime /(_MILISECONDS*_SECONDS))%60;
       extractedDays = parseInt(extractedHour/24);

      //console.log("result: "+ result + " \nHours: " + extractedHour + " \nMinutes: " + extractedMinutes);
      return result;
}

function validateHours(){

}

function validateHours(element){
    var hour = element.value //document.getElementById("fromHour");



    if (element.value>=24){
        element.value="23";
    }

    if (element.value<0){
        element.value="0";
    }


}


function validate_minutes(element){
    if (element.value <0){
        element.value=0;
    }

    if (element.value > 59){
        element.value=59;
    }
}

function enhance_number(element){
    var number = element;
    if (number.value < 10 && number.value >0){
        number.value = '0'+number.value;
    }

}