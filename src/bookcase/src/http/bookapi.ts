import axios from "axios";
import { Book } from "../models/Book";
import { SearchResult, Doc, Work } from "../models/search";
import { mapDocToBook, mapBookInfoToBook } from "./maps";
import { BookResult } from "../models/bookInfo";
/*
SEARCH
https://openlibrary.org/search.json?fields=key,title,author_name,cover_edition_key&q=the+lord+of+the+rings
KEY LOADING (from key)
https://openlibrary.org/works/OL27448W.json
COVER (from cover-edition-key)
http://covers.openlibrary.org/b/olid/OL8529332M-L.jpg
*/

const apiRoot = "http://localhost:5000"

export async function searchForBooks(search: string)  {
  const url = `https://openlibrary.org/search.json?fields=edition_key,key,title,author_name,cover_edition_key&q=${encodeURI(search)}`;
  const result = await axios.get<SearchResult>(url);
  if (result.status === 200) {
    return result.data.docs.map(mapDocToBook);
  }
  return undefined;
}

export async function loadShelf() {
  const url = `${apiRoot}/shelf`;
  const result = await axios.get<String[]>(url);
  if (result.status === 200) {
    return result.data;
  }
  return undefined;
}

export async function addToShelf(bookId: string) {
  const url = `${apiRoot}/shelf/item/${bookId}`;
  const result = await axios.post<String[]>(url);
  if (result.status === 201) {
    return true;
  }
  return false;
}

export async function removeFromShelf(bookId: string) {
  const url = `${apiRoot}/shelf/item/${bookId}`;
  const result = await axios.delete(url);
  if (result.status === 200) {
    return true;
  }
  return false;
}


export async function loadBook(id: String) : Promise<Book | undefined > {
  const url = `https://openlibrary.org/api/books?&bibkeys=OLID:${id}&format=json&jscmd=data`;
  const result = await axios.get<BookResult>(url);
  if (result.status === 200) {
    return mapBookInfoToBook(Object.values(result.data)[0]);
  }
  return undefined;
}