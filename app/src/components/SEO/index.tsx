import Helmet from 'react-helmet';
import { KEY_WORDS } from 'src/keywords';

type SEOProps = {
  title: string;
  description?: string;
  image?: string;
  excludeTitleSuffix?: boolean;
  indexPage?: boolean;
};

export function SEO({
  title,
  description,
  image,
  excludeTitleSuffix,
  indexPage,
}: SEOProps) {
  const pageTitle = `${title} ${!excludeTitleSuffix ? ' | freelas town' : ''}`;
  return (
    <Helmet>
      <title>{pageTitle}</title>
      {description && <meta name="description" content={description} />}
      {image && <meta name="image" content={image} />}
      <meta name="description" content={(KEY_WORDS.join()).toString()} />
      <meta httpEquiv="x-ua-compatible" content="IE=edge,chrome=1" />
      <meta name="MobileOptimized" content="320" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="theme-color" content="#00A1CB" />
      <meta name="msapplication-TileColor" content="#00A1CB" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      <meta name="google" content="notranslate" />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:alt" content="Thumbnail" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="640" />
      <meta property="og:image:height" content="640" />
      <meta content="pt-br, en-US, fr" />

      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:src" content={image} />
      <meta name="twitter:image:alt" content="Thumbnail" />
      <meta name="twitter:image:width" content="640" />
      <meta name="twitter:image:height" content="640" />
    </Helmet>
  );
}

SEO.defaultProps = {
  description:
    'Olá amigo(a), como vai? Gostaria de compartilhar com você essa ideia. Estou usando uma plataforma muito legal chamada freelas town. Lá você encontrará muita coisa legal que vai te ajudar. Se cuida, abraço!',
  image: 'https://static.freelas.town/Azul-Semfundo-3x.png',
  excludeTitleSuffix: false,
  indexPage: false,
};
