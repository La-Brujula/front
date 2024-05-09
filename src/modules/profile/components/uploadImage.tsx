import { getImageURI, isValidImageType } from '@/shared/utils/fileTypeCheck';
import { EditOutlined } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function UploadImage(props: {
  setImageUrl: (imageUrl: string) => void;
  imageType: 'profile' | 'cover';
}) {
  const { t } = useTranslation('profile');
  const ref = useRef<HTMLInputElement>(null);
  const buildImagePreview = useCallback(
    async (ev: ChangeEvent<HTMLInputElement>) => {
      const file = ev.currentTarget.files![0];
      if (!(await isValidImageType(file))) {
        throw Error('Not a valid image');
      }
      const imageUri = await getImageURI(file);
      props.setImageUrl(imageUri);
    },
    [props.setImageUrl]
  );

  const labelHover = useMemo(() => {
    if (props.imageType === 'cover') return t('Editar foto de fondo');
    return t('Editar foto de perfil');
  }, [props.imageType]);
  return (
    <>
      <label
        htmlFor={props.imageType}
        className="bg-primary p-2 rounded-md text-white cursor-pointer"
      >
        <Tooltip title={labelHover}>
          <EditOutlined />
        </Tooltip>
      </label>
      <input
        id={props.imageType}
        type="file"
        ref={ref}
        accept="image/*"
        onChange={buildImagePreview}
        className="hidden"
      />
    </>
  );
}

export default UploadImage;
