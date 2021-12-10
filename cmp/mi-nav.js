// @ts-nocheck
import {
  cargaRoles
} from "../js/seguridad.js";
import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

class MiNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<nav class="navbar navbar-expand-lg navbar navbar navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="galeria.html">
            <img src="favicon.ico" alt="" width="30" height="24" class="d-inline-block align-text-top">
            Aplicación WEB UMAM
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" href="galeria.html"><i class="bi bi-images"></i> Galería</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="acerca-de.html"><i class="bi bi-info-circle"></i> Acerca de</a>
              </li>
              
              
              <li class="nav-item">
                <a class="nav-link active" href="index.html"><i class="bi bi-person-bounding-box"></i> Sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>`;
    this.ul =
      this.querySelector("ul");
    getAuth().onAuthStateChanged(
      usuario => this.
        cambiaUsuario(usuario),
      muestraError);
  }

  /**
   * @param {import(
      "../lib/tiposFire.js").User}
      usu */
      async cambiaUsuario(usu) {
        if (usu && usu.email) {
          let html = "";
          const roles =
            await cargaRoles(
              usu.email);
          /* Enlaces para solo
           * para clientes. */
          if (roles.has("Artista")) {
            html += /* html */
              `<li class="nav-item">
                  <a class="nav-link active" href="alumnos.html"><i class="bi bi-droplet-half"></i> Obras</a>
              </li>`;
          }
          /* Enlaces para solo
           * administradores.
           */
          if (roles.has(
            "Administrador")) {
            html += /* html */
              `<li class="nav-item">
                <a class="nav-link active" href="usuarios.html"><i class="bi bi-brush"></i> Artistas</a>
              </li>`;
          }
          this.ul.innerHTML += html;
        }
      }
    }


customElements.define(
  "mi-nav", MiNav);
