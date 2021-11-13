export interface Author {
  url: string;
  name: string;
}

export interface Identifier {
  librarything?: string[];
  goodreads?: string[];
  isbn_10?: string[];
  isbn_13?: string[];
  lccn?: string[];
  oclc?: string[];
  openlibrary?: string[];
}

export interface Classification {
  lccn_permalink?: string[];
  lc_classifications?: string[];
  dewey_decimal_class?: string[];
}

export interface Publisher {
  name: string;
}

export interface Publish_place {
  name: string;
}

export interface Subject {
  name: string;
  url: string;
}

export interface Subject_place {
  name: string;
  url: string;
}

export interface Subject_people {
  name: string;
  url: string;
}

export interface Subject_time {
  name: string;
  url: string;
}

export interface Excerpt {
  text: string;
  comment: string;
}

export interface Table_of_content {
  level: number;
  label: string;
  title: string;
  pagenum: string;
}

export interface Link {
  title: string;
  url: string;
}

export interface Format { }

export interface Ebook {
  preview_url: string;
  availability: string;
  formats: Format;
  borrow_url?: string;
  checkedout?: Boolean
}

export interface Cover {
  small: string;
  medium: string;
  large: string;
}

export interface BookInfo {
  url: string;
  key: string;
  title: string;
  authors: Author[];
  number_of_pages: number;
  pagination: string;
  by_statement?: string;
  identifiers: Identifier;
  classifications: Classification;
  publishers: Publisher[];
  publish_places: Publish_place[];
  publish_date: string;
  subjects: Subject[];
  subject_places: Subject_place[];
  subject_people: Subject_people[];
  subject_times: Subject_time[];
  excerpts: Excerpt[];
  table_of_contents?: Table_of_content[];
  links: Link[];
  ebooks: Ebook[];
  cover: Cover;
}

export interface BookResult {
  BookInfo: BookInfo;
}
