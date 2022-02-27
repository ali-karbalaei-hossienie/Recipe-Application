class SearchView {
  _parentEL = document.querySelector(".search");
  //   _searchField = document.querySelector(".search_field");
  getquery() {
    return this._parentEL.querySelector(".search_field").value;
  }
  clearSearch() {
    this._parentEL.querySelector(".search_field").value = "";
  }
  controlSearch(handler) {
    this._parentEL.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
