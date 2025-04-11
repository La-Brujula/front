import { ChangeEvent, useCallback, useMemo, useRef } from 'react';

import { EditIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getImageURI, isValidImageType } from '@/shared/utils/fileTypeCheck';

function ImageField(props: {
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <label
              htmlFor={props.imageType}
              className="cursor-pointer rounded-md bg-primary p-2 text-white"
            >
              <EditIcon />
            </label>
          </TooltipTrigger>
          <TooltipContent>
            <p>{labelHover}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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

export default ImageField;
