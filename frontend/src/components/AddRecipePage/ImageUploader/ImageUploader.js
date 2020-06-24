import React, { useState } from 'react';

import { Preview } from './Preview/Preview';
import { resizeImage } from './ImageResizer/ImageResizer';


const ImageUploader = ({setImage}) => {
  const reader = new FileReader();
  const [previewImage, setPreviewImage] = useState(null);

  // Using 16:9 aspect ratio
  const maxHeight = 600;
  const maxWidth = (maxHeight / 9) * 16;

  const scaleImage = dataurl => {
    resizeImage(dataurl, maxHeight, maxWidth).then((data_url) => {
      // regular expression pulls the base64 and image type from the
      // data url to give to the back end
      const regex = /^data:(.+);base64,(.*)$/;
      const matches = data_url.match(regex)
      setImage(matches[2], matches[1])
      setPreviewImage(data_url)
    })
  }

  const style = {
    height: maxHeight,
    width: maxWidth,
    position: "absolute",
    border: "2px dashed lightgrey"
  }

  reader.onload = () => {
    // called after reader is done
    scaleImage(reader.result)
  }

  const onChange = (e) => {
    // checking file is an image type, and there is only 1
    if (e.target.files.length !== 1) return

    const file = e.target.files[0]

    if (!file.type.match(/image.*/)) return

    reader.readAsDataURL(file)
  }

  return (
    <div style={style}>
      <input accept="image/*" type="file" onChange={onChange}/>
      <Preview image={previewImage}/>
    </div>

  )
};

export default ImageUploader;

