import {
  getAuth,
  getFirestore,
  getStorage
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraAlumnos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";
const storage = getStorage();
const daoAlumno =
  getFirestore().
    collection("Alumno");
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Artista"])) {
    forma.addEventListener(
      "submit", guarda);
    forma.usu.value =
      usuario.email || "";
  }
}
/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);  
    const titulo = getString(formData, "titulo").trim();
    const autor = getString(formData, "autor").trim();
    const usu = getString(formData, "usu").trim();
    const obra =
      formData.get("obra");
    const fecha = getString(formData, "fecha").trim();
    const f = new Date();
    const nombre = f.toISOString() + usu;
    if (obra instanceof File &&
      obra.size > 0) {
      await storage.
        ref(nombre).
        put(obra);
    }
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
    await daoAlumno.
      doc(nombre).
      set({
        titulo,
        autor,
        usu,
        fecha 
      });
    muestraAlumnos();
  } catch (e) {
    muestraError(e);
  }
}
