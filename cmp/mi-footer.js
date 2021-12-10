class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<footer><p>
        &copy; 2021
        Alvarado Mariscal Uriel Martín.
      </p></footer>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
