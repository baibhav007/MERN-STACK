/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useBooksContext } from '../hooks/useBooksContext'

const bookForm = () => {
  const { dispatch } = useBooksContext()
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const book = {title, quantity, category}
    
    const response = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setQuantity('')
      setCategory('')
      dispatch({type: 'CREATE_BOOKS', payload: json})    }

  }

  return(
    <form className="create" onSubmit={handleSubmit}>
    <h3>Add a new Book</h3>
    <label>Book Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
    
      <label>Book Quantity:</label>
      <input 
        type="number" 
        onChange={(e) => setQuantity(e.target.value)} 
        value={quantity}
        className={emptyFields.includes('quantity') ? 'error' : ''}
      />
      <label>Book Category</label>
      <input 
        type="text" 
        onChange={(e) => setCategory(e.target.value)} 
        value={category}
        className={emptyFields.includes('category') ? 'error' : ''}
      />
      <button>Add Book</button>
      {error && <div className="error">{error}</div>}
      

    </form>
  )
};
export default bookForm
