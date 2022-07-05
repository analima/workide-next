/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['files-gyan-hom.s3.amazonaws.com'],
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  env:{
    SKIP_PREFLIGHT_CHECK:process.env.SKIP_PREFLIGHT_CHECK,
    APP_HOST:process.env.APP_HOST,
    APP_PORT:process.env.APP_PORT,
    REACT_APP_URL:process.env.REACT_APP_URL,
    REACT_APP_SEGURANCA_API:process.env.REACT_APP_SEGURANCA_API,
    REACT_APP_GERAL_API:process.env.REACT_APP_GERAL_API,
    REACT_APP_OPORTUNIDADES_API:process.env.REACT_APP_OPORTUNIDADES_API,
    REACT_APP_PESSOAS_API:process.env.REACT_APP_PESSOAS_API,
    REACT_APP_CONSULTAS_API:process.env.REACT_APP_CONSULTAS_API,
    REACT_APP_ARQUIVOS_API:process.env.REACT_APP_ARQUIVOS_API,
    REACT_APP_NOTIFICACOES_API:process.env.REACT_APP_NOTIFICACOES_API,
    REACT_APP_PAGAMENTOS_API:process.env.REACT_APP_PAGAMENTOS_API,
    REACT_APP_OFERTAS_API:process.env.REACT_APP_OFERTAS_API,
    REACT_APP_EMAILS_API:process.env.REACT_APP_EMAILS_API,
    REACT_APP_API_URL:process.env.REACT_APP_API_URL,
    REACT_APP_CHAT_API:process.env.REACT_APP_CHAT_API,
    REACT_APP_AWS_COGNITO_CLIENT_ID:process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
    REACT_APP_AWS_COGNITO_CLIENT_DOMAIN:process.env.REACT_APP_AWS_COGNITO_CLIENT_DOMAIN
  },

  rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*'
      },
      {
        source: '/:path*',
        destination: `https://react-hom.gyan.com.br/:path*`
      }
    ]

  },
}

module.exports = nextConfig
