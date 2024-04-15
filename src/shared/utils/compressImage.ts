import Compressor from 'compressorjs';

export async function compress(
  file: File,
  quality: number,
  maxHeight: number,
  maxWidth: number,
  convertSize?: number
): Promise<File | Blob> {
  return await new Promise((resolve, reject) => {
    new Compressor(file, {
      quality,
      maxHeight,
      maxWidth,
      convertSize,
      success: resolve,
      error: reject,
      convertTypes: 'image/jpeg',
      resize: 'cover',
    });
  });
}
