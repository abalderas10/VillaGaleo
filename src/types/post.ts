export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  image: string;
  author: string;
  authorImage: string;
  date: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  alt: string;
  postId: string;
}