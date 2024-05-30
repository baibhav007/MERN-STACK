/* eslint-disable react-hooks/rules-of-hooks */
import { useBooksContext } from "../hooks/useBooksContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
const bookDetails = ({ book }) => {
  const { dispatch } = useBooksContext()

  const handleClick = async () => {
    const response = await fetch('/api/books/' + book._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_BOOK', payload: json})
    }
  }
    return (
      <div className="book-details">
        <h4>{book.title}</h4>
        <p><strong>Quantity :- </strong>{book.quantity}</p>
        <p><strong>Category :-  </strong>{book.category}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      </div>
    )
  }
  
  export default bookDetails