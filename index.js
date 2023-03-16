const toDoInput = document.querySelector('#new-task');
const toDoAddBtn = document.querySelector('.add-button');
const toDoList = document.querySelector('#incomplete-tasks');
const deleteForever = document.querySelector("#delete_forever") 
// ----------------------------------------------------------------------------

 // toDo Container
//  let toDoListContainer = [];
//  let id = 0;

let toDoListContainer, id;
//--------------------------------------------------------------------------------
//To retrieve data from the local storage
let toDoData = localStorage.getItem("to-do-item");

if(toDoData){
    toDoListContainer = JSON.parse(toDoData);
    id = toDoListContainer.length;
    loadToDoContainer(toDoListContainer);
}else{
    toDoListContainer = [];
    id = 0;
}

function loadToDoContainer(array){
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.edit, item.trash)
    });
}

//Clear/delete the local staorage forever
deleteForever.addEventListener('click', clearStorage);

function clearStorage(){
    localStorage.clear();
    location.reload();
}
//------------------------------------------------------------------------------------------------------
// Add ToDo Function
function addToDo(toDo, id, edit, trash){
    if(trash) return;
    const toDoEdit = edit ? toDoInput : " ";
    //creating dynamic Elements
    const item = `
                <li class="item">
                    <p class="text">${toDo}</p>
                    <button class" ${toDoEdit} edit" status="edit" id="${id}">Edit</button> 
                    <button class="delete" status="delete" id="${id}">Delete</button>
                </li>
                `;
    const toDoItemPosition = "afterbegin";
    toDoList.insertAdjacentHTML(toDoItemPosition, item);
}


//-----------------------------------------------------------------------------------
// Adding  a to-do to the list when the Enter key pressed or the add Btn is clicked 
document.addEventListener("keyup", addItem);

toDoAddBtn.addEventListener("click", addItem);

   function addItem(event) {
    if (event.keyCode === 13 || event.target.classList.value === "add-button"){
         let toDo = toDoInput.value;
        //checking whether the input field is not empty
        if (toDo){
            addToDo(toDo, id, false, false);
            toDoListContainer.push({
                name: toDo,
                id: id,
                edit: false,
                trash: false,
            }),
            //updating the local storage
            localStorage.setItem("to-do-item", JSON.stringify(toDoListContainer))
            id++
        }
        toDoInput.value = ""
    }
   }
    

// Targeting the dynamically created items
toDoList.addEventListener("click", function(evt){
    // if(evt.path[0].localName === "p" || 
    // evt.path[0].localName === "li" || 
    // evt.path[0].localName === "ul")
    // return;
    
    const toDoItem = evt.target;
    const toDoStatus = toDoItem.attributes.status.value;
    
    if(toDoStatus === 'edit'){
        editItem(toDoItem)
    }else if(toDoStatus === 'delete'){
        deleteItem(toDoItem)
    }

    localStorage.setItem("to-do-item", JSON.stringify(toDoListContainer))
});


     function editItem (toDoItem) {
        return;
     }
    
    function deleteItem (toDoItem) {
        toDoItem.parentNode.parentNode.removeChild(toDoItem.parentNode);
        toDoListContainer[toDoItem.id].trash = true;
     }
    
    
    