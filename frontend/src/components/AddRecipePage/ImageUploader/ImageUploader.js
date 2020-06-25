import React from 'react';
import classes from './ImageUploader.module.css'

import { Preview } from './Preview/Preview';
import { resizeImage } from './ImageResizer/ImageResizer';

import PublishIcon from "@material-ui/icons/Publish";


const ImageUploader = ({ setImage, previewImage, setPreviewImage }) => {
  const reader = new FileReader();

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

  const inputRef = React.createRef();

  return (
    <div
      className={classes.PreviewDiv}
      onClick={() => inputRef.current.click()}
    >
      <PublishIcon />
      <input
        accept="image/*"
        type="file"
        ref={inputRef}
        onChange={onChange}
      />
      <Preview image={previewImage}/>

    </div>

  )
};

export default ImageUploader;

