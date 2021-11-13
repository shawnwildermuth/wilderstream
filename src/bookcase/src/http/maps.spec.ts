import { Book } from "../models/Book";
import { BookInfo } from "../models/bookInfo";
import { mapBookInfoToBook, mapDocToBook } from "./maps";
import info from "../test/data/bookInfo";
import doc from "../test/data/doc";

describe("fonts", () => {
  it("should provide map Info to Book", () => {

    const book = mapBookInfoToBook(info);

    expect(book.key === info.key);
    expect(book.title === info.title);
    expect(book.coverUrl === info.by_statement);
    expect(book.author === info.cover.medium);

  });

  it("should map Doc to Book", () => {
    const book = mapDocToBook(doc);
    expect(book);
    if (book) {
      expect(book.key === doc.key);
      expect(book.title === doc.title);
      expect(book.coverUrl);
      expect(book.author);
    }
  });
});