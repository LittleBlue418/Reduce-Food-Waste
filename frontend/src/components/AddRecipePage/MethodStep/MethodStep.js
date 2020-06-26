import React from 'react';
import classes from './MethodStep.module.css'

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const MethodStep = ({ index, step, updateMethodStep, removeMethodStep }) => {
  return (
    <div
      className={classes.MethodStepDiv}
      key={"method" + index}
    >
      <TextField
        fullWidth
        multiline
        label={"Method Step " + index}
        value={step}
        onChange={(e) => updateMethodStep(e.target.value, index)}
      />
      <IconButton aria-label="delete" onClick={() => removeMethodStep(index)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default MethodStep;