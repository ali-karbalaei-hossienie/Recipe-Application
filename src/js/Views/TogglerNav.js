class TogglerNav {
  _toggler = document.querySelector(".nav__toggler");
  _nav = document.querySelector(".nav");

  toggleWindow() {
    this._nav.classList.toggle("expand");
  }

  handlerToggler() {
    this._toggler.addEventListener("click", this.toggleWindow.bind(this));
  }
}

export default new TogglerNav();
