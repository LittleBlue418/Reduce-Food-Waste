import React from 'react';


const ImageUploader = ({setImage}) => {
  const reader = new FileReader();
  reader.onload = () => {
    setImage(window.btoa(reader.result))
  }

  const onChange = (e) => {
    if (e.target.files.length !== 1) return

    const file = e.target.files[0]

    if (!file.type.match(/image.*/)) return

    reader.readAsBinaryString(file)
  }

  return <input accept="image/*" type="file" onChange={onChange}/>
};

export default ImageUploader;