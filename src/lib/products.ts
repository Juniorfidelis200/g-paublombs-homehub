import { supabase } from "@/integrations/supabase/client";

export const PRODUCT_CATEGORIES = [
  "Security Doors",
  "Luxury Entrance Doors",
  "Turkish Doors",
  "Smart Doors",
  "Fireproof Doors",
  "Interior Doors",
  "Wooden Doors",
  "Customized Doors",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

export type Category = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export async function fetchCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Category[];
}

export function categorySlug(name: string) {
  return slugify(name);
}

export const STOCK_OPTIONS = [
  { value: "in_stock", label: "In Stock" },
  { value: "low_stock", label: "Low Stock" },
  { value: "out_of_stock", label: "Out of Stock" },
  { value: "made_to_order", label: "Made to Order" },
] as const;

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  features: string[];
  specifications: Record<string, string>;
  sizes: string[];
  colors: string[];
  price: number | null;
  price_max: number | null;
  discount_price: number | null;
  stock_status: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  sort_order: number;
};

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatNGN(n: number | null | undefined) {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(n));
}

export function priceLabel(p: Pick<Product, "price" | "price_max" | "discount_price">) {
  if (p.discount_price != null) {
    return `${formatNGN(p.discount_price)}`;
  }
  if (p.price != null && p.price_max != null && p.price_max > p.price) {
    return `${formatNGN(p.price)} – ${formatNGN(p.price_max)}`;
  }
  if (p.price != null) return `From ${formatNGN(p.price)}`;
  return "Request quote";
}

export const WHATSAPP_BASE = "https://wa.me/2348032272932";

export function whatsappQuoteUrl(product: Pick<Product, "name">) {
  const text = encodeURIComponent(
    `Hello G-Paublo Homes, I'd like a quote on the "${product.name}". Please share availability, sizes and total price including delivery & installation.`,
  );
  return `${WHATSAPP_BASE}?text=${text}`;
}

export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as unknown as Product[];
}

export async function fetchProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as Product | null;
}

export async function fetchProductImages(productId: string) {
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ProductImage[];
}

export async function fetchAllProductImages() {
  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ProductImage[];
}