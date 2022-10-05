import { Col, Row } from 'react-bootstrap';
import { useCaptarProjetoFornecedor } from '../../../../hooks/captarProjetoFornecedor';
import { OrdemGroup, OrdemInput, ExibirFavorito } from './style';
import Content from './style';
import { useEffect, useState } from 'react';
import { subDays } from 'date-fns';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { LARANJA } from 'src/styles/variaveis';

interface IProps {
  setFavorito: React.Dispatch<React.SetStateAction<boolean>>;
  favorito: boolean;
}
export default function Ordenacao({ setFavorito, favorito }: IProps) {
  const { setValue, watch, obterProjetos } = useCaptarProjetoFornecedor();
  const [periodFilter, setPeriodFilter] = useState('');

  useEffect(() => {
    const handleConditionalsForGetProjectByDate = async () => {
      if (periodFilter === '24horas') {
        setValue('periodo_inicial', subDays(new Date(), 1).toISOString());
        setValue('periodo_final', new Date().toISOString());
      }
      if (periodFilter === '5dias') {
        setValue('periodo_inicial', subDays(new Date(), 6).toISOString());
        setValue('periodo_final', subDays(new Date(), 5).toISOString());
      }
      if (periodFilter === '15dias') {
        setValue('periodo_inicial', subDays(new Date(), 16).toISOString());
        setValue('periodo_final', subDays(new Date(), 15).toISOString());
      }
      if (periodFilter === 'Mais15dias') {
        setValue('periodo_inicial', '2001-01-01T00:00:00.000Z');
        setValue('periodo_final', subDays(new Date(), 15));
      }
      if (periodFilter === '') {
        setValue('periodo_inicial', '2001-01-01T00:00:00.000Z');
        setValue('periodo_final', new Date());
      }

      obterProjetos();
    };

    handleConditionalsForGetProjectByDate();
  }, [obterProjetos, periodFilter, setValue]);

  return (
    <Content>
      <span>Publicado em:</span>

      <OrdemGroup>
        <div className="inputs">
          <OrdemInput checked={periodFilter === '24horas'}>
            <label htmlFor="24horas">24 horas</label>
            <input
              type="checkbox"
              id="24horas"
              name="24horas"
              checked={periodFilter === '24horas'}
              onChange={() => {
                setPeriodFilter(oldState =>
                  oldState === '24horas' ? '' : '24horas',
                );
              }}
            />
          </OrdemInput>

          <OrdemInput checked={periodFilter === '5dias'}>
            <label htmlFor="5dias">5 dias</label>
            <input
              type="checkbox"
              id="5dias"
              name="5dias"
              checked={periodFilter === '5dias'}
              onChange={() => {
                setPeriodFilter(oldState =>
                  oldState === '5dias' ? '' : '5dias',
                );
              }}
            />
          </OrdemInput>

          <OrdemInput checked={periodFilter === '15dias'}>
            <label htmlFor="15dias">15 dias</label>
            <input
              type="checkbox"
              id="15dias"
              name="15dias"
              checked={periodFilter === '15dias'}
              onChange={() => {
                setPeriodFilter(oldState =>
                  oldState === '15dias' ? '' : '15dias',
                );
              }}
            />
          </OrdemInput>

          <OrdemInput checked={periodFilter === 'Mais15dias'}>
            <label htmlFor="Mais15dias">Mais de 15 dias</label>
            <input
              type="checkbox"
              id="Mais15dias"
              name="Mais15dias"
              checked={periodFilter === 'Mais15dias'}
              onChange={() => {
                setPeriodFilter(oldState =>
                  oldState === 'Mais15dias' ? '' : 'Mais15dias',
                );
              }}
            />
          </OrdemInput>
        </div>

        <ExibirFavorito onClick={() => setFavorito(!favorito)}>
          {favorito ? (
            <FaHeart size={20} color={LARANJA} />
          ) : (
            <FaRegHeart color={LARANJA} size={20} />
          )}
          <span>Exibir favoritos</span>
        </ExibirFavorito>
      </OrdemGroup>
    </Content>
  );
}
