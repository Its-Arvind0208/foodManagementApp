import React, { useContext, useState } from 'react'
import { useGlobalContext } from '../Context'

const Search = () => {
  const { setSearchTerm, fetchRandomMeal } = useGlobalContext()
  const [text, setText] = useState('')
  const handleChange = (e) => {
    setText(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (text) {
      setSearchTerm(text)
    }
  }

  const handleRandomMeal = () => {
    setSearchTerm('')
    setText('')
    fetchRandomMeal()
  }
  return (
    <>
      <header className='search-container'>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='type favourite meal' value={text} onChange={handleChange} className='form-input' />
          <button type='submit' className='btn'>Search</button>
          <button type='button' className='btn btn-hipster' onClick={handleRandomMeal}>Surprise me!</button>
        </form>
      </header>
    </>
  )
}

export default Search