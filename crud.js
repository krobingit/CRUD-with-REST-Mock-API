document.body.innerHTML = `

<div class="title">
<h1>Create your profile</h1>
</div>
     <div class="user-add-container">
            <div class="inputContainer">
            <i class="fas fa-keyboard"></i>
                <input class="user-add-name" Placeholder="Enter your name">
             </div>
             <div class="inputContainer">
             <i class="fas fa-camera"></i>
             <input class="user-add-pic" Placeholder="Enter your pic url">
             </div >
             <div>
             <button class="btn" onclick="addUser()"><i class="fas fa-user-circle"></i> CREATE</button>
             </div>
        </div>
      <div class="container">
        </div> `
const userList = document.querySelector(".container");

async function getData() {

    const data = await fetch("https://6166c4da13aa1d00170a66f9.mockapi.io/users");
    const userdata = await data.json();
    userList.innerHTML = "";
    userdata.forEach((user) => {
        document.querySelector(".container").innerHTML +=
            `<div class="user-container">
            <img src="${user.avatar}" class="user-avatar">
                  <h1>${user.name}</h1>
                    <p class="id">ID:${user.id}</p>
                    <div>
                    <button class="btn" onclick="toggleEditUser(${user.id})"><i class="fas fa-user-edit"></i>Edit</button>
                    </div>
                    <div>
                    <button class="btn" onclick="deleteUser(${user.id})"><i class="fas fa-user-minus"></i>Delete</button>
                    </div>
             </div>
           
            
            <div class="edit-${user.id}" style="display:none">
            
                  <input value=${user.name}  class="edit-${user.id}-name" Placeholder="Update new user-name">
                  <input value=${user.avatar} class="edit-${user.id}-pic" Placeholder="Update new user-pic-url">
                  <button class="btn" onclick="saveUser(${user.id})"><i class="fas fa-save"></i>  SAVE EDIT</button>
            </div>`



    })
}
getData();

async function deleteUser(id) {
    if (confirm("Do you want to delete this Profile")) {
        const data = await fetch("https://6166c4da13aa1d00170a66f9.mockapi.io/users/" + id, { method: "DELETE" })
        getData();
    }
    else return false;

}

async function addUser() {
    if (confirm("Do you want to create this Profile")) {
        const username = document.querySelector(".user-add-name").value;
        const picurl = document.querySelector(".user-add-pic").value;
        const data = await fetch("https://6166c4da13aa1d00170a66f9.mockapi.io/users/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: username, avatar: picurl })

            })
        getData();
        document.querySelector(".user-add-name").value = "";
        document.querySelector(".user-add-pic").value = ""
    }
    else return false;
}


function toggleEditUser(Id) {

    const editForm = document.querySelector(`.edit-${Id}`);
    editForm.style.display = editForm.style.display === "flex" ? "none" : "flex";
    editForm.classList.add("editElement");
}

async function saveUser(id) {
    if (confirm("Do you want to save this edit to your Profile?")) {
        const editedname = document.querySelector(`.edit-${id}-name`).value;
        const editedpic = document.querySelector(`.edit-${id}-pic`).value;
        const data = await fetch("https://6166c4da13aa1d00170a66f9.mockapi.io/users/",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: editedname, avatar: editedpic })

            })
        deleteUser(id);
    }
    else
        return false
}
