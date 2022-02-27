import icons from "url:../../img/icons.svg";
import View from "./View.js";
class paginationView extends View {
  _parentEL = document.querySelector(".pagination");

  handlerpagination(handler) {
    this._parentEL.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination-btn");
      if (!btn) return;
      const goTopage = +btn.dataset.goto;
      handler(goTopage);
    });
  }

  _generateMarkup() {
    const numpage = Math.ceil(this._data.result.length / 10);
    const currentPage = this._data.page;
    ///// اگر صفحه اول بودیم و تعداد صفحات بیشتر از یک بود
    if (currentPage === 1 && numpage > 1) {
      return `
      <button data-goto=${
        currentPage + 1
      } class='btn pagination-btn  pagination-btn--next'>
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
      `;
    }

    /////// اگر بین صفحات اول و اخر بودیم

    if (currentPage < numpage) {
      return ` <button data-goto=${
        currentPage - 1
      } class='btn pagination-btn  pagination-btn--prev'>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>

    <button data-goto=${
      currentPage + 1
    } class='btn pagination-btn  pagination-btn--next'>
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> `;
      //     //// اگر صفحه اخر بودیم
    }
    if (numpage === currentPage && numpage > 1) {
      return `
      <button data-goto=${
        currentPage - 1
      } class='btn pagination-btn  pagination-btn--prev'>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;
    } else return "";
  }
}

export default new paginationView();
