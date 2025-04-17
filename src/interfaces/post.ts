import { type Author } from "./author";

export type Post = {
  id?: number | string;
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
  publishedDate: string;
  tag?: string[];
  metaTitle?: string;
  metaDescription?: string;
  contentHtml: string;
};
