import { Content, CardFiltro } from './style';
import { Col, Row } from 'react-bootstrap';
import { useCaptarProjetoFornecedor } from '../../../../hooks/captarProjetoFornecedor';
import { useCallback } from 'react';
import FiltroSubarea, {
  Subarea,
} from 'src/components/AreaConsumidor/Busca/NovoFiltro/FiltroSubarea';

export default function NovoFiltro() {
  const { control, setValue, obterProjetos } = useCaptarProjetoFornecedor();

  const handleChangeSubareas = useCallback(
    (selAreas: Subarea[]) => {
      setValue(
        'subareas',
        selAreas.map(sa => sa.descricao),
      );
      obterProjetos();
    },
    [obterProjetos, setValue],
  );

  return (
    <Content>
      <CardFiltro>
        <FiltroSubarea
          control={control}
          onChange={handleChangeSubareas}
          page="captar"
        />
      </CardFiltro>
    </Content>
  );
}
