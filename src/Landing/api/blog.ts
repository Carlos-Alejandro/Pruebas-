export type BlogArticle = {
  slug: string;
  file: string; // nombre de archivo dentro de /assets/blog
  title: string;
  excerpt: string;
  category?: string;
  publishedAt?: string;
};

const imgs = import.meta.glob("../../assets/blog/*.{png,jpg,jpeg,webp}", {
  eager: true,
  query: "?url",
}) as Record<string, { default: string }>;

export const getBlogImageUrl = (file: string): string => {
  const entry = Object.entries(imgs).find(([path]) => path.endsWith(`/${file}`));
  return entry ? entry[1].default : "";
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "la-madera-sin-disfraz",
    file: "img5.png",
    title: "La Madera sin Disfráz",
    excerpt: "Una reflexión de OUMA",
    category: "Editorial",
  },
  {
    slug: "nombre-del-articulo-2",
    file: "img6.png",
    title: "Nombre del Artículo",
    excerpt: "Descripción del artículo",
    category: "Insights",
  },
  {
    slug: "nombre-del-articulo-3",
    file: "img7.png",
    title: "Nombre del Artículo",
    excerpt: "Descripción del artículo",
    category: "Noticias",
  },
  {
    slug: "nombre-del-articulo-4",
    file: "img8.png",
    title: "Nombre del Artículo",
    excerpt: "Descripción del artículo",
    category: "Noticias",
  },
];

export const findBlogArticleBySlug = (slug: string): BlogArticle | undefined =>
  BLOG_ARTICLES.find((article) => article.slug === slug);
