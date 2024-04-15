// https://github.com/spine001/client-side-validation-of-file-type/blob/main/mimetype_in_the_client.mjs
// getFileMimeType
// @param {Object} the file object created by the input[type=file] DOM element.
// @return {Object} a Promise that resolves with the MIME type as argument or undefined
// if no MIME type matches were found.
export function isValidImageType(file: File): Promise<boolean> {
  // Making the function async.
  return new Promise((resolve) => {
    let fileReader = new FileReader();
    fileReader.onloadend = (event: ProgressEvent<FileReader>) => {
      if (
        event.target === null ||
        event.target.result === null ||
        typeof event.target.result === 'string'
      )
        return;
      const byteArray = new Uint8Array(event.target.result);

      // Checking if it's JPEG. For JPEG we need to check the first 2 bytes.
      // We can check further if more specific type is needed.
      if (byteArray[0] == 255 && byteArray[1] == 216) {
        return resolve(true);
      }

      // If it's not JPEG we can check for signature strings directly.
      // This is only the case when the bytes have a readable character.
      const td = new TextDecoder('utf-8');
      const headerString = td.decode(byteArray);

      // If a type matches we return the MIME type
      if (headerString.indexOf('PNG') > -1) {
        return resolve(true);
      }

      // If not is found we resolve with a false argument
      return resolve(false);
    };
    // Slice enough bytes to get readable strings.
    // I chose 32 arbitrarily. Note that some headers are offset by
    // a number of bytes.
    fileReader.readAsArrayBuffer(file.slice(0, 32));
  });
}

export async function getImageURI(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = function (ev) {
      if (ev.target === null) return rej('No result');
      res(ev.target.result as string);
    };
    reader.readAsDataURL(file);
  });
}
