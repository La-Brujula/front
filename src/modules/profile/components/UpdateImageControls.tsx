import { Dispatch, useCallback, useMemo } from 'react';

import { RotateCcwIcon, SaveIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { IBackendProfile } from '@/shared/types/user';

import { useUploadProfileImage } from '../hooks/useUploadProfileImage';
import ImageField from './uploadImage';

export function UpdateImageControls(props: {
  user: IBackendProfile;
  imageUrl: string;
  setImageUrl: Dispatch<string>;
  imageType: 'profile' | 'cover';
}) {
  const currentPicture = useMemo(
    () =>
      (props.imageType === 'cover'
        ? props.user.headerPictureUrl
        : props.user.profilePictureUrl) || '',
    [props.user]
  );
  const { mutate: upload, isPending } = useUploadProfileImage();
  const resetInput = useCallback(
    () => props.setImageUrl(currentPicture),
    [props.user]
  );
  const uploadImage = useCallback(async () => {
    await fetch(props.imageUrl)
      .then((r) => r.blob())
      .then(
        (blobFile) =>
          new File([blobFile], props.imageType, { type: blobFile.type })
      )
      .then((imageFile) =>
        upload(
          { imageFile, imageType: props.imageType },
          {
            onSuccess: (res) => {
              props.setImageUrl(
                props.imageType === 'cover'
                  ? res.entity.headerPictureUrl!
                  : res.entity.profilePictureUrl!
              );
            },
          }
        )
      );
  }, [upload, props]);

  return (
    <div className="flex flex-row justify-end gap-4">
      {currentPicture === props.imageUrl ? (
        <ImageField
          setImageUrl={props.setImageUrl}
          imageType={props.imageType}
        />
      ) : (
        <>
          <Button
            size="icon"
            onClick={resetInput}
            className="rounded-md bg-red-500 p-2 text-white"
          >
            <RotateCcwIcon />
          </Button>
          <Button
            size="icon"
            onClick={uploadImage}
            className="rounded-md bg-green-500 p-2 text-white"
          >
            {isPending ? (
              <div className="size-4 rounded-xl border border-dashed border-white" />
            ) : (
              <SaveIcon />
            )}
          </Button>
        </>
      )}
    </div>
  );
}
