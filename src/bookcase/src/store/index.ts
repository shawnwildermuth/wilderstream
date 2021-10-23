import { createStore } from "vuex";
import { searchForBooks } from "../http/bookapi";
import { Book } from "../models/book";

export default createStore({
  state: {
    bookList: new Array<Book>(),
    shelf: new Array<Book>(),
    isBusy: false,
    error: ""
  },
  mutations: {
    setBookList(state, list: Array<Book>) {
      state.bookList = list;
    },
    addToShelf: (state, book: Book) => {
      if (!state.shelf.find(b => b.key === book.key)) state.shelf.push(book);
    },
    removeFromShelf: (state, book: Book) => {
      const index = state.shelf.findIndex(b => b.key === book.key);
      if (index > -1) state.shelf.splice(index, 1);
    },
    setError: (state, error: string) => state.error = error,
    setIsBusy: (state) => state.isBusy = true,
    clearIsBusy: (state) => state.isBusy = false
  },
  actions: {
    addBookToShelf({ commit }, book: Book) {
      commit("addToShelf", book);
    },
    removeBookFromShelf({ commit }, book: Book) {
      commit("removeFromShelf", book);
    },
    async loadShelf({state, commit}) {
      commit("setError", "");
      commit("setIsBusy");
      // try {
      //   const results = await loadShelf();
      //   if (results) {
      //     for (let x = 0; x < results.length; ++x) {
      //       const workResult = await loadWork(results[x]);
      //       if (workResult) {
      //         commit("addToShelf", workResult);
      //       }
      //     }
      //   }
      //   else commit("setError", "Failed to load the shelf");
      // } catch (error) {
      //   commit("setError", "Exception thrown while loading the shelf");
      // } finally {
         commit("clearIsBusy");
      // }

    },
    async searchForBooks({ state, commit }, search: string) {

      commit("setError", "");
      commit("setIsBusy");
      commit("setBookList", []);

      try {
        const results = await searchForBooks(search);
        if (results) commit("setBookList", results);
        else commit("setError", "Failed to load any books");
      } catch (error) {
        commit("setError", "Exception thrown while getting books");
      } finally {
        commit("clearIsBusy");
      }
    }
  },
  getters: {
    isBookOnShelf: (state) => (book:Book) => {
      return state.shelf.findIndex(b => b.key === book.key) > -1;
    }
  }
});

