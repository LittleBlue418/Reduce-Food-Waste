export const resizeImage = (dataurl, max_height, max_width) => {

  // Using a promise to allow time for image to load
  const promise = new Promise((resolve, reject) => {

    // create new image instance to hold data that will load
    const img = new Image();

    // Called automatically once the image has loaded
    // Calculates the scaled dimensions
    img.onload = () => {
      const [scaledHeight, scaledWidth] = scaleDimensions(
        // Array destructuring ^
        img.height,
        img.width,
        max_height,
        max_width
      );

      // Scale the image by drawing it on a canvas element

      const canvas = document.createElement("canvas");
      canvas.height = scaledHeight;
      canvas.width = scaledWidth;
      const context = canvas.getContext("2d");
      context.drawImage(img, 0, 0, scaledWidth, scaledHeight);
      // using the scaled width & height from scaleDimensions func

      // resolving promise now everything has resized & loaded
      // Converting canvas to a dataURL
      resolve(canvas.toDataURL("image/png"));
    };


    // Loading the image data into the image instance we create
    img.src = dataurl;
  });

  return promise;
};


const scaleDimensions = (height, width, max_height, max_width) => {
  // Calculate ratio, keeps the image within the limits but not stretched
  const scaleFactor = Math.max(height / max_height, width / max_width);

  // In case of small image file
  if (scaleFactor < 1){
    return [height, width]
  }

  // Scaling the height and width
  const scaledHeight = height / scaleFactor;
  const scaledWidth = width / scaleFactor;
  return [scaledHeight, scaledWidth];
};