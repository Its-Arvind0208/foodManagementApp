import React, { useState } from 'react'
import { useGlobalContext } from '../Context'

const Models = () => {
  const { selectedMeal, closeModel } = useGlobalContext()
  console.log(selectedMeal);
  const { strMeal: title, strMealThumb: image, strInstructions: text, strSource: source } = selectedMeal

  return (
    <>
      <aside className='modal-overlay'>
        <div className='modal-container'>
          <img src={image} alt={title} className='img modal-img' />
          <div className='modal-content'>
            <h4>{title}</h4>
            <p>Cooking Instructions</p>
            <p>{text}</p>
            <a href={source} target='_blank'>Original Source</a>
            <button onClick={closeModel} className='btn btn-hipster close-btn'>close</button>
          </div>
        </div>
      </aside>

    </>
  )
}

export default Models