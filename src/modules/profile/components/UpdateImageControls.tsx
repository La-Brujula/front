import { IBackendProfile } from '@/shared/types/user';
import { CancelOutlined, SaveOutlined } from '@mui/icons-material';
import { Dispatch, useCallback, useMemo } from 'react';
import ImageField from './uploadImage';
import { useUploadProfileImage } from '../hooks/useUploadProfileImage';

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
    <div className="flex flex-row gap-4 justify-end">
      {currentPicture === props.imageUrl ? (
        <ImageField
          setImageUrl={props.setImageUrl}
          imageType={props.imageType}
        />
      ) : (
        <>
          <button
            onClick={resetInput}
            className="p-2 rounded-md bg-red-500 text-white"
          >
            <CancelOutlined />
          </button>
          <button
            onClick={uploadImage}
            className="p-2 rounded-md bg-green-500 text-white"
          >
            {isPending ? (
              <div className="size-4 border rounded-xl border-dashed border-white" />
            ) : (
              <SaveOutlined />
            )}
          </button>
        </>
      )}
    </div>
  );
}
