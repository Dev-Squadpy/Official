export interface Game {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  imageUrl: string;
  platforms: string[];
  characters: Character[];
  releaseDate?: string;
  gallery?: string[];
}

export interface Character {
  id: string;
  name: string;
  imageUrl: string;
  description?: string;
  gameId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageUrl2?: string;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  publishedDate: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  date: string;
}

export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}