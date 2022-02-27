import { API_URL, KEY } from "./config.js";
import { getJSON, sendJSON } from "./helper.js";

export const Data = {
  recipe: {},
  search: {
    result: [],
    page: 1,
  },
  bookmarks: [],
};

const creatRecip = function (data) {
  const { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    publisher: recipe.publisher,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    imageUrl: recipe.image_url,
    bookmarked: false,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  ////گرفتن  دیتا از سرور
  try {
    const data = await getJSON(`${API_URL}/${id}?key=${KEY}`);
    Data.recipe = creatRecip(data);
    if (Data.bookmarks.some((el) => el.id == id)) Data.recipe.bookmarked = true;
    else Data.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResult = async function (search) {
  try {
    const data = await getJSON(`${API_URL}?search=${search}&key=${KEY}`);
    let searchRecipes = data.data.recipes;
    Data.search.result = searchRecipes.map((rec) => {
      return {
        publisher: rec.publisher,
        imageUrl: rec.image_url,
        title: rec.title,
        id: rec.id,
        ...(rec.key && { key: rec.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchPage = function (page = Data.search.page) {
  Data.search.page = page;
  const start = (page - 1) * 10;
  const end = page * 10;
  return Data.search.result.slice(start, end);
};

export const updateServings = function (newServing) {
  ///6*2/4
  Data.recipe.ingredients.map((ing) => {
    ing.quantity = (newServing * ing.quantity) / Data.recipe.servings;
  });

  Data.recipe.servings = newServing;
};

export const addbookmark = function (recipe) {
  Data.bookmarks.push(recipe);
  Data.recipe.bookmarked = true;
  StorageBookmark();
};

export const Deletbookmark = function (id) {
  const index = Data.bookmarks.findIndex((el) => el.id == id);
  Data.bookmarks.splice(index, 1);

  Data.recipe.bookmarked = false;
  StorageBookmark();
};

const StorageBookmark = function () {
  localStorage.setItem("bookmark", JSON.stringify(Data.bookmarks));
};

const getBookmark = function () {
  const storage = localStorage.getItem("bookmark");
  if (storage) Data.bookmarks = JSON.parse(storage);
};

getBookmark();

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((el) => el[0].startsWith("ingredient") && el[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",");
        if (ingArr.length !== 3)
          throw new Error(
            "درخواست شما ناقص است.لطفا مانند نمونه فرم رو پر نمایید "
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const Recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      ingredients,
    };
    const data = await sendJSON(`${API_URL}?key=${KEY}`, Recipe);
    Data.recipe = creatRecip(data);
    // Data.bookmarks.push(Data.recipe);
    // Data.recipe.bookmarked = true;
    addbookmark(Data.recipe);
  } catch (err) {
    throw err;
  }
};
