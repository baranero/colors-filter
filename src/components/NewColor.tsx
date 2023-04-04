import React, { useEffect, useState } from 'react'
import classes from './NewColor.module.scss'

const NewColor = () => {


  interface UserEnteredColor {
    color: string;
    addedByUser: boolean
  }

  const defaultValues = {
    color: '',
    addedByUser: true
  }

  const [enteredColor, setEnteredColor] = useState<UserEnteredColor>(defaultValues)

  let inputValueisIncorrect: boolean = enteredColor.color.includes('#', 1)

  const colorChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (inputValueisIncorrect) {
      setEnteredColor({
        color: enteredColor.color.slice(0, -1),
        addedByUser: true
      })
    } else {
      setEnteredColor({
        color: event.target.value,
        addedByUser: true
      })
    }
  }

  useEffect(() => {
    if (localStorage.getItem('enteredColor') !== null) {
      document.documentElement.style.setProperty("--color-user", JSON.parse(localStorage.getItem('enteredColor') || "").color)
    }
  }, [enteredColor])
 
  const submitHandler = (event: React.FormEvent): void => {
    event.preventDefault()
    localStorage.setItem("enteredColor", JSON.stringify(enteredColor))
    document.documentElement.style.setProperty("--color-user", JSON.parse(localStorage.getItem('enteredColor') || "").color);
    setEnteredColor(defaultValues)
  }

  return (
    <form onSubmit={submitHandler} className={classes['color-form']} >
      <label htmlFor='color' className={classes['color-form-label']} >Color:</label>
      <input
        className={classes[inputValueisIncorrect ? 'color-form-input-wrong' : 'color-form-input']}
        id='color'
        type='text'
        value={enteredColor.color}
        onChange={colorChangeHandler}
        placeholder='Input color in HEX format (eg. #3F3F3F)'
        maxLength={7}
      />
      {!inputValueisIncorrect ? '' : <p className={classes['color-form-warning']} >You can use # sign only as first</p>}
      <button
      className={classes['color-form-button']} type='submit'>Submit</button>
    </form>
  )
}

export default NewColor