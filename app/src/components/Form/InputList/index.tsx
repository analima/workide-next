import { InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { FaPlus, FaTimesCircle } from 'react-icons/fa';

import { Form } from 'react-bootstrap';

import {
  Container,
  Label,
  Button,
  Values,
  Item,
  ItemLabel,
  ItemAction,
} from './style';
import { AZUL } from '../../../styles/variaveis';
import { ScrollContainer } from '../../ScrollContainer';

interface IInputList extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  label?: string;
  name: string;
  error?: string;
  placeholder?: string;
  readOnly?: boolean;
  maxLength?: number;
  setValue: any;
  color?: string;
  items: string[];
  labelIsBold?: boolean;
}

export function InputList({
  items,
  label,
  placeholder,
  name,
  control,
  error,
  required,
  readOnly,
  maxLength = 45,
  setValue,
  color = AZUL,
  labelIsBold,
}: IInputList) {
  const [itemList, setItemList] = useState<string>('');
  const [itemsList, setItemsList] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState(error);

  useEffect(() => {
    if (items?.length > 0) {
      setItemsList(items);
    }
  }, [items]);

  const handleDelete = useCallback(
    (itemToBeRemove: string) => {
      if (itemsList.length < 10) {
        setErrorMessage('');
      }
      try {
        let itemsControl = itemsList;

        if (itemsControl) {
          const list = itemsControl.filter(
            (item: string) => item !== itemToBeRemove,
          );
          setItemsList(list);
          setValue(list);
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    [itemsList, setValue],
  );

  const handleAdd = useCallback(() => {
    if (itemsList?.length === 10) {
      setErrorMessage('Limite de 10 itens atingido');
      return;
    }

    try {
      let list: string[] = [];

      if (!itemList) {
        return;
      }

      if (itemsList.includes(itemList)) {
        setErrorMessage('Item já adicionado.');
        return;
      }

      list.push(...itemsList, itemList);

      setErrorMessage('');
      setItemsList(list);
      setValue(list);
      setItemList('');
    } catch (error: any) {
      console.log('Error ', error);
    }
  }, [itemList, itemsList, setValue]);

  return (
    <Container isInvalid={!!error}>
      {label && (
        <Label htmlFor={name} required={required}>
          {labelIsBold ? <strong>{label}</strong> : label}
          {required && <span className="required"> *</span>}
        </Label>
      )}

      <div className="d-flex">
        <Form.Control
          id={`${name}-text`}
          name={`${name}-text`}
          maxLength={maxLength}
          type="text"
          placeholder={placeholder}
          value={itemList}
          onChange={e => {
            if (e.target.value.length <= maxLength) setItemList(e.target.value);
          }}
          readOnly={readOnly}
          onKeyUp={(e: any) => {
            if (e.keyCode === 13) {
              handleAdd();
            }
          }}
        />

        <Button color={color} onClick={() => handleAdd()}>
          <FaPlus />
        </Button>
      </div>

      <Controller
        name={name}
        control={control}
        render={({ field: { value } }) => (
          <Form.Control id={name} name={name} type="hidden" value={value} />
        )}
      />

      <ScrollContainer height={300}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <Values>
          {itemsList &&
            itemsList.map((item, index) => (
              <Item key={index}>
                <ItemLabel>{item}</ItemLabel>
                <ItemAction onClick={() => handleDelete(item)}>
                  <FaTimesCircle />
                </ItemAction>
              </Item>
            ))}
        </Values>
      </ScrollContainer>
    </Container>
  );
}
