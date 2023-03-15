import { useEffect, useState } from 'react';
import { arquivos_api } from '../../services/arquivos_api';
import { pessoas_api } from '../../services/pessoas_api';
import EstrelaOff from '../../assets/estrela-off.svg';
import  Estrela from '../../assets/estrela.svg';
import defaultImage from '../../assets/profileImage.svg';
import { Avaliacao, Container } from './style';
import Image from 'next/image'

type Props = {
  id: number;
  estrela: number;
};

type UserProps = {
  imagem: string;
  avaliacao: number;
};

export function MiniCardUser({ id, estrela }: Props) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadData() {
      const pessoaResponse1 = await pessoas_api.get(`/pessoas/${id}`);

      const { nome, id_arquivo } = pessoaResponse1.data;
      setName(nome);
      if (id_arquivo) {
        const { data } = await arquivos_api.get(`/arquivos/${id_arquivo}`);
        setUser({ imagem: data.url, avaliacao: 0 });
      }
    }
    loadData();
  }, [id]);

  function handleShowStars(numberOfStars: number) {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      if (i <= numberOfStars) {
        if (numberOfStars === 0)
          stars.push(
            <EstrelaOff className="estrela" key={i + Math.random()} />,
          );
        else
          stars.push(<Estrela className="estrela" key={i + Math.random()} />);
      } else {
        stars.push(<EstrelaOff className="estrela" key={i + Math.random()} />);
      }
    }
    return stars;
  }

  return (
    <Container>
      {!user.imagem ? (
        <Image src={defaultImage} alt={name} />
      ) : (
        <Image src={user.imagem} alt="Imagem" />
      )}
      <div>
        <p>{name}</p>
        <Avaliacao>
          <span>{user.avaliacao}</span>
          {handleShowStars(estrela)}
        </Avaliacao>
      </div>
    </Container>
  );
}
