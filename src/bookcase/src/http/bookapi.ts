import axios from "axios";
import { Response } from "../models/books";

export async function loadBooksByCategory(category: string) {
  const url = `https://openlibrary.org/subjects/${category}.json`;
  const result = await axios.get<Response>(url);
  if (result.status === 200) {
    return result.data.works;
  }
  return undefined;
}