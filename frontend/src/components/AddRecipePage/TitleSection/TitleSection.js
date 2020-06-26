import React from 'react';
import classes from './TitleSection.module.css';

import TextField from '@material-ui/core/TextField';

const TitleSection = ({ nameValue, descriptionValue, setName, setDescription }) => {
  return (
    <div className={classes.TitleDiv}>
        <h3>Title &amp; Info</h3>
        <TextField
          label="Recipe Name"
          fullWidth
          value={nameValue}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Brief Description"
          fullWidth
          multiline
          value={descriptionValue}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
  );
};

export default TitleSection;