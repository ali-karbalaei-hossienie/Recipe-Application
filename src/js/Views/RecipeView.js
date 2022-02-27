import icons from "url:../../img/icons.svg";
import View from "./View.js";

class RecipeView extends View {
  _parentEL = document.querySelector(".recipe");
  _ErrorMessage = "دستور غذایی شما پیدا نشد. لطفا دوباره تلاش کنید";

  ControllHandler(handler) {
    window.addEventListener("hashchange", handler);
    window.addEventListener("load", handler);
  }

  handlerServings(handler) {
    this._parentEL.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--tiny");
      if (!btn) return;
      const newServings = +btn.dataset.servings;
      if (newServings > 0) handler(newServings);
    });
  }

  handlerbookmark(handler) {
    this._parentEL.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--round");
      if (!btn) return;

      handler();
    });
  }
  _generateMarkup() {
    return ` <figure class="recipe__fig">
    <img src=${this._data.imageUrl} alt="">
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>
  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button data-servings=${
          this._data.servings - 1
        } class="btn btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button data-servings=${
          this._data.servings + 1
        } class="btn btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
    <div class="recipe__user ${this._data.key ? "" : "hidden"}">
    <svg>
      <use href="${icons}#icon-user"></use>
    </svg>
  </div>
    <button class="btn btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : " "
    }"></use>
      </svg>
    </button>
  </div>


  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredients.map(this._generatIngerident).join("")}
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn btn--small recipe__btn"
      href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
  _generatIngerident(ing) {
    return ` <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ing.quantity ? ing.quantity : ""}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ing.unit}</span>
       ${ing.description}
      </div>
    </li>`;
  }
}

export default new RecipeView();
