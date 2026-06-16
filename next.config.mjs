/**
 * GitHub Pages serve o site em https://<user>.github.io/<repo>/.
 * Por isso usamos basePath/assetPrefix com o nome do repositório em produção.
 * Renomeou o repositório? Ajuste a constante REPO abaixo.
 */
const REPO = 'conceito-moveis';
const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? `/${REPO}` : '',
  assetPrefix: isProd ? `/${REPO}/` : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
