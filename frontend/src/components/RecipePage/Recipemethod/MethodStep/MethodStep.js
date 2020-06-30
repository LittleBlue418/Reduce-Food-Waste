import React, {useState} from 'react'
import classes from './MethodStep.module.css'

const MethodStep = ({method_step}) => {
  const [clicked, toggleClicked] = useState (false)

  let stepClass

  if (clicked) {
    stepClass = classes.methodStepToggled
  } else {
    stepClass = classes.methodStep
  }

  return (
    <div className={stepClass}>
      <input type="checkbox"
        className={classes.checkbox}
        checked={clicked}
        onChange={() => toggleClicked(
          clicked => !clicked
        )}/>
      <div>{method_step}</div>
    </div>
  )
}

export default MethodStep