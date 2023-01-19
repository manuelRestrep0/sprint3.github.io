import deleteDataFetch from "../helpers/deleteData.js";
import getDataFetch from "../helpers/getData.js";
import postDataFetch from "../helpers/postData.js";
import { printCardsPropiedades } from "../modules/printPropiedades.js";


const urlPropiedades = "http://localhost:3000/propiedades";
const urlFavoritos = "http://localhost:3000/favoritos";

let propiedades = [];

const contenedorPropiedades = document.getElementById("contenedorCards");
const search = document.getElementById("search");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    propiedades = await getDataFetch(urlPropiedades);
    console.log(propiedades);
    
    printCardsPropiedades(contenedorPropiedades,propiedades);
  } catch (error) {
    alert(error);
  }
})

document.addEventListener("click", async ({ target })=>{
  //abrir detalles
  if(target.classList.contains("card__img")){
    sessionStorage.setItem("propiedadDetails", JSON.stringify(target.id));
    location.href = "./pages/propiedadDetails.html";
  }

  //eliminar card
  if (target.classList.contains("card__delete")) {
    Swal.fire({
      title: "¿Está usted seguro de eliminar?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const idPropiedadDelete = parseInt(target.name);
        console.log(idPropiedadDelete);
        const urlDelete = `${urlPropiedades}/${idPropiedadDelete}`;

        try {
          await deleteDataFetch(urlDelete);
          propiedades = await getDataFetch(urlPropiedades);
          printCardsPropiedades(contenedorPropiedades, propiedades);
        } catch (error) {
          console.log("No se pudo eliminar hay un error" + error);
        }
      }
    });
  }
  // agregar a favoritos
  if (target.classList.contains("card__favorite")) {
    const idFavorito = target.name;
    const urlPropiedadFavorito = `${urlFavoritos}?id=${idFavorito}`;

    const favorito = await getDataFetch(urlPropiedadFavorito);
    //Obtenemos el objeto
    const favoritePropiedad = await getDataFetch(
      `${urlPropiedades}/${idFavorito}`
    );
    if (favorito.length === 0 && Object.entries(favoritePropiedad).length) {
      await postDataFetch(urlFavoritos, favoritePropiedad);
      const data = await getDataFetch(urlFavoritos);
      console.log(data);
    }
  }
});

search.addEventListener("search", async () => {
  const searchTerm = search.value;
  try {
    if (searchTerm) {
      const datosPropiedades = await getDataFetch(urlPropiedades);
      const resultadoBusqueda = datosPropiedades.filter((prop) =>
        prop.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
      );
      printCardsPropiedades(contenedorPropiedades, resultadoBusqueda);
    } else {
      const datosPropiedades = await getDataFetch(urlPropiedades);
      printCardsPropiedades(contenedorPropiedades, datosPropiedades);
    }
  } catch (error) {
    console.log(error);
  }
});

const btnSearch = document.getElementById("submit")
const slcTipo = document.getElementById("tipo");
const slcCategoria = document.getElementById("categoria");

btnSearch.addEventListener("click", async (event) => {
  event.preventDefault();

  try {
    if(slcTipo.value && slcCategoria.value){
      const datosPropiedades = await getDataFetch(urlPropiedades);
      const resultadosFiltro = datosPropiedades.filter((prop) => prop.tipo === slcTipo.value);
      const resultadosFiltro2 = resultadosFiltro.filter((prop) => prop.categoria === slcCategoria.value);
      printCardsPropiedades(contenedorPropiedades, resultadosFiltro2);
    }
    else {
      const datosPropiedades = await getDataFetch(urlPropiedades);
      printCardsPropiedades(contenedorPropiedades, datosPropiedades);
    }
  } catch (error) {
    console.log(error);
  }
});

const btnFavoritos = document.getElementById("favorites");
const btnProperties = document.getElementById("propiedades");

btnFavoritos.addEventListener("click", async () =>{
  const propiedadesFav = await getDataFetch(urlFavoritos);
  printCardsPropiedades(contenedorPropiedades, propiedadesFav);
});

btnProperties.addEventListener("click", async () => {
  propiedades = await getDataFetch(urlPropiedades);
  printCardsPropiedades(contenedorPropiedades,propiedades);
});