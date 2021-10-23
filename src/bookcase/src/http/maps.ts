import { Book } from "../models/Book";
import { Doc } from "../models/search";

export function mapDocToBook(doc: Doc) : Book {
  return {
    key: doc?.key,
    title: doc?.title,
    coverUrl: `http://covers.openlibrary.org/b/olid/${doc.cover_edition_key}-M.jpg`,
    author: doc.author_name ? doc.author_name[0] : "(No author Mentioned)"
  };
}