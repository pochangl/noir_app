var xmlhttp = new XMLHttpRequest();
var url = "/static/main_menu.json";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
        myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<p><a href="' + arr[i].url + '">' + 
        arr[i].display + '</a></p>';
    }
    document.getElementById("content_main_menu").innerHTML = out;
}
