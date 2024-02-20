import { container, resultado } from "./selectores.js";

export function buscarClima(e) {
   e.preventDefault();

   const ciudad = document.querySelector("#ciudad").value;
   const pais = document.querySelector("#pais").value;

   validarFormulario(ciudad, pais);
   consultarAPI(ciudad, pais);
}

function validarFormulario(ciudad, pais) {
   if (ciudad === "" || pais === "") {
      mostrarError("Todos los campos son obligatorios");
      return;
   }
}

function mostrarError(mensaje) {
   // Crear Alerta
   const alerta = document.createElement("div");
   alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
   );
   alerta.innerHTML = `
    <strong class="font-bold">ERROR!</strong> <span class="block">${mensaje}</span>
    `;
   container.appendChild(alerta);

   setTimeout(() => {
      alerta.remove();
   }, 3000);
}

function consultarAPI(ciudad, pais) {
   const key = "4d229b86f86b229aaabd4142aca49944";

   const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;
   limpiarHTML();
   Spinner();

   setTimeout(() => {
      fetch(url)
         .then((respuesta) => respuesta.json())
         .then((datos) => {
            if (datos.cod === "404") {
               mostrarError("Ciudad no válida");
               return;
            }
            limpiarHTML();
            mostrarClima(datos);
         });
   }, 1000);
}

function kelvinACentigrados(grados) {
   return parseInt(grados - 273.15);
}

function mostrarClima(datos) {
   //console.log(datos);
   const {
      name,
      main: { temp, temp_max, temp_min },
   } = datos;

   const centigrados = kelvinACentigrados(temp);
   const max = kelvinACentigrados(temp_max);
   const min = kelvinACentigrados(temp_min);

   const nombreCiudad = document.createElement("p");
   nombreCiudad.textContent = `Clima en ${name}`;
   nombreCiudad.classList.add("font-bold", "text-2xl");

   const actual = document.createElement("p");
   actual.innerHTML = `${centigrados} &#8451;`;
   actual.classList.add("font-bold", "text-6xl");

   const tempMaxima = document.createElement("p");
   tempMaxima.innerHTML = `Max: ${max} &#8451`;
   tempMaxima.classList.add("text-xl");

   const tempMinima = document.createElement("p");
   tempMinima.innerHTML = `Min: ${min} &#8451`;
   tempMinima.classList.add("text-xl");

   const resultadoDIV = document.createElement("div");
   resultadoDIV.classList.add("text-center", "text-white");
   resultadoDIV.appendChild(nombreCiudad);
   resultadoDIV.appendChild(actual);
   resultadoDIV.appendChild(tempMaxima);
   resultadoDIV.appendChild(tempMinima);

   resultado.appendChild(resultadoDIV);
   console.log();
}

function limpiarHTML() {
   while (resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
   }
}

function Spinner() {
   const divSpinner = document.createElement("div");
   divSpinner.classList.add("sk-chase");
   divSpinner.innerHTML = `
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     `;

   resultado.appendChild(divSpinner);
}
