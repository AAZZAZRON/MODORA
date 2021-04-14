var arr = [];

function getToDoList() {
  var s = getCookie("todolist");
  arr = s.split("\n");
}

document.getElementById("addtask").onclick = () => display();

function display(){
	var n = document.getElementById("userName").value;
  arr.push(n);
  var p = "";
  for(let i = 0; i < arr.length; i+=1) {
    p += arr[i] + "\n";
  }
  document.getElementById("printhere").innerHTML = p;
  addCookie("todolist", p);
}
