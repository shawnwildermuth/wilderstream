import axios from "axios";
import { Response, Work } from "../models/books";

export async function loadBooksByCategory(category: string) {
  const url = `https://openlibrary.org/subjects/${category}.json`;
  const result = await axios.get<Response>(url);
  if (result.status === 200) {
    return result.data.works;
  }
  return undefined;
}

export async function loadShelf() {
  const url = "http://localhost:5000/shelf";
  const result = await axios.get<String[]>(url);
  if (result.status === 200) {
    return result.data;
  }
  return undefined;
}

export async function loadWork(workId: String) {
  const url = `https://openlibrary.org/works/${workId}.json`;
  const result = await axios.get<Work>(url);
  if (result.status === 200) {
    return result.data;
  }
  return undefined;
}