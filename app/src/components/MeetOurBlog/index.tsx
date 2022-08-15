import { useEffect, useState } from 'react';
import { Container, ContainerPosts, Posts } from './style';
import IMG from '@public/img-secundary-ong.webp';
import Image from 'next/image';

interface IPropsPosts {
  id: number;
  featuredText: string;
  text: string;
  link: string;
}

export function MeetOurBlog() {
  const [posts, setPosts] = useState<Array<IPropsPosts>>([] as IPropsPosts[]);

  useEffect(() => {
    setPosts([
      {
        id: 1,
        featuredText: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        link: 'www.google.com.br',
      },
      {
        id: 2,
        featuredText: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        link: 'www.google.com.br',
      },
      {
        id: 3,
        featuredText: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        link: 'www.google.com.br',
      },
      {
        id: 4,
        featuredText: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
        link: 'www.google.com.br',
      },
    ]);
  }, []);

  return (
    <Container>
      <h2>Conhaça nosso blog</h2>
      <h4>Postagens relacionadas</h4>
      <ContainerPosts>
        {posts.map(item => {
          return (
            <Posts key={item.id}>
              <div className="containerImage">
                <Image
                  alt="img-ebook"
                  layout="intrinsic"
                  objectFit="cover"
                  className={'image'}
                  src={IMG}
                  width={248}
                  height={250}
                />
              </div>
              <h3>{item.featuredText}</h3>
              <h4>{item.text}</h4>
            </Posts>
          );
        })}
      </ContainerPosts>
    </Container>
  );
}
