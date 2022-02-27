import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data, render = true) {
    this._data = data;
    if (!data || this._data.length === 0) return this.renderError();
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._parentEL.innerHTML = "";
    this._parentEL.insertAdjacentHTML("afterbegin", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const curElement = Array.from(this._parentEL.querySelectorAll("*"));

    newElements.forEach((newEL, i) => {
      const curEL = curElement[i];

      if (
        !newEL.isEqualNode(curEL) &&
        newEL.firstChild?.nodeValue.trim() !== ""
      ) {
        curEL.textContent = newEL.textContent;
      }
      if (!newEL.isEqualNode(curEL)) {
        Array.from(newEL.attributes).forEach((attr) => {
          curEL.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderError(message = this._ErrorMessage) {
    const markup = ` <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div> `;
    this._parentEL.innerHTML = "";
    this._parentEL.insertAdjacentHTML("afterbegin", markup);
  }

  renderMeaage(message = this._Message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
    ${message}
    </p>
  </div> `;
    this._parentEL.innerHTML = "";
    this._parentEL.insertAdjacentHTML("afterbegin", markup);
  }

  renderspiner() {
    const markup = `<div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>`;
    this._parentEL.innerHTML = "";
    this._parentEL.insertAdjacentHTML("afterbegin", markup);
  }
}
