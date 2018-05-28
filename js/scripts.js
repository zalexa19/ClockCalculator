var _MS_PER_DAY = 24 * 60 * 60 * 1000; //24H * 60M * 60s * 1000ms
var _HOURS_IN_DAY = 24;
var _HOUR = 60;
var _SECONDS = 60;
var _MILISECONDS = 1000;
var _MAX_MINUTES = 59;
var _MIN_MINUTES = 0;
var _MAX_HOUR = 23;
var MIN_HOUR=_MIN_MINUTES;


//Relevant to the page
var currentDate = new Date();
var todayDD = currentDate.getDate();
var todayMM = currentDate.getMonth();
var todayYYYY= currentDate.getFullYear();
var todaysDateString = new Date().toJSON().slice(0,10).replace(/-/g,'/');
document.getElementById("error").style.visibility="hidden";


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


    if (validate_fields(fromHH,fromMM,fromDate,toHH,toMM,toDate) == 0) {


        //creates a simple date object
        var from = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate(), fromHH.value, fromMM.value);
        var to = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), toHH.value, toMM.value);


        //calculate date difference
        dates_differences(from, to);

        //print result
        var resultString = resultString = extractedHour + " hours" + ", " + extractedMinutes + " Minutes";

        if (extractedDays >= 1) {
            resultString = extractedDays + " Days, " + resultString;
        }

        document.getElementById("result").value = resultString;
    }
}



function validate_fields(fromHH, fromMM, fromDate, toHH, toMM, toDate){
    var errorFlag=0;

    if (fromHH == null || fromHH =="" ){
        errorFlag=1;

        document.getElementById("error").style.visibility="visible";
        document.getElementById("error").innerHTML="Fields are required";

    }

    return errorFlag;
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

      return result;
}


function default_values () {
    var currentHH = currentDate.getHours();
    var currentMM = currentDate.getMinutes();
    var todaysDate;


    if (todayDD <10){
    todayMM="0"+todayMM;
    }

    todaysDate = todayYYYY+"-"+"0"+todayMM+"-"+todayDD;

    document.getElementById("fromDate").value=todaysDate;
    document.getElementById("toDate").value=todaysDate;

    document.getElementById("fromHour").value=currentHH;
    document.getElementById("toHour").value=currentHH;
    document.getElementById("fromMinute").value=currentMM;
    document.getElementById("toMinute").value=currentMM;

}



function validateHours(element){
    var hour = element.value //document.getElementById("fromHour");
    console.log(element.value);

        if (element.value > _MAX_HOUR) {
            element.value = _MAX_HOUR;
        }

        if (element.value < 0) {
            element.value = "0";
        }

}



/*
    if the number inserted is invalid, it's change to the max minutes or min minutes
    If the minutes are <10, 0 is added. unless 0 already exists
 */
function validate_minutes(element){
    if (element.value <_MIN_MINUTES){
        element.value=_MIN_MINUTES;
    }

    if (element.value > _MAX_MINUTES){
        element.value=_MAX_MINUTES;
    }
}

function enhance_number(element){
    var number = Number(element.value);


    if (number < 10) {
        var num=number/10;
        console.log(num);

        if (parseInt(num)==0){

            element.value = '0'+number;
        }
    }
}