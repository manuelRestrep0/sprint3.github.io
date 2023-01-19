import getDataFetch from "../helpers/getData.js";

const idPropiedadStr = sessionStorage.getItem("propiedadDetails")? JSON.parse(sessionStorage.getItem("propiedadDetails")): null;

const idPropiedad = idPropiedadStr ? parseInt(idPropiedadStr) : null;

console.log(idPropiedad);

const urlPropiedad = `http://localhost:3000/propiedades/${idPropiedad}`;
const title = document.querySelector(".title");
const container = document.querySelector(".main");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const propiedad = await getDataFetch(urlPropiedad);

    title.innetTxt = `Pagina de detalles de la propiedad ${propiedad.nombre}`;
    container.innerHTML = `<figure class="main__figure">
    <img src="${propiedad.miniatura}" alt="${propiedad.nombre}">
    <img src="${propiedad.imagenes[0]}" alt="${propiedad.nombre}">
    <img src="${propiedad.imagenes[1]}" alt="${propiedad.nombre}">
    <img src="${propiedad.imagenes[2]}" alt="${propiedad.nombre}">
</figure>
<ul>              
    <li>Nombre:  ${propiedad.nombre}</li>
    <li>Ubicacion:  ${propiedad.ubicacion} </li>
    <li>Area en metros cuadrados: ${propiedad.area}</li>
    <li>Numero de habitaciones: ${propiedad.habitaciones}</li>
    <li>Numero de baños: ${propiedad.banos}</li>
    <li>Tipo de inmueble: ${propiedad.tipo}</li>
    <li>Estado: en ${propiedad.categoria}</li>
    <li>Precio: ${propiedad.precio}</li>
    <li>Parqueadero: ${propiedad.parqueadero}</li>
    <li>Contacto: ${propiedad.contacto}</li>
</ul>`;
  } catch (error) {
    alert(error);
  }
});
