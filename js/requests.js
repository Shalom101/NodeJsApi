  function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

var xhr = createCORSRequest('GET', url);
if (!xhr) {
  throw new Error('CORS not supported');
}


   function add() {
    var studentNo=document.getElementById('studentno');
    var fname=document.getElementById('firstname');
    var lname=document.getElementById('lastname');
    var clas=document.getElementById('class');
    var selected_class=clas.options[clas.selectedIndex].text;

    var data = "no="+studentNo+"&fname="+fname+"&lname="+lname+"&class="+selected_class+"";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    

    xhr.open("POST", "http://localhost:8000/students/");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "c3bd2290-5ad5-df09-1c56-ada01d3d9958");

    xhr.send(data);

     studentNo.value="";
     fname.value="";
     lname.value="";
     clas.value=1;

    //  document.getElementById('ok').style.opacity=1;

   }

function view(argument) {
    // body...
}