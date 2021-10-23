import axios from "axios";
import { SearchResult, Doc } from "../models/search";
import { mapDocToBook } from "./maps";

/*
SEARCH
https://openlibrary.org/search.json?fields=key,title,author_name,cover_edition_key&q=the+lord+of+the+rings
KEY LOADING (from key)
https://openlibrary.org/works/OL27448W.json
COVER (from cover-edition-key)
http://covers.openlibrary.org/b/olid/OL8529332M-L.jpg
*/

export async function searchForBooks(search: string)  {
  const url = `https://openlibrary.org/search.json?fields=key,title,author_name,cover_edition_key&q=${encodeURI(search)}`;
  const result = await axios.get<SearchResult>(url);
  if (result.status === 200) {
    return result.data.docs.map(mapDocToBook);
  }
  return undefined;
}

// export async function loadBooksByCategory(category: string) {
//   const url = `https://openlibrary.org/subjects/${category}.json`;
//   const result = await axios.get<Response>(url);
//   if (result.status === 200) {
//     return result.data.works;
//   }
//   return undefined;
// }

// export async function loadShelf() {
//   const url = "http://localhost:5000/shelf";
//   const result = await axios.get<String[]>(url);
//   if (result.status === 200) {
//     return result.data;
//   }
//   return undefined;
// }

// export async function loadWork(workId: String) {
//   const url = `https://openlibrary.org/works/${workId}.json`;
//   const result = await axios.get<Work>(url);
//   if (result.status === 200) {
//     return result.data;
//   }
//   return undefined;
// }