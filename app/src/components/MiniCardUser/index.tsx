import { useEffect, useState } from 'react';
import { arquivos_api } from '../../services/arquivos_api';
import { pessoas_api } from '../../services/pessoas_api';
import Estrela from '../../assets/estrela.svg';
import defaultImage from '../../assets/profileImage.svg';
import { Avaliacao, Container } from './style';
import Image from 'next/image';

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
          <Estrela className="estrela" key={0} />
        </Avaliacao>
      </div>
    </Container>
  );
}
