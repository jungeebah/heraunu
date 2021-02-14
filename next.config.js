const images = {
    images: {
        domains: ['storage.googleapis.com', 'm.media-amazon.com', 'image.tmdb.org'],
    }
}
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withPlugins([
    [images],
    [withBundleAnalyzer],
    [withImages]
])

