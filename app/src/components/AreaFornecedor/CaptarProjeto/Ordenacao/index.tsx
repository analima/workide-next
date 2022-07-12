import { Col, Row } from 'react-bootstrap';
import { useCaptarProjetoFornecedor } from '../../../../hooks/captarProjetoFornecedor';
import {
  Label,
  OrdemGroup,
  OrdemInput,
  FiltrosAplicados,
  ContentFilter,
  Button,
} from './style';
import Content from './style';
import { useEffect, useState } from 'react';
import { formatarValor } from '../../../../utils/CurrencyFormat';
import { subDays } from 'date-fns';

export default function Ordenacao() {
  const {
    setValue,
    watch,
    obterProjetos,
    filtrosAplicados,
    limparFiltros,
    causas,
  } = useCaptarProjetoFornecedor();
  const [periodFilter, setPeriodFilter] = useState('');
  const subareas = watch('subareas');
  const habilidades = watch('habilidades');
  const favorito = watch('favorito');

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
      await obterProjetos();
    };

    handleConditionalsForGetProjectByDate();
  }, [obterProjetos, periodFilter, setValue]);

  return (
    <Content>
      <Row>
        <Col lg={9} className="d-flex align-items-center">
          {!favorito && (
            <OrdemGroup>
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
            </OrdemGroup>
          )}
        </Col>
      </Row>

      <Row>
        <Col lg={12}>
          <ContentFilter>
            <p>Filtros aplicados: </p>
            <Button
              onClick={() => {
                limparFiltros();
                setPeriodFilter('');
              }}
            >
              LIMPAR FILTROS
            </Button>
          </ContentFilter>
          <FiltrosAplicados>
            {!!causas && (
              <>
                {causas.map((filtro: any) => (
                  <Label key={filtro.id}>{filtro.causasSociais}</Label>
                ))}
              </>
            )}

            {subareas?.length > 0 && (
              <>
                {subareas?.map((subarea: any) => (
                  <Label key={subarea.id}>{subarea}</Label>
                ))}
              </>
            )}

            {habilidades?.length > 0 && (
              <>
                {habilidades?.map((hab: any) => (
                  <Label key={hab.id}>{hab}</Label>
                ))}
              </>
            )}

            {filtrosAplicados.niveis_experiencia?.length > 0 && (
              <>
                {filtrosAplicados.niveis_experiencia?.map((niv: any) => (
                  <Label key={niv.id}>
                    {niv === 'BASICO' ? 'INICIANTE' : niv}
                  </Label>
                ))}
              </>
            )}

            {filtrosAplicados?.preco_minimo && (
              <Label>
                Valor mínimo:{' '}
                {formatarValor(Number(filtrosAplicados.preco_minimo))}
              </Label>
            )}

            {filtrosAplicados?.preco_maximo && (
              <Label>
                Valor maximo:{' '}
                {formatarValor(Number(filtrosAplicados.preco_maximo))}
              </Label>
            )}

            {filtrosAplicados?.avaliacao_consumidor && (
              <Label>{filtrosAplicados.avaliacao_consumidor} estrelas</Label>
            )}

            {filtrosAplicados?.escopo && (
              <Label>Escopo: {filtrosAplicados.escopo}</Label>
            )}
          </FiltrosAplicados>
        </Col>
      </Row>
    </Content>
  );
}
