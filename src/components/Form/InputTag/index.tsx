import { useState, useEffect, InputHTMLAttributes } from 'react';
import { FaPlus } from 'react-icons/fa';

import { geral_api } from '../../../services/geral_api';

// eslint-disable-next-line
import { AutocompleteList, Button, Container, Input, Tags } from './style';
import { useLimitacoesPlanos } from '../../../contexts/planLimitations';
import { AvatarRegrasPlano } from '../../AvatarRegrasPlano';

interface TagInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  value: string;
  setter: any;
  error?: string;
  validate?: boolean;
  readonly?: boolean;
  totalItens?: number;
  habilidades?: any[];
}

interface IHabilidade {
  habilidades: string;
  id: number;
}

export function InputTag({
  label,
  name,
  value,
  setter,
  error,
  validate = false,
  readOnly,
  totalItens = 0,
  habilidades,
}: TagInputProps) {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [validationError, setValidationError] = useState(error);
  const [showAutocompleteList, setShowAutocompleteList] = useState(false);
  const [showAvatarRegrasPlano, setShowAvatarRegrasPlano] = useState(false);

  const [habilidadesTecnicas, setHabilidadesTecnicas] = useState<
    Array<IHabilidade>
  >([] as Array<IHabilidade>);
  const [habilidadesTecnicasFiltradas, setHabilidadesTecnicasFiltradas] =
    useState<Array<IHabilidade>>([] as Array<IHabilidade>);
  const [habilidadesComportamentais, setHabilidadesComportamentais] = useState<
    Array<IHabilidade>
  >([] as Array<IHabilidade>);
  const [
    habilidadesComportamentaisFiltradas,
    setHabilidadesComportamentaisFiltradas,
  ] = useState<Array<IHabilidade>>([] as Array<IHabilidade>);

  function handleShowAvatarRegrasPlano() {
    setShowAvatarRegrasPlano(!showAvatarRegrasPlano);
  }

  const { limitacoesPlano, buscarLimitacoes } = useLimitacoesPlanos();

  useEffect(() => {
    async function getHabilidadesTecnicas() {
      try {
        const response = await geral_api.get('habilidades-tecnicas');
        setHabilidadesTecnicas(response.data);
        setHabilidadesTecnicasFiltradas(response.data);
      } catch (error) {}
    }
    async function getHabilidadesComportamentais() {
      try {
        const response = await geral_api.get('habilidades-comportamentais');
        setHabilidadesComportamentais(response.data);
        setHabilidadesComportamentaisFiltradas(response.data);
      } catch (error) {}
    }
    getHabilidadesTecnicas();
    getHabilidadesComportamentais();
    buscarLimitacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let value2: any = value;
    if (typeof value2 === 'object') {
      let habilidades: any = value;
      value2 = habilidades?.join('|');
    }
    if (value2 && value2.trim().length > 0) {
      const valueItems = value2.trim().split('|');
      setItems(valueItems);
    }
  }, [value]);

  useEffect(() => {
    if (habilidades) {
      setItems(habilidades);
    }
  }, [habilidades]);

  const handleAddItem = () => {
    setValidationError('');

    if (!newItem || newItem.trim().length === 0) {
      return;
    }

    if (items.length >= limitacoesPlano.habilidadesECompetencias) {
      return;
    }
    if (validate) {
      if (totalItens >= limitacoesPlano.habilidadesECompetencias) {
        setValidationError('Você atingiu o limite para seu plano');
        handleShowAvatarRegrasPlano();
        return;
      }
    }

    const itemAlreadyExists = items.find(i => i === newItem);
    if (itemAlreadyExists) {
      setNewItem('');
      return;
    }

    const newItemValue = newItem.trim();
    const itemsContent = [...items, newItemValue];
    const valueContent = itemsContent.join('|');

    setItems(itemsContent);
    setter(valueContent);
    setNewItem('');

    const tagInputElement = document.getElementById(`tag-input-${name}`);
    tagInputElement?.scroll(tagInputElement.offsetWidth, 0);
    setHabilidadesTecnicasFiltradas(habilidadesTecnicas);
    setHabilidadesComportamentaisFiltradas(habilidadesComportamentais);
  };

  const handleRemoveItem = (item: string) => {
    if (readOnly) return;
    setValidationError('');
    const updateItems = items.filter(i => i !== item);
    const updatedValue = updateItems.join('|');

    setItems(updateItems);
    setter(updatedValue);
    setHabilidadesTecnicasFiltradas(habilidadesTecnicas);
    setHabilidadesComportamentaisFiltradas(habilidadesComportamentais);
  };

  const handleChangeItem = (item: string, labelHandle?: string): void => {
    if (labelHandle?.includes('técnicas')) {
      const habilidadesTec = habilidadesTecnicas.filter(hab => {
        if (hab.habilidades.toLowerCase().indexOf(item.toLowerCase()) !== -1)
          return true;
        else return false;
      });
      setHabilidadesTecnicasFiltradas(habilidadesTec);
    } else if (labelHandle?.includes('comportamentais')) {
      const habilidadesCom = habilidadesComportamentais.filter(hab => {
        if (hab.habilidades.toLowerCase().indexOf(item.toLowerCase()) !== -1)
          return true;
        else return false;
      });
      setHabilidadesComportamentaisFiltradas(habilidadesCom);
    }
  };

  return (
    <Container>
      <AvatarRegrasPlano
        mostrar={showAvatarRegrasPlano}
        esconderAvatar={handleShowAvatarRegrasPlano}
        premium={limitacoesPlano.idPlano === 4}
      />
      <Input disable={readOnly}>
        <label htmlFor={name}>{label}</label>
        <div className="container-input">
          <div className="container-autocomplete">
            <input
              id={name}
              name={name}
              value={newItem}
              onChange={event => {
                value = event.target.value;
                value = value.replace(/[^a-zA-Zà-ù ]/g, '');
                setNewItem(value);
                handleChangeItem(value, label);
              }}
              autoComplete="off"
              readOnly={readOnly}
              onFocus={() => setShowAutocompleteList(true)}
              onBlur={() =>
                setTimeout(() => {
                  setShowAutocompleteList(false);
                }, 200)
              }
              onKeyUp={(e: any) => {
                if (e.keyCode === 13) {
                  handleAddItem();
                }
              }}
            />
            {showAutocompleteList && (
              <AutocompleteList>
                {label?.includes('técnicas') &&
                  habilidadesTecnicasFiltradas.map(obj => (
                    <li
                      key={obj.id}
                      onClick={() => {
                        setNewItem(obj.habilidades);
                      }}
                    >
                      {obj.habilidades}
                    </li>
                  ))}
                {label?.includes('comportamentais') &&
                  habilidadesComportamentaisFiltradas.map(obj => (
                    <li
                      key={obj.id}
                      onClick={() => {
                        setNewItem(obj.habilidades);
                      }}
                    >
                      {obj.habilidades}
                    </li>
                  ))}
              </AutocompleteList>
            )}
          </div>
          <Button onClick={() => handleAddItem()}>
            <FaPlus />
          </Button>
        </div>
      </Input>
      {validationError && (
        <div className="error-message">{validationError}</div>
      )}

      <Tags>
        <div id={`tag-input-${name}`}>
          {items.map((item, index) => (
            <span key={index}>
              {item}
              <span onClick={() => handleRemoveItem(item)}>x</span>
            </span>
          ))}
        </div>
      </Tags>
    </Container>
  );
}
