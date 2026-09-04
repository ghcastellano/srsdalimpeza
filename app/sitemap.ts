import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/content';
import { servicePages } from '@/lib/service-pages';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...servicePages.map((page) => ({
      url: `${siteUrl}/${page.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    { url: `${siteUrl}/politica-de-privacidade`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.2 },
  ];
}
