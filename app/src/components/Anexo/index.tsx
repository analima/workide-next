import { InputHTMLAttributes, useEffect, useState } from 'react';
import { Controller, FieldValues, UseFormSetValue } from 'react-hook-form';

import {
  Container,
  Label,
  ContainerIcone,
  LabelAnexo,
  ContainerAnexos,
} from './style';
import { BsPaperclip } from 'react-icons/bs';
import { AZUL, BRANCO } from '../../styles/variaveis';
import { ScrollContainer } from '../ScrollContainer';
import { FiX } from 'react-icons/fi';
import { oportunidades_api } from '../../services/oportunidades_api';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  label?: string;
  error?: string;
  setValue: UseFormSetValue<FieldValues>;
  getValues?: (files: any) => void;
  onDeleteValues?: (value: string[]) => void;
  value?: any;
  id_proposta?: number;
}

export function Anexo({
  name,
  control,
  label,
  error,
  setValue,
  getValues,
  value,
  id_proposta,
  onDeleteValues,
  ...rest
}: InputProps) {
  const [nomeAnexos, setNomeAnexos] = useState<string[]>([]);
  const [nomesArquivos, setNomesArquivos] = useState<string[]>([]);

  const [anexos, setAnexos] = useState<File[]>([]);

  function obtemNomesAnexos(e: any) {
    if (e.target.files.length > 0) {
      const nomes = [...e.target.files].map((arquivo: any) => {
        let formatandoNome = arquivo.name.slice(0, arquivo.name.indexOf('.'));
        const espacoVazio = formatandoNome.indexOf(' ');
        if (espacoVazio !== -1)
          formatandoNome = formatandoNome.slice(0, espacoVazio);
        return formatandoNome;
      });
      setNomeAnexos(nomes);
      setNomesArquivos(nomeAnexos.concat(nomesArquivos));
      return;
    }
  }

  useEffect(() => {
    if (value) {
      const nomes = [...value].map((arquivo: any) => arquivo);
      setNomesArquivos(nomeAnexos.concat(nomes));
    }
  }, [nomeAnexos, value]);

  useEffect(() => {
    if (getValues) {
      getValues(anexos);
    }
  }, [getValues, anexos]);

  function handleDeleteImg(e: any) {
    const arquivosAtuais = nomesArquivos.filter((nome: string) => nome !== e);
    setNomesArquivos(arquivosAtuais);

    if (!id_proposta) return;
    oportunidades_api.delete(`projetos/propostas/${id_proposta}/arquivos/${e}`);
    if (onDeleteValues) onDeleteValues(arquivosAtuais);
  }

  return (
    <Container isInvalid={!!error}>
      <div className="div-label">
        <Label htmlFor={name}>
          <ContainerIcone>
            <BsPaperclip color={BRANCO} />
          </ContainerIcone>
        </Label>

        <ScrollContainer height={300}>
          <ContainerAnexos>
            {nomesArquivos.length ? (
              nomesArquivos.map((nome, index) => (
                <LabelAnexo key={index}>
                  {nome}
                  <FiX color={AZUL} onClick={() => handleDeleteImg(nome)} />
                </LabelAnexo>
              ))
            ) : (
              <span>{label}</span>
            )}
          </ContainerAnexos>
        </ScrollContainer>

        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange } }) => (
            <input
              id={name}
              name={name}
              type="file"
              // value={value}
              multiple={false}
              onChange={e => {
                onChange(e);
                setValue(name, e.target.files);
                let files = [];
                for (let i = 0; i < (e.target.files?.length || 0); i += 1) {
                  files.push(e.target.files?.item(i));
                }
                setAnexos(files as File[]);
                obtemNomesAnexos(e);
              }}
              {...rest}
            />
          )}
        />
      </div>

      {error && <div className="error-message">{error}</div>}
    </Container>
  );
}
