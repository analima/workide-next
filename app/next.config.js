/* @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'files-workide-hom.s3.amazonaws.com',
      'files-workide-ppr.s3.amazonaws.com',
      'files-workide-prod.s3.amazonaws.com',
      'workide-public.s3.amazonaws.com',
      'blog-workide-hom.s3.us-west-2.amazonaws.com',
      'blog-workide-prod.s3.us-west-2.amazonaws.com',
      'blog-workide-prod.s3.amazonaws.com',
    ],
  },
  swcMinify: true,
  i18n: {
    locales: ['pt_br'],
    defaultLocale: 'pt_br',
  },
  env: {
    SKIP_PREFLIGHT_CHECK: process.env.SKIP_PREFLIGHT_CHECK,
    APP_HOST: process.env.APP_HOST,
    APP_PORT: process.env.APP_PORT,
    REACT_APP_URL: process.env.REACT_APP_URL,
    REACT_APP_REDIRECT_URL: process.env.REACT_APP_REDIRECT_URL,
    REACT_APP_SEGURANCA_API: process.env.REACT_APP_SEGURANCA_API,
    REACT_APP_GERAL_API: process.env.REACT_APP_GERAL_API,
    REACT_APP_OPORTUNIDADES_API: process.env.REACT_APP_OPORTUNIDADES_API,
    REACT_APP_PESSOAS_API: process.env.REACT_APP_PESSOAS_API,
    REACT_APP_CONSULTAS_API: process.env.REACT_APP_CONSULTAS_API,
    REACT_APP_ARQUIVOS_API: process.env.REACT_APP_ARQUIVOS_API,
    REACT_APP_NOTIFICACOES_API: process.env.REACT_APP_NOTIFICACOES_API,
    REACT_APP_PAGAMENTOS_API: process.env.REACT_APP_PAGAMENTOS_API,
    REACT_APP_OFERTAS_API: process.env.REACT_APP_OFERTAS_API,
    REACT_APP_EMAILS_API: process.env.REACT_APP_EMAILS_API,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_BLOG_API: process.env.REACT_APP_BLOG_API,
    REACT_APP_TOKEN_BLOG: process.env.REACT_APP_TOKEN_BLOG,
    REACT_APP_CHAT_API: process.env.REACT_APP_CHAT_API,
    REACT_APP_AWS_COGNITO_CLIENT_ID:
      process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
    REACT_APP_AWS_COGNITO_CLIENT_DOMAIN:
      process.env.REACT_APP_AWS_COGNITO_CLIENT_DOMAIN,
    REACT_APP_PROXY_HOST: process.env.REACT_APP_PROXY_HOST,
    REACT_APP_VERSION: process.env.REACT_APP_VERSION,
  },

  rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
      {
        source: '/:path*',
        destination: '/:path*',
      },
      {
        source: '/:path*',
        destination: `${process.env.REACT_APP_PROXY_HOST}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
