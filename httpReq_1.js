
//Step 1 code
//Left all code in from all the steps
// xhr = new XMLHttpRequest();
// response = new Object();
// response.value = {};
var response = { val: "start" };
var step1_url = "http://challenge.code2040.org/api/register";
var data = JSON.stringify({"token":"87cd455ff5de2050e9b915032f62c7db","github":"https://github.com/chantal517/code2040Task"});
request(step1_url, data, response);

var step2_url = 'http://challenge.code2040.org/api/reverse';
var data2 = JSON.stringify({"token":"87cd455ff5de2050e9b915032f62c7db"});
request(step2_url, data2, response, reverse);

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
  var data =JSON.stringify({"token":"87cd455ff5de2050e9b915032f62c7db", "string": s});
  request(url, data, response);
}
