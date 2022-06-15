import React, { useState, useCallback, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import { getOrientation, Orientation } from 'get-orientation/browser';
import { getCroppedImg, getRotatedImage } from './canvasUtils';
import {
  SaveButton,
  ContainerButtons,
  CropContainer,
  CancelButton,
} from './styles';
import { Area } from 'react-easy-crop/types';

const ORIENTATION_TO_ANGLE = {
  [Orientation.TOP_LEFT]: -180,
  [Orientation.BOTTOM_RIGHT]: 180,
  [Orientation.RIGHT_TOP]: 90,
  [Orientation.LEFT_BOTTOM]: -90,
};

interface ImageCropProps {
  aspectRatio: number;
  saveLabel?: string;
  onSave?: (file: File, url?: string) => void;
  setShowCropper?: React.Dispatch<React.SetStateAction<boolean>>;
  setFileToCrop?: React.Dispatch<React.SetStateAction<File | null | undefined>>;
  showCropper: boolean;
  fileToCrop?: File;
}

const ImageCrop: React.FC<ImageCropProps> = ({
  aspectRatio,
  saveLabel = 'SALVAR',
  fileToCrop,
  showCropper,
  setShowCropper,
  setFileToCrop,
  onSave,
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [filename, setFilename] = useState('');
  const [filetype, setFiletype] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({} as Area);

  const onCropComplete = useCallback((croppedArea, newCroppedAreaPixels) => {
    setCroppedAreaPixels(newCroppedAreaPixels);
  }, []);

  const handleSave = useCallback(async () => {
    const { file, url } = await getCroppedImg(
      imageSrc,
      croppedAreaPixels,
      rotation,
      filename,
      filetype,
    );
    if (onSave) onSave(file, url);
    setImageSrc('');
  }, [imageSrc, croppedAreaPixels, rotation, filename, filetype, onSave]);

  const onFileChange = useCallback(
    async (file: File) => {
      if (!fileToCrop) {
        return;
      }

      let imageDataUrl = await readFile(file as File);

      // apply rotation if needed
      const orientation:
        | Orientation.TOP_LEFT
        | Orientation.BOTTOM_RIGHT
        | Orientation.RIGHT_TOP
        | Orientation.LEFT_BOTTOM = (await getOrientation(file)) as any;
      const newRotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, newRotation);
      }

      setImageSrc(imageDataUrl);
      setFilename(file.name);
      setFiletype(file.type);
    },
    [fileToCrop, rotation],
  );

  useEffect(() => {
    onFileChange(fileToCrop as File);
  }, [fileToCrop, onFileChange]);

  const handleCancel = useCallback(() => {
    setImageSrc('');
    if (setShowCropper) setShowCropper(false);
    if (setFileToCrop) setFileToCrop(null);
  }, [setShowCropper, setFileToCrop]);

  return (
    <>
      {showCropper && fileToCrop && (
        <CropContainer>
          <Cropper
            image={imageSrc}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <ContainerButtons>
            <SaveButton onClick={handleSave}>
              {saveLabel.toLocaleUpperCase()}
            </SaveButton>
            <CancelButton onClick={handleCancel}>CANCELAR</CancelButton>
          </ContainerButtons>
        </CropContainer>
      )}
    </>
  );
};

function readFile(file: File): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => resolve(String(reader.result)),
      false,
    );
    reader.readAsDataURL(file);
  });
}

export default ImageCrop;
