import { Book } from "../models/Book";
import { Doc, Work } from "../models/search";
import { BookInfo } from "../models/bookInfo";

export function mapDocToBook(doc: Doc): Book | undefined {
  try {
    const key = doc.edition_key ? doc.edition_key[0] : doc.key.split("/").pop();
    if (!key) return undefined;
    const title = doc.title;
    const editionKey = doc.cover_edition_key ?? null;
    const coverUrl = `http://covers.openlibrary.org/b/olid/${editionKey}-M.jpg`;
    const author = doc.author_name ? doc.author_name[0] : "(No author Mentioned)";
    return {
      key,
      title,
      coverUrl,
      author
    };
  } catch {
    return undefined;
  }
}

export function mapBookInfoToBook(info: BookInfo): Book {
  return {
    key: info.key,
    title: info.title,
    coverUrl: info.cover.medium ?? null,
    author: info.by_statement ?? null
  };
}