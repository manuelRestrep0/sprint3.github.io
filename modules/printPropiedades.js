export const printCardsPropiedades = (contenedor, arrayPropiedades) => {
    contenedor.innerHTML = "";

    arrayPropiedades.forEach(propiedad => {
        const article = document.createElement("article");
        article.classList.add("main__card");
        article.innerHTML = `
        <figure class="card__image">
                    <img id=${propiedad.id} src=${propiedad.miniatura} alt="${propiedad.nombre}" class="card__img">
                </figure>
                <button class="card__delete" name='${propiedad.id}'>❌</button>
                <button class="card__favorite" name='${propiedad.id}'>❤</button>
                <h4 class="card__name">${propiedad.nombre}</h4>
                <h4>${propiedad.ubicacion}</h4>
                <h5>🚗:${propiedad.parqueadero}</h6>
                <h5>🛀:${propiedad.banos}</h6>
                <h5>🛏️:${propiedad.habitaciones}</h6>
        `;

        contenedor.appendChild(article);
    });
};