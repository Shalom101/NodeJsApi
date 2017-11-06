
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
    var studentNo=document.getElementById('studentno');
    var fname=document.getElementById('firstname');
    var lname=document.getElementById('lastname');
    var clas=document.getElementById('class');

    var rstudentNo=studentNo.value;
    var rfname=fname.value;
    var rlname=lname.value;
    var selected_class=clas.options[clas.selectedIndex].text;



    var data = "no="+rstudentNo+"&fname="+rfname+"&lname="+rlname+"&class="+selected_class+"";

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

     ok();

     function exit() {
         document.getElementById('ok').style.opacity=0;
     }

        setTimeout(exit,1500);

   }

function search() {
  var data = "no= &fname=  &lname= &class=";

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      console.log(this.responseText);
      var result=  JSON.parse(this.responseText);
        console.log(result.studentNo);

    }
    var rNo=result.studentNo;
    var rfn=result.firstname;
    var rln=result.lastname;
    var rcl=result.class;

    var studentNo=document.getElementById('studentNo');
    var fname=document.getElementById('fname');
    var lname=document.getElementById('lname');
    var clas=document.getElementById('class');

    studentNo.value=rNo;
    fname.value=rfn;
    lname.value=rln;
    clas.value=rcl;

    console.log(rln);
  });


    var search=document.getElementById('search').value;
  xhr.open("GET", "http://localhost:8000/students/"+search+"");
  xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("cache-control", "no-cache");
  xhr.setRequestHeader("postman-token", "32f73f4c-900f-3d51-5929-9b2d0b4540b8");

 
  xhr.send(data);

}

 
function update() {

    var studentNo_=document.getElementById('studentNo').value;
    var fname_=document.getElementById('fname').value;
    var lname_=document.getElementById('lname').value;
    var clas_=document.getElementById('class').value;

    var data = "no="+studentNo_+"&fname="+fname_+"&lname="+lname_+"&class="+clas_+"";


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    var search_update=document.getElementById('search').value;

    xhr.open("PUT", "http://localhost:8000/students/"+search_update+"");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "c2a07b4a-4818-1b44-5d2a-4888b1551a03");

    xhr.send(data);

    ok();

         function exit() {
         document.getElementById('ok').style.opacity=0;
     }

        setTimeout(exit,1500);

}

function remove() {


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

    
     document.getElementById('studentNo').value="";
    document.getElementById('fname').value="";
    document.getElementById('lname').value="";
    document.getElementById('class').value="";
    document.getElementById('search').value="";
    delete_();


         function exit() {
         document.getElementById('delete').style.opacity=0;
     }

        setTimeout(exit,1500);
    xhr.send(data);
}


 function all() {
      
      var data = "no= &fname= &lname= &class= ";

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
         table.className = 'table-striped table-bordered table-hover table-condensed';

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
