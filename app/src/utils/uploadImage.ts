export function dataURItoBlob(dataURI: string): Blob {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  const byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  const ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  const ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  const blob = new Blob([ab], { type: mimeString });
  return blob;
}

export function readUploadedFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // 1 - Create a FileReader instance
    const fr = new FileReader();
    // 2 - Add the listeners
    fr.onloadend = () => resolve(fr.result as string);
    fr.onerror = error => reject(error);
    // 3 - Start read process
    fr.readAsDataURL(file);
  });
}
