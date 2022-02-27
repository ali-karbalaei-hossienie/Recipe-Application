import TogglerNav from "./Views/TogglerNav.js";
import * as model from "./module.js";
import RecipeView from "./Views/RecipeView.js";
import SearchView from "./Views/searchView.js";
import SearchResult from "./Views/SeachResult.js";
import paginationView from "./Views/paginationView.js";
import bookmarkView from "./Views/bookmarkView.js";
import addRecipe from "./Views/addRecipe.js";

const ControlShowRecipe = async function () {
  try {
    ////get hash id
    const id = window.location.hash.slice(1);
    if (!id) return;

    RecipeView.renderspiner();

    /// select background on the searchResult
    SearchResult.update(model.getSearchPage());

    /// get data from module
    await model.loadRecipe(id);
    //// transform data to RecipeView
    RecipeView.render(model.Data.recipe);

    /// Update Servings
    RecipeView.handlerServings(controlServings);

    /// select background on the bookmarkview
    bookmarkView.update(model.Data.bookmarks);
  } catch (err) {
    RecipeView.renderError();
    console.error(err);
  }
};

const ControlSearchResult = async function () {
  try {
    ////get data from search field
    const value = SearchView.getquery();
    if (!value) return;

    //// show result in tablet and mobile
    SearchResult.showResutlMobile();
    ////clear text from search field
    SearchView.clearSearch();

    //// spinner
    SearchResult.renderspiner();

    ////get data API from searchResult
    await model.loadSearchResult(value);

    ///// render data to searchResult
    SearchResult.render(model.getSearchPage());

    model.Data.search.page = 1;

    paginationView.render(model.Data.search);
  } catch (err) {
    console.log(err);
  }
};

const controlpagination = function (goTopage) {
  SearchResult.render(model.getSearchPage(goTopage));
  paginationView.render(model.Data.search);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);
  RecipeView.update(model.Data.recipe);
};

const controlbookmark = function () {
  if (!model.Data.recipe.bookmarked) model.addbookmark(model.Data.recipe);
  else model.Deletbookmark(model.Data.recipe.id);
  RecipeView.update(model.Data.recipe);
  bookmarkView.render(model.Data.bookmarks);
};

const bookmark = function () {
  bookmarkView.render(model.Data.bookmarks);
};

const controlUpload = async function (newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);

    //// پیام موفقیت آمیز برای فرستادن دیتا
    addRecipe.renderMeaage();

    ///بستن فرم
    setTimeout(function () {
      addRecipe.toggleWindow();
    }, 2500);
    /// اضافه کردن دیتا
    RecipeView.render(model.Data.recipe);

    bookmarkView.render(model.Data.bookmarks);

    window.history.pushState(null, "", `#${model.Data.recipe.id}`);
    // addRecipe.toggleWindow();

    ////
  } catch (err) {
    addRecipe.renderError();
  }
};

const init = function () {
  RecipeView.ControllHandler(ControlShowRecipe);
  bookmarkView.handlerbookamrk(bookmark);
  SearchView.controlSearch(ControlSearchResult);
  paginationView.handlerpagination(controlpagination);
  RecipeView.handlerbookmark(controlbookmark);
  addRecipe.handlerUpload(controlUpload);
  TogglerNav.handlerToggler();
};

init();
