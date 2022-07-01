/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['files-gyan-hom.s3.amazonaws.com'],
  },
  // pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  env:{
    SKIP_PREFLIGHT_CHECK:true,
    APP_HOST:'localhost',
    APP_PORT:3000,
    SKIP_PREFLIGHT_CHECK:true,
    REACT_APP_URL:'http://localhost:3000',
    REACT_APP_SEGURANCA_API:'https://syaoxtjjq5.execute-api.us-west-2.amazonaws.com/hom',
    REACT_APP_GERAL_API:'https://syaoxtjjq5.execute-api.us-west-2.amazonaws.com/hom',
    REACT_APP_OPORTUNIDADES_API:'https://syaoxtjjq5.execute-api.us-west-2.amazonaws.com/hom',
    REACT_APP_PESSOAS_API:'https://syaoxtjjq5.execute-api.us-west-2.amazonaws.com/hom',
    REACT_APP_CONSULTAS_API:"https://syaoxtjjq5.execute-api.us-west-2.amazonaws.com/hom",
    REACT_APP_ARQUIVOS_API:"https://syaoxtjjq5.execute-api.us-west-2.amazonaws.com/hom",
    REACT_APP_NOTIFICACOES_API:"https://syaoxtjjq5.execute-api.us-west-2.amazonaws.com/hom",
    REACT_APP_PAGAMENTOS_API:"https://syaoxtjjq5.execute-api.us-west-2.amazonaws.com/hom",
    REACT_APP_OFERTAS_API:"https://syaoxtjjq5.execute-api.us-west-2.amazonaws.com/hom",
    REACT_APP_EMAILS_API:"https://syaoxtjjq5.execute-api.us-west-2.amazonaws.com/hom",
    REACT_APP_API_URL:"https://syaoxtjjq5.execute-api.us-west-2.amazonaws.com/hom",
    REACT_APP_CHAT_API:"https://syaoxtjjq5.execute-api.us-west-2.amazonaws.com/hom"
  },

  rewrites() {
    return [
      {
        source: '/:path*',
        destination: '/:path*'
      },
      {
        source: '/:path*',
        destination: 'https://gyan.com.br/:path*'
      }
    ]

  },
}

module.exports = nextConfig
