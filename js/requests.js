
        function ok() {
         document.getElementById('ok').style.opacity=1;
        }

         function error() {
         document.getElementById('error').style.opacity=1;
        }

        function delete_() {
         document.getElementById('delete').style.opacity=1;
        }

   function add() {
    var fname=document.getElementById('firstname');
    var lname=document.getElementById('lastname');
    var clas=document.getElementById('class');
    var grade=document.getElementById('grade');


    var rfname=fname.value;
    var rlname=lname.value;
    var selected_class=clas.options[clas.selectedIndex].text;
    var selected_grade=grade.options[grade.selectedIndex].text;

    var data = "fname="+rfname+"&lname="+rlname+"&class="+selected_class+"&grade="+selected_grade+"";
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
    xhr.setRequestHeader("postman-token", "d3c53d9f-f730-4ca7-509e-6066a5ef6e6e");

    xhr.send(data);

     fname.value="";
     lname.value="";
     clas.value=1;
     grade.value=1;

     ok();

     function exit() {
         document.getElementById('ok').style.opacity=0;
     }
        setTimeout(exit,1500);
   }





function search() {
  var data = "fname= &lname= &class= &grade= ";

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      var result=  JSON.parse(this.responseText);
    }

    var rfn=result.Firstname;
    var rln=result.Lastname;
    var rcl=result.Class;
    var rgr=result.Grade;


    var fname=document.getElementById('firstname');
    var lname=document.getElementById('lastname');
    var clas=document.getElementById('old_class');
    var grade=document.getElementById('old_grade');


    fname.value=rfn;
    lname.value=rln;
    clas.innerHTML=rcl;
    grade.innerHTML=rgr;

  });


    var search=document.getElementById('search').value;
  xhr.open("GET", "http://localhost:8000/students/"+search+"");
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "32f73f4c-900f-3d51-5929-9b2d0b4540b8");


  xhr.send(data);

}




function update() {

    var fname1=document.getElementById('firstname');
    var lname1=document.getElementById('lastname');
    var clas1=document.getElementById('class');
    var grade1=document.getElementById('grade');
    var Oclass=document.getElementById('old_class');
    var Ograde=document.getElementById('old_grade');

    var Ufname=fname1.value;
    var Ulname=lname1.value;
    var s_class=clas1.options[clas1.selectedIndex].text;
    var s_grade=grade1.options[grade1.selectedIndex].text;



    var data = "fname="+Ufname+"&lname="+Ulname+"&class="+s_class+"&grade="+s_grade+"";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    var search_update=document.getElementById('search');
    var searchValue=search_update.value;

    xhr.open("PUT", "http://localhost:8000/students/"+searchValue+"");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "c2a07b4a-4818-1b44-5d2a-4888b1551a03");

    xhr.send(data);

    ok();

         function exit() {
         document.getElementById('ok').style.opacity=0;
     }

        setTimeout(exit,1500);

        fname1.value="";
        lname1.value="";
        Oclass.innerHTML="";
        Ograde.innerHTML="";
        clas1.value=1;
        grade1.value=1;


}



function remove() {
  var data = "fname= &lname= &class= &grade= ";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    var search_remove=document.getElementById('search').value;
    xhr.open("DELETE", "http://localhost:8000/students/"+search_remove+"");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "99520c69-d535-66ec-2f82-0cea20d7d834");


    document.getElementById('firstname').value="";
    document.getElementById('lastname').value="";
    document.getElementById('class').value=1;
    document.getElementById('grade').value=1;
    document.getElementById('old_class').innerHTML="";
    document.getElementById('old_grade').innerHTML="";
    document.getElementById('search').value="";



    xhr.send(data);

    delete_();


         function exit() {
         document.getElementById('delete').style.opacity=0;
     }

        setTimeout(exit,1500);
}


 function all() {

   var data = "fname= &lname= &class= &grade= ";


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        // console.log(this.responseText);
      }
        var myBooks = JSON.parse(this.responseText);

        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        var table = document.createElement("table");
         table.className = 'table table-striped table-bordered table-hover table-condensed';

        var tr = table.insertRow(-1);

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        for (var i = 0; i < myBooks.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i][col[j]];
            }
        }

        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    });

    xhr.open("GET", "http://localhost:8000/students/");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "a09bc67c-345e-f945-d396-6703d7c3db39");

    xhr.send(data);

   }
