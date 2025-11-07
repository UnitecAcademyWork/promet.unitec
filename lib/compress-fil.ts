// utils/compressFile.ts
export async function compressFile(file: File): Promise<File> {
  if (file.type.startsWith("image/")) {
    return await compressImage(file); // Compressão de imagem
  }
  // No futuro: compressPDF(file)
  return file;
}

async function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 1000; // controla o tamanho máximo da imagem
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height = (MAX_WIDTH / width) * height;
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          resolve(
            new File([blob!], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            })
          );
        },
        "image/jpeg",
        0.4 // Qualidade 40% => reduz cerca de 70 a 90%
      );
    };
  });
}
