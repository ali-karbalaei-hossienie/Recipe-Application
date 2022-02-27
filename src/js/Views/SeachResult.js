import View from "./View.js";
import icons from "url:../../img/icons.svg";
import previewView from "./previewView.js";

class SearchResult extends View {
  _parentEL = document.querySelector(".result");
  _ErrorMessage = "دستور غذایی شما پیدا نشد. لطفا دوباره تلاش کنید";

  showResutlMobile() {
    document.querySelector(".searchResult").style.display = "block";
  }

  _generateMarkup() {
    return this._data
      .map((result) => previewView.render(result, false))
      .join("");
  }
}

export default new SearchResult();
