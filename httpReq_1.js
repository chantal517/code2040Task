/*Code 2040 challenge
  *Left all the code from all 5 steps
  * Decided to use javascript and wanted it to run in browsers
  * Made blank webpage to link in JS plan to make front end webpage later
  */

var response = { val: "start" };
var step1_url = "http://challenge.code2040.org/api/register";
var data = JSON.stringify({"token":apikey, "github":"https://github.com/chantal517/code2040Task"});
request(step1_url, data, response);

var step2_url = 'http://challenge.code2040.org/api/reverse';
var data2 = JSON.stringify({"token":apikey});
request(step2_url, data2, response, reverse);

var step3_url = 'http://challenge.code2040.org/api/haystack';
request(step3_url, data2, response, needleHay);

var step4_url = 'http://challenge.code2040.org/api/prefix';
request(step4_url, data2, response, substring);

var step5_url = 'http://challenge.code2040.org/api/dating';
request(step5_url, data2, response, dateInterval);


function request(url, data, res, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);

  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function () {
    //make sure XMLHttpRequest is 'done' and good response from Endpoint
      if (xhr.readyState == 4 && xhr.status == 200) {
          res.val = xhr.responseText;
          console.log(res.val);
          if(callback)
          callback(res.val);
      }
  };
  xhr.send(data);
}
//Function to reverse the String and post to Endpoint
function reverse(s){
  s = s.split("").reverse().join("");
  var url = 'http://challenge.code2040.org/api/reverse/validate';
  var data =JSON.stringify({"token":apikey, "string": s});
  request(url, data, response);
}

function needleHay(data){
  var result = JSON.parse(data);
  var key = result.needle;
  for (var i = 0; i < result.haystack.length; i++) {
      if(result.haystack[i] == key){
        var index = i;
      }
  }
  var url = 'http://challenge.code2040.org/api/haystack/validate';
  var data =JSON.stringify({"token":apikey, "needle": index});
  request(url, data, response);
}

function substring(sub){
  var result = JSON.parse(sub);
  var nonSub =[];
  var prefix = result.prefix;

  for (var i = 0; i < result.array.length; i++) {
      if(!result.array[i].startsWith(prefix)){
        nonSub.push(result.array[i]);
      }
  }
  var url = 'http://challenge.code2040.org/api/prefix/validate';
  var data =JSON.stringify({"token":apikey, "array": nonSub});
  request(url, data, response);
}

function dateInterval(d){
  var result = JSON.parse(d);
  var sentDate = Date.parse(result.datestamp);
  var interval = result.interval;
  var lastInterval = interval * 1000;
  var final = sentDate + lastInterval;
  var e = new Date(final);

  var offset = e.getTimezoneOffset() * 60 * 1000;
  var withOffset = e.getTime();
  var withoutOffset = withOffset - offset;
  var d1 = new Date(withOffset);
  d1 = formatLocalDate(d1);
  var url = 'http://challenge.code2040.org/api/dating/validate';
  var data =JSON.stringify({"token":apikey, "datestamp": d1});
  request(url, data, response);
}

//Grabbed a function to transition to ISO date manually
//Built in function was not working in all browsers
function formatLocalDate(d) {
    function pad(n) {return n<10 ? '0'+n : n}
    return d.getUTCFullYear()+'-'
         + pad(d.getUTCMonth()+1)+'-'
         + pad(d.getUTCDate())+'T'
         + pad(d.getUTCHours())+':'
         + pad(d.getUTCMinutes())+':'
         + pad(d.getUTCSeconds())+'Z'
}
