import View from "./View.js";
import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js";

class bookmarkView extends View {
  _parentEL = document.querySelector(".bookmarks__list");
  _ErrorMessage = "No bookmarks yet. Find a nice recipe and bookmark it ;)";
  handlerbookamrk(handler) {
    window.addEventListener("load", handler);
  }
  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new bookmarkView();
