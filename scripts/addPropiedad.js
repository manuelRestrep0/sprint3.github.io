import getDataFetch from "../helpers/getData.js";
import postDataFetch from "../helpers/postData.js";

const form = document.querySelector(".form");

const urlPropiedades = "http://localhost:3000/propiedades";

let propiedades = [];

form.addEventListener("submit", async (event)=>{
  event.preventDefault();
  const valuesForm = Object.values(form);
  console.log(valuesForm);

  const nuevaPropiedad = {};
  valuesForm.forEach((valueInput)=>{
    if(valueInput.id) {
      nuevaPropiedad[valueInput.id] = valueInput.value;
    }
  });
  console.log(nuevaPropiedad);

  for(const key in nuevaPropiedad) {
    const propertyPropiedad = nuevaPropiedad[key];

    if(!propertyPropiedad) {
      alert("No ha diligenciado todo el formulario")
      return
    }
  }

  await postDataFetch(urlPropiedades, nuevaPropiedad);

  valuesForm.forEach(input => {
    if (input.id) { 
      input.value = "";
    }
  })
  alert("Video agregado correctamente");
});