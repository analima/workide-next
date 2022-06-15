import { useState } from 'react';
import { useEffect } from 'react';
import { ChangeEvent, Dispatch, SetStateAction, useCallback } from 'react';
import { FiEdit2 } from 'react-icons/fi';

import { arquivos_api } from '../../services/arquivos_api';
import { AZUL } from '../../styles/variaveis';

import { Container, ContentEdit } from './style';

export interface FileFormData {
  id?: string;
  url?: string;
}

interface FotoProps {
  id: string;
  idFoto?: string | number;
  urlFoto: string;
  setterId: Dispatch<SetStateAction<string>>;
  setterUrl: Dispatch<SetStateAction<string>>;
  isChangePhoto?: boolean;
  onChangePhoto?: (file: File) => void;
  fileToUpload?: File;
  uploadMode?: 'DEFAULT' | 'BY_FILE_TO_UPLOAD_CHANGE';
  edit?: boolean;
}

interface NewFile {
  name: string;
  lastModified: number;
  size: number;
  type: string;
}

const validTypes: Array<string> = ['image/jpg', 'image/jpeg', 'image/png'];

export function Foto({
  id,
  idFoto,
  urlFoto,
  setterId,
  setterUrl,
  isChangePhoto = false,
  onChangePhoto,
  fileToUpload,
  edit = false,
  uploadMode = 'DEFAULT',
}: FotoProps) {
  const [loadingFile, setLoadingFile] = useState(false);
  const [error, setError] = useState('');
  const [photoEditClass, setPhotoEditClass] = useState<string>('');

  useEffect(() => {
    if (idFoto) {
      arquivos_api.get(`/arquivos/${idFoto}`).then(response => {
        const { url } = response.data;
        setterUrl(url);
      });
    }
  }, [idFoto, setterUrl]);

  useEffect(() => {
    if (!isChangePhoto) setPhotoEditClass('overlay');
    else setPhotoEditClass('image');
  }, [isChangePhoto]);

  const clearError = () => {
    setError('');
  };

  const isAuthorizedType = (type: string): boolean => {
    return validTypes.includes(type);
  };

  const isInvalidType = (newFile: NewFile): boolean => {
    const { type } = newFile;
    if (isAuthorizedType(type)) {
      return false;
    }
    return true;
  };

  const handleUploadPhoto = useCallback(
    async (newFile: File) => {
      setLoadingFile(true);
      try {
        if (isInvalidType(newFile)) {
          setError('Aceitamos apenas os formatos: jpg, jpeg e png');
          return;
        }

        clearError();
        const data = new FormData();
        data.append('file', newFile);

        const response = await arquivos_api.post('/arquivos', data);

        const createdFile: FileFormData = response.data;
        setterId(createdFile.id || '');
        setterUrl(createdFile.url || '');
      } catch (err: any) {
        setError(err.response.data.error);
        if (err.response.data.message === 'Input image exceeds pixel limit')
          setError('A imagem excedeu o tamanho máximo');
      } finally {
        setLoadingFile(false);
      }
    },
    // eslint-disable-next-line
    [setterId, setterUrl],
  );

  const onChangeFile = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const newFile = event.target.files[0];
        if (uploadMode === 'DEFAULT') {
          handleUploadPhoto(newFile);
        }

        if (onChangePhoto) {
          onChangePhoto(newFile);
        }
      }
    },
    [handleUploadPhoto, onChangePhoto, uploadMode],
  );

  useEffect(() => {
    if (fileToUpload && uploadMode === 'BY_FILE_TO_UPLOAD_CHANGE') {
      handleUploadPhoto(fileToUpload);
    }
  }, [fileToUpload, handleUploadPhoto, uploadMode]);

  return (
    <>
      {!edit ? (
        <Container urlFoto={urlFoto} isChangePhoto={isChangePhoto}>
          <label htmlFor={id}>
            <div className={photoEditClass}>
              {!isChangePhoto && <span>Editar foto</span>}
              {edit && <FiEdit2 size={24} color={AZUL} />}
              <input
                id={id}
                name={id}
                type="file"
                onChange={onChangeFile}
                disabled={loadingFile || isChangePhoto}
              />
            </div>
          </label>
          {error && <div className="error-message">{error}</div>}
        </Container>
      ) : (
        <ContentEdit>
          <label htmlFor={id}>
            <div className={photoEditClass}>
              {edit && <FiEdit2 size={24} color={AZUL} />}
              <input
                id={id}
                name={id}
                type="file"
                onChange={onChangeFile}
                disabled={loadingFile || isChangePhoto}
              />
            </div>
          </label>
        </ContentEdit>
      )}
    </>
  );
}
