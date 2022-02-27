import View from "./View.js";

class addRecipe extends View {
  _parentEL = document.querySelector(".upload");
  _overlay = document.querySelector(".overlay");
  _addRecipe = document.querySelector(".add_recipe");
  _closeModal = document.querySelector(".btn--close-modal");
  _btnAddRecipe = document.querySelector(".nav__btn--add-recipe");
  _ErrorMessage = "درخواست شما ناقص است.لطفا مانند نمونه فرم رو پر نمایید";
  _Message = "درخواست شما با موفقیت ثبت شد.";

  constructor() {
    super();
    this._handlerAddRecipe();
    this._handlerCloseRecipe();
  }
  toggleWindow() {
    this._overlay.classList.toggle("hidden");
    this._addRecipe.classList.toggle("hidden");
  }
  _handlerAddRecipe() {
    this._btnAddRecipe.addEventListener("click", this.toggleWindow.bind(this));
  }
  _handlerCloseRecipe() {
    this._closeModal.addEventListener("click", this.toggleWindow.bind(this));
    this._overlay.addEventListener("click", this.toggleWindow.bind(this));
  }
  handlerUpload(handler) {
    this._parentEL.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new addRecipe();
