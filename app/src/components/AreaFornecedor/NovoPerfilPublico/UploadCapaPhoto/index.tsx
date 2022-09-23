import { useCallback, useEffect, useState } from 'react';
import { Foto } from '../../../../components/Foto';
import ImageCrop from '../../../../components/ImageCrop';

interface IProps {
  fotoId: string;
  setFotoId: React.Dispatch<React.SetStateAction<string>>;
  fotoUrl: string;
  setFotoUrl: React.Dispatch<React.SetStateAction<string>>;
  handleSave: () => void;
}

export function UploadCapaPhoto({
  fotoId,
  setFotoId,
  fotoUrl,
  setFotoUrl,
  handleSave,
}: IProps) {
  const [fileToCrop, setFileToCrop] = useState<File | null>();
  const [showCropper, setShowCropper] = useState(false);
  const [photoCropped, setPhotoCropped] = useState<File | null>();

  const onChangeProfilePhoto = useCallback(
    async (file: File): Promise<void> => {
      setFileToCrop(file);
      setShowCropper(true);
    },
    [],
  );

  useEffect(() => {
    if (fotoId) handleSave();
  }, [fotoId, handleSave]);

  return (
    <>
      <Foto
        id="fotoPessoa"
        idFoto={fotoId}
        urlFoto={fotoUrl}
        setterId={setFotoId}
        setterUrl={setFotoUrl}
        onChangePhoto={onChangeProfilePhoto}
        fileToUpload={photoCropped as File}
        uploadMode="BY_FILE_TO_UPLOAD_CHANGE"
        edit={true}
      />

      <ImageCrop
        setShowCropper={setShowCropper}
        setFileToCrop={setFileToCrop}
        showCropper={showCropper}
        fileToCrop={fileToCrop as File}
        aspectRatio={4 / 1}
        onSave={(file, blob) => {
          setShowCropper(false);
          setFileToCrop(null);
          setPhotoCropped(file);
        }}
      />
    </>
  );
}
