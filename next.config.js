const createMDX = require('@next/mdx');
const rehypePrettyCode = require('rehype-pretty-code');

// const remarkPrism = require("remark-prism");

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    // remarkPlugins: [remarkPrism],
    rehypePlugins: [[rehypePrettyCode, {
      theme: 'one-dark-pro',
      onVisitLine(node) {
        // Prevent lines from collapsing in `display: grid` mode, and allow empty
        // lines to be copy/pasted
        if (node.children.length === 0) {
          node.children = [{ type: 'text', value: ' ' }];
        }
      },
      onVisitHighlightedLine(node) {
        node.properties.className.push('line--highlighted');
      },
      onVisitHighlightedWord(node) {
        node.properties.className = ['word--highlighted'];
      },
    }]],
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  async redirects() {
    return [
      {
        source: '/components',
        destination: '/components/prestyled-sankey',
        permanent: true,
      },
    ]
  },
}

module.exports = withMDX(nextConfig)

