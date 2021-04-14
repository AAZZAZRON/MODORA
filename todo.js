var arr = [];

function getToDoList() {
  var s = getCookie("todolist");
  arr = s.split("<br>");
}

document.getElementById("addtask").onclick = () => display();

function display(){
	arr.push(document.getElementById("userName").value);
  var p = arr.toString().replaceAll(",", "<br>");
  document.getElementById("printhere").innerHTML = p;
  addCookie("todolist", p);
}
