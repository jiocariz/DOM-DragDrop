//Añadir nueva tarjeta
let addNode = document.querySelector("a");
addNode.addEventListener("click", e=>{
    let taskText = e.target.previousSibling.value;
    addTask(taskText, document.querySelector(".todo"));
    e.target.previousSibling.value = "";
});

function addTask( texto, dv ){
    
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    let taskP = document.createElement("p");
    let taskTxt = document.createTextNode(texto);
    taskP.append(taskTxt);
    let taskCloseP = document.createElement("p");
    taskCloseP.classList.add("close");
    let taskCloseTxt = "X";
    taskCloseP.append(taskCloseTxt);
    listenerQuitar(taskCloseP);

    taskDiv.append(taskP);
    taskDiv.append(taskCloseP);
    taskDiv.draggable=true;
    taskDiv.addEventListener("dragstart", e=>{
        //Puedo meter al evento información adicional para cuando lo recepcione:
        e.dataTransfer.setData("name",e.target.children[0].textContent);
        e.target.setAttribute("id", "curDragging");
    });

    dv.append(taskDiv);
}

//Borrar tarjetas
let xQuitar = document.querySelectorAll(".close");
xQuitar.forEach(elem=>{
    listenerQuitar(elem);
});

function listenerQuitar(elem){
    elem.addEventListener("click", e=>{
        e.target.parentNode.remove();
    });
}

//Hago dragables todas las tarjetas
let tareas = document.querySelectorAll(".task");
tareas.forEach(tarea=>{
    tarea.draggable=true;
    tarea.addEventListener("dragstart", e=>{
        //Puedo meter al evento información adicional para cuando lo recepcione:
        e.dataTransfer.setData("name",e.target.children[0].textContent);
        e.target.setAttribute("id", "curDragging");
    });
});

//Preparo el drop
let listasTareas = document.querySelectorAll(".tasks");
listasTareas.forEach(curDivLista=>{
    curDivLista.addEventListener("dragover",function(event){
        //Por defecto no deja soltar; aquí digo que sí deje cuando pase por divs .tasks
        event.preventDefault();
    });
    curDivLista.addEventListener("drop", function(event){
        //Por defecto no deja soltar; aquí digo que sí deje cuando pase por divs .tasks
        event.preventDefault();
        let name = event.dataTransfer.getData("name");
        addTask(name,event.target.closest(".tasks"));
        document.getElementById("curDragging").remove();
    });
});

