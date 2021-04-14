var arr = [];

var btn = document.getElementById("ToDoListButton");
btn.addEventListener("click", function() {
	setToDoList();
})

function setToDoList() {
  document.getElementById("MainMenu").hidden = true;
  document.getElementById("SetupTimer").hidden = true;
  document.getElementById("TimerOn").hidden = true;
  document.getElementById("ToDoList").hidden = false;
  for(let i = 0; i < arr.length; i += 1) {
    
  }
}

var btn2 = document.getElementById("todobutton");
btn2.addEventListener("click", function() {
	arr.push(document.getElementById("name").value);
  deleteCookie("listtodo");
  addCookie("listtodo", arr);
  setToDoList();
}) 
/*
max
do something like this:

chooseBlocked = document.createElement("div");
chooseBlocked.id = "ChooseBlocked";
document.getElementById("choose-blocked-form").appendChild(chooseBlocked);
const things = decodeURIComponent(document.cookie).split("; ");
for (let i = 0; i < things.length; i += 1) {
    const values = things[i].split("===");
    if (values[1] == "banned") {
        addToBlockedList(values[0]); // add website to blocked list
    }
}
    */