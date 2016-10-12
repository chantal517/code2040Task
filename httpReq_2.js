//Step 2 code
xhr = new XMLHttpRequest();
var url = "url";
xhr.open("POST", 'http://challenge.code2040.org/api/reverse', true);
xhr.setRequestHeader("Content-type", "application/json");
xhr.onreadystatechange = function () {
  //make sure XMLHttpRequest is 'done' and good response from Endpoint
    if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseText;
        console.log(res);
        res = res.split("").reverse().join("");
        console.log(res);
        var reversed = JSON.stringify({"token":"87cd455ff5de2050e9b915032f62c7db","string":res});
    }
}
var data = JSON.stringify({"token":"87cd455ff5de2050e9b915032f62c7db"});
xhr.send(data);
