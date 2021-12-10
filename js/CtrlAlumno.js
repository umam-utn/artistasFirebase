import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  eliminaStorage,
  urlStorage,
  subeStorage
} from "../lib/storage.js";
import {
  muestraError, cod, getForánea
} from "../lib/util.js";
import {
  muestraAlumnos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  checksRoles,
  guardaUsuario
} from "./usuarios.js";

const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
const daoAlumno = getFirestore().
  collection("Alumno");
/** @type {HTMLFormElement} */
const forma = document["forma"];
const img = document.
  querySelector("img");
/** @type {HTMLUListElement} */
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Artista"])) {
    busca();
  }
}

async function busca() {
  try {
    const doc = await daoAlumno.
      doc(id).
      get();
    if (doc.exists) {
      const data = doc.data();
      forma.cue.value = id || "";
      forma.avatarusu.src =
        await urlStorage(id);
      forma.titulo.value = data.titulo || "";
      forma.autor.value = data.autor || "";
      forma.fecha.value = data.fecha || "";
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    }
  } catch (e) {
    muestraError(e);
    muestraAlumnos();
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
    const fecha = getString(formData, "fecha").trim();
    const obra =
      formData.get("obra");
    await subeStorage(id, obra);
    /**
     * @type {
        import("./tipos.js").
                Alumno} */
    const modelo = {
      titulo, 
      autor,
      fecha
    };
    await daoAlumno.
      doc(id).
      set(modelo);
    muestraAlumnos();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoAlumno.
        doc(id).
        delete();
      await eliminaStorage(id);
      muestraAlumnos();
    }
  } catch (e) {
    muestraError(e);
  }
}
