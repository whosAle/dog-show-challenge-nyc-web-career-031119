const BASE_URL = "http://localhost:3000";
const DOGS_URL = `${BASE_URL}/dogs`;

const editForm = document.querySelector("#dog-form");

let dogTable = document.querySelector("#table-body");


const fetchData = function () {
  console.log("inside fetch");
  fetch(DOGS_URL)
  .then(response => response.json())
  .then(json => populateTable(json))
}

function populateTable(json){
  dogTable = document.querySelector("#table-body");
  dogTable.innerHTML = '';
  for (let dog of json) {
    dogTable.innerHTML += `
    <tr><td class="dog-name">${dog.name}</td> <td class="dog-breed">${dog.breed}</td> <td class="dog-sex">${dog.sex}</td> <td><button class="edit-dog" data-dog-id="${dog.id}">Edit</button></td></tr>
    `;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const editForm = document.querySelector("#dog-form");

  let dogTable = document.querySelector("#table-body");
  dogTable = document.querySelector("#table-body");
  //loads the initial dogs data from db
  fetchData();

  dogTable.addEventListener('click', (event) => {
    currentBtn = event.target;
    currentTr = event.target.parentNode.parentNode;
    console.log(editForm);
    if (currentBtn.className === "edit-dog") {
      //set the buttons dog-id to current dog
      editForm.dataset.dogid = currentBtn.dataset.dogId;

      currentBtn.parentNode.parentNode.childNodes.forEach( (td) => {
        console.log(td);
        if (td.className === "dog-name") {
          editForm.name.value = td.innerText;
        } else if (td.className === "dog-breed") {
          editForm.breed.value = td.innerText;
        } else if (td.className === "dog-sex") {
          editForm.sex.value = td.innerText;
        }
      })
    }
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    fetch(`${DOGS_URL}/${editForm.dataset.dogid}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json",
        Accept : "application/json"
      },
      body: JSON.stringify({
        name: editForm.name.value,
        breed: editForm.breed.value,
        sex: editForm.sex.value
      })
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      fetchData();
    })
    .catch(res => {
      console.error(res.message);
    })
  editForm.dataset.dogid = "";
  editForm.reset();
  });
});
