import React, { useEffect, useState } from 'react';
import { defaultColors } from '../data/defaultColors';
import classes from './ColorsContainer.module.scss'
import { Colors } from '../App';

interface RemoveColorProps {
  onRemoveColor: (id: string) => void;
}

const ColorsContainer: React.FC<RemoveColorProps> = ({ onRemoveColor }) => {

  let colorsArrayLocalStorage = (JSON.parse(localStorage.getItem('enteredColors')!))

return (
  <div className={classes['colors']}>
    {colorsArrayLocalStorage && colorsArrayLocalStorage.map((item: Colors) => {
      return (
        <div key={item.id} className={classes['colors-container']}>
          <div className={classes['colors-container-item']} >
            {item.addedByUser && <button value={item.id} onClick={(event) => onRemoveColor(event.currentTarget.value)
            } className={classes['colors-container-item-button']}>X</button>}
            
          </div>
          <p className={classes['colors-container-item-name']}>{item.hexColor}</p>
        </div>
      )
    })}
  </div>
)
}

export default ColorsContainer