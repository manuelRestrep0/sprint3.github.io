import getDataFetch from "../helpers/getData.js";
import putDataFetch from "../helpers/putData.js";

const urlPropiedades = "http://localhost:3000/propiedades";
const form = document.querySelector(".form");

const valuesForm = Object.values(form);

const editFormStr = sessionStorage.getItem("editPropiedad")
  ? JSON.parse(sessionStorage.getItem("editPropiedad"))
  : "";

const editForm = editFormStr ? parseInt(editFormStr) : null;
const title = document.querySelector(".title");
const url = editForm ? `${urlPropiedades}/${editForm}` : urlPropiedades;

document.addEventListener("DOMContentLoaded", async () => {
  let editPropiedad = {};
  
  console.log(editForm);

  try {
    if (editForm) {
      editPropiedad = await getDataFetch(url);

      title.innerText = 
        `Actualiza los datos de ${editPropiedad.nombre}`;

      valuesForm.forEach((valueInput) => {
        if (valueInput.id) {
          valueInput.value = editPropiedad[valueInput.id];
        }
      });
    }
    
  } catch (error) {
    console.log(error);
    alert(error);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const infoPropiedad = {};
  const valuesForm = Object.values(form);

  valuesForm.forEach((valueInput) => {
    if (valueInput.id) {
      infoPropiedad[valueInput.id] = valueInput.value;
    }
  });

  await putDataFetch(url, infoPropiedad);
})