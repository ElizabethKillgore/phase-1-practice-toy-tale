let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderOneToy(toy) {
  let card = document.createElement('li')
    
  card.innerHTML = `
  <div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes}</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>
  </div>
 `
 document.querySelector("#toy-collection").appendChild(card)
 document.getElementById(`${toy.id}`).addEventListener('click', (e) => {
    toy.likes+= 1
    e.target.previousElementSibling.textContent = toy.likes
    likeToy(toy, toy.likes)
  
  })
  
  
}
//GET fetch request for all toys
function getAllToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toyData => toyData.forEach(toy => renderOneToy(toy))) 
}

getAllToys()


function addNewToy(e) {
  e.preventDefault() 
  
  let toyObject = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }
  //renderOneToy(toy)
  //addNewToy(toy)

  fetch('http://localhost:3000/toys', {
    method: "POST",   
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }, 
    body:JSON.stringify(toyObject) 
  })
  .then(res => res.json())
    .then(toy => renderOneToy(toy))
}
  //add toy card to DOM
document.querySelector(".add-toy-form").addEventListener('submit', addNewToy)

//document.addEventListener("click", likeToy())
function likeToy(toy, likes) {
  //console.log(toy)
  fetch(`http://localhost:3000/toys/${toy.id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },

  body:JSON.stringify({
    "likes": likes 
  })
})
  .then(res => res.json())
   .then(toy => console.log(toy))
   //this is where I want to add += somehow to increase the like numbers and define)
  
}
