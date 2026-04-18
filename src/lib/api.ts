import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://vrtaj-backend.onrender.com/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// --- Types ---
export interface Product {
  _id: string;
  name: string;
  slug: string;
  sku: string;
  category: { _id: string; name: string; slug: string };
  price: number;
  discountPrice: number;
  stock: number;
  description: string;
  shortDescription: string;
  images: string[];
  specifications: Record<string, string>;
  isActive: boolean;
  isFeatured: boolean;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface Review {
  _id: string;
  product: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroImage: string;
  featuredTitle: string;
  featuredDescription: string;
  statCustomers: string;
  statProducts: string;
  statSatisfaction: string;
  whyChooseFeatures: { title: string; description: string; icon: string }[];
  reviewsTitle: string;
  reviewsSubtitle: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

// --- API Calls ---
export async function getHomepageContent(): Promise<HomepageContent> {
  const res = await api.get('/homepage');
  return res.data;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const res = await api.get('/products/featured');
  return res.data;
}

export async function getProducts(params?: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}): Promise<PaginatedResponse<Product>> {
  const res = await api.get('/products', { params });
  return res.data;
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const res = await api.get(`/products/${slug}`);
  return res.data;
}

export async function getCategories(): Promise<Category[]> {
  const res = await api.get('/categories');
  return res.data;
}

export async function getProductReviews(productId: string): Promise<Review[]> {
  const res = await api.get(`/reviews/product/${productId}`);
  return res.data;
}

export async function getHomepageReviews(): Promise<Review[]> {
  const res = await api.get('/reviews/homepage');
  return res.data;
}

export async function submitContact(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const res = await api.post('/contact', data);
  return res.data;
}

export async function submitReview(data: {
  product: string;
  customerName: string;
  customerEmail?: string;
  rating: number;
  comment: string;
}) {
  const res = await api.post('/reviews', data);
  return res.data;
}

export function getImageUrl(path: string): string {
  if (!path) return '/placeholder-product.jpg';
  return path;
}
