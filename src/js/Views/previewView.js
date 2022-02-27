import View from "./View.js";
import icons from "url:../../img/icons.svg";

class previewView extends View {
  // _parentEL = document.querySelector(".bookmarks__list");

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return ` <li class="preview  ${
      this._data.id == id ? "preview_link--active" : ""
    }">
    <a href="#${this._data.id}" class="preview_link">
      <div class="preview__fig">
      <img src=${this._data.imageUrl} alt="" >
      </div>
      <div class="preview_data">
        <div class="preview_information">
          <h4 class="preview_title">${this._data.title} </h4>
          <p class="preview_publisher">${this._data.publisher}</p>

        </div>
        <div class="preview_user ${this._data.key ? "" : "hidden"}">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      </div>
    </a>
  </li> `;
  }
}

export default new previewView();
