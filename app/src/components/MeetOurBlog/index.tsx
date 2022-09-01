import { ArrowSlider, Carrousel, Container, Posts } from './style';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IPostProps } from 'src/interfaces/IPostProps';

interface PostProps {
  posts: IPostProps[];
}

export function MeetOurBlog({ posts }: PostProps) {
  const router = useRouter();

  const settingsSlider = {
    speed: 500,
    dots: false,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: posts?.length > 4 ? 4 : posts?.length,
    className: 'container-slider',
    initialSlide: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowSlider />,
    prevArrow: <ArrowSlider />,
    responsive: [
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: posts?.length > 3 ? 3 : posts?.length,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: posts?.length > 3 ? 3.5 : posts?.length,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: posts?.length > 2 ? 2 : posts?.length,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 1,

          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
      <h2>Conheça nosso blog</h2>
      <h4>Postagens relacionadas</h4>
      <Carrousel {...settingsSlider}>
        {posts.map(item => {
          return (
            <Posts
              key={item.id}
              onClick={() =>
                router.push(
                  `https://blog.gyan.com.br/post/${item?.attributes?.slug}`,
                )
              }
            >
              <div className="containerImage">
                <Image
                  alt="img-ebook"
                  layout="intrinsic"
                  objectFit="cover"
                  className={'image'}
                  src={item?.attributes?.cover?.data?.attributes?.url}
                  width={248}
                  height={250}
                />
              </div>
              <h3>{item.attributes.title}</h3>
              <h4>{item.attributes.description}</h4>
            </Posts>
          );
        })}
      </Carrousel>
    </Container>
  );
}
