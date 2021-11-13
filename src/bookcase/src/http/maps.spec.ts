import { Book } from "../models/Book";
import { BookInfo } from "../models/bookInfo";
import { mapBookInfoToBook } from "./maps";
import info from "../test/data/bookInfo";

describe("fonts", () => {
  it("should provide fonts", () => {

    const book = mapBookInfoToBook(info);

    expect(book.key === info.key);
    expect(book.title === info.title);
    expect(book.coverUrl === info.by_statement);
    expect(book.author === info.cover.medium);

  });
});