export default function sitemap() {
  return [
    {
      url: 'https://itek-comparateur.fr',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      exclude:['/pages/Admin/*'],
      priority: 0.7,
    },
    {
      url: 'https://itek-comparateur.fr/pages/pc-portable',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://itek-comparateur.fr/pages/pc-portable/*',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}