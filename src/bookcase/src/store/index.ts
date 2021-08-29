import { createStore } from "vuex";
import { loadBooksByCategory, loadShelf, loadWork } from "../http/bookapi";
import { Work } from "../models/books";

export default createStore({
  state: {
    bookList: new Array<Work>(),
    shelf: new Array<Work>(),
    isBusy: false,
    currentCategory: "science_fiction",
    error: ""
  },
  mutations: {
    setBookList(state, list: Array<Work>) {
      state.bookList = list;
    },
    addToShelf: (state, book) => {
      if (!state.shelf.find(b => b.key === book.key)) state.shelf.push(book);
    },
    removeFromShelf: (state, book) => {
      const index = state.shelf.findIndex(b => b.key === book.key);
      if (index > -1) state.shelf.splice(index, 1);
    },
    setCurrentCategory: (state, category) => state.currentCategory = category,
    setError: (state, error: string) => state.error = error,
    setIsBusy: (state) => state.isBusy = true,
    clearIsBusy: (state) => state.isBusy = false
  },
  actions: {
    addBookToShelf({ commit }, book: Work) {
      commit("addToShelf", book);
    },
    removeBookFromShelf({ commit }, book: Work) {
      commit("removeFromShelf", book);
    },
    async loadShelf({state, commit}) {
      commit("setError", "");
      commit("setIsBusy");
      try {
        const results = await loadShelf();
        if (results) {
          for (let x = 0; x < results.length; ++x) {
            const workResult = await loadWork(results[x]);
            if (workResult) {
              commit("addToShelf", workResult);
            }
          }
        }
        else commit("setError", "Failed to load the shelf");
      } catch (error) {
        commit("setError", "Exception thrown while loading the shelf");
      } finally {
        commit("clearIsBusy");
      }

    },
    async loadBookList({ state, commit }, category: string) {

      if (state.currentCategory !== category || state.bookList.length === 0) {
        commit("setCurrentCategory", category);
        commit("setError", "");
        commit("setIsBusy");

        try {
          const results = await loadBooksByCategory(category);
          if (results) commit("setBookList", results);
          else commit("setError", "Failed to load any books");
        } catch (error) {
          commit("setError", "Exception thrown while getting books");
        } finally {
          commit("clearIsBusy");
        }
      }
    }
  }
});

