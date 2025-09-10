import localforage from 'localforage';
import { Game, Product, BlogPost, User, CartItem } from '../types';
import { mockGames, mockProducts, mockBlogPosts, mockUsers } from './mockData';

// Configure storage
localforage.config({
  name: 'gaming-company-website'
});

// Initialize stores
const gameStore = localforage.createInstance({ name: 'games' });
const productStore = localforage.createInstance({ name: 'products' });
const blogStore = localforage.createInstance({ name: 'blog-posts' });
const userStore = localforage.createInstance({ name: 'users' });
const cartStore = localforage.createInstance({ name: 'cart' });

// Initialize data
export const initializeData = async () => {
  const gamesExist = await gameStore.getItem('initialized');
  if (!gamesExist) {
    await Promise.all(mockGames.map(game => gameStore.setItem(game.id, game)));
    await gameStore.setItem('initialized', true);
  }

  const productsExist = await productStore.getItem('initialized');
  if (!productsExist) {
    await Promise.all(mockProducts.map(product => productStore.setItem(product.id, product)));
    await productStore.setItem('initialized', true);
  }

  const blogPostsExist = await blogStore.getItem('initialized');
  if (!blogPostsExist) {
    await Promise.all(mockBlogPosts.map(post => blogStore.setItem(post.id, post)));
    await blogStore.setItem('initialized', true);
  }

  const usersExist = await userStore.getItem('initialized');
  if (!usersExist) {
    await Promise.all(mockUsers.map(user => userStore.setItem(user.username, user)));
    await userStore.setItem('initialized', true);
  }
};

// Game functions
export const getGames = async (): Promise<Game[]> => {
  const games: Game[] = [];
  await gameStore.iterate((value) => {
    if (typeof value === 'object' && 'id' in value) {
      games.push(value as Game);
    }
  });
  return games;
};

export const getGame = async (id: string): Promise<Game | null> => {
  return await gameStore.getItem(id) as Game | null;
};

export const createGame = async (game: Game): Promise<Game> => {
  await gameStore.setItem(game.id, game);
  return game;
};

export const updateGame = async (id: string, game: Game): Promise<Game> => {
  await gameStore.setItem(id, game);
  return game;
};

export const deleteGame = async (id: string): Promise<void> => {
  await gameStore.removeItem(id);
};

// Product functions
export const getProducts = async (): Promise<Product[]> => {
  const products: Product[] = [];
  await productStore.iterate((value) => {
    if (typeof value === 'object' && 'id' in value) {
      products.push(value as Product);
    }
  });
  return products;
};

export const getProduct = async (id: string): Promise<Product | null> => {
  return await productStore.getItem(id) as Product | null;
};

export const createProduct = async (product: Product): Promise<Product> => {
  await productStore.setItem(product.id, product);
  return product;
};

export const updateProduct = async (id: string, product: Product): Promise<Product> => {
  await productStore.setItem(id, product);
  return product;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await productStore.removeItem(id);
};

// Blog functions
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const posts: BlogPost[] = [];
  await blogStore.iterate((value) => {
    if (typeof value === 'object' && 'id' in value) {
      posts.push(value as BlogPost);
    }
  });
  return posts;
};

export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  return await blogStore.getItem(id) as BlogPost | null;
};

export const createBlogPost = async (post: BlogPost): Promise<BlogPost> => {
  await blogStore.setItem(post.id, post);
  return post;
};

export const updateBlogPost = async (id: string, post: BlogPost): Promise<BlogPost> => {
  await blogStore.setItem(id, post);
  return post;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
  await blogStore.removeItem(id);
};

export const addComment = async (postId: string, comment: Omit<Comment, 'id' | 'postId' | 'date'>): Promise<void> => {
  const post = await getBlogPost(postId);
  if (post) {
    const newComment = {
      id: Date.now().toString(),
      postId,
      ...comment,
      date: new Date().toISOString()
    };
    post.comments.push(newComment as any);
    await updateBlogPost(postId, post);
  }
};

// User functions
export const getUser = async (username: string): Promise<User | null> => {
  return await userStore.getItem(username) as User | null;
};

export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
  const user = await getUser(username);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

// Cart functions
export const getCart = async (): Promise<CartItem[]> => {
  const cart = await cartStore.getItem('cart') as CartItem[];
  return cart || [];
};

export const addToCart = async (product: Product, quantity: number = 1): Promise<CartItem[]> => {
  const cart = await getCart();
  const existingItem = cart.find(item => item.product.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  
  await cartStore.setItem('cart', cart);
  return cart;
};

export const updateCartItem = async (productId: string, quantity: number): Promise<CartItem[]> => {
  const cart = await getCart();
  const index = cart.findIndex(item => item.product.id === productId);
  
  if (index !== -1) {
    if (quantity <= 0) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = quantity;
    }
    
    await cartStore.setItem('cart', cart);
  }
  
  return cart;
};

export const clearCart = async (): Promise<void> => {
  await cartStore.setItem('cart', []);
};