/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://zyoris.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // keep the default robots.txt (we already have a custom one, this will overwrite it)
  // you can merge manually if needed
  // Add the most important pages early in the sitemap
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/faq'),
    await config.transform(config, '/pricing'),
    await config.transform(config, '/about'),
    await config.transform(config, '/contact-v1'),
    await config.transform(config, '/careers'),
  ],
};