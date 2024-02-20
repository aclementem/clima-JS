import { formulario } from "./selectores.js";
import { buscarClima } from "./funciones.js";

window.addEventListener("load", () => {
   formulario.addEventListener("submit", buscarClima);
});
