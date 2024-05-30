/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useBooksContext } from "../hooks/useBooksContext";

import bookDetails from '../components/bookDetails'

import bookForm from "../components/bookForm"; // Using bookDetails to satisfy ESLint
const BookDetailsComponent = bookDetails;

const BookFormComponent = bookForm;


const Home = () => {
  const { books, dispatch } = useBooksContext()

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('/api/books')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_BOOKS', payload: json})
      }
    }

    fetchBooks()
  }, [dispatch])
    return (
      <div className="home">
      <div className="books">
      {books && books.map(book => (
      <BookDetailsComponent key={book._id}book={book}/>
      ))}
    </div>
    <BookFormComponent/>
      </div>
    )
  }
  
  export default Home