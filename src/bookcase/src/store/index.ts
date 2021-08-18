import { createStore } from "vuex";
import { loadBooksByCategory } from "../http/bookapi";
import { Work } from "../models/books";

export default createStore({
  state: {
    bookList: new Array<Work>(),
    shelf: new Array<Work>(),
    isBusy: false,
    error: ""
  },
  mutations: {
    setBookList(state, list: Array<Work>) {
      state.bookList = list;
    },
    addToShelf: (state, book) => {
      if (!state.shelf.find(b => b.key === book.key)) state.shelf.push(book);
    },
    setError: (state, error: string) => state.error = error, 
    setIsBusy: (state) => state.isBusy = true, 
    clearIsBusy: (state) => state.isBusy = false 
  },
  actions: {
    addBookToShelf({ commit }, book: Work) {
      commit("addToShelf", book);
    },
    async loadBookList({ commit }, category: string) {
      
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
});

