export interface Doc {
	key: string;
	title: string;
	cover_edition_key: string;
	author_name: string[];
  edition_key: string[]
}

export interface SearchResult {
	numFound: number;
	start: number;
	numFoundExact: boolean;
	docs: Doc[];
	num_found: number;
	q: string;
	offset?: any;
}

export interface Description {
	type: string;
	value: string;
}

export interface Type {
	key: string;
}

export interface Link {
	title: string;
	url: string;
	type: Type;
}

export interface Type {
	key: string;
}

export interface AuthorType {
	author: Author;
	type: Type;
}

export interface Author {
	key: string;
}

export interface Excerpt {
	excerpt: string;
	pages: string;
	author: Author;
}

export interface Type {
	key: string;
}

export interface Created {
	type: string;
	value: string;
}

export interface Last_modified {
	type: string;
	value: string;
}

export interface Work  {
	description: Description;
	links: Link[];
	title: string;
	covers: number[];
	subject_places: string[];
	first_publish_date: string;
	subject_people: string[];
	key: string;
	authors: AuthorType[];
	excerpts: Excerpt[];
	subjects: string[];
	type: Type;
	subject_times: string[];
	latest_revision: number;
	revision: number;
	created: Created;
	last_modified: Last_modified;
}