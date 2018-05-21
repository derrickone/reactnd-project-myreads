import React from 'react'
import './App.css'
import SearchPage from './SearchPage'
import MainPage from './MainPage'
import * as BooksAPI from './BooksAPI'
import { Route} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf = (newBook, newShelf) => {
    BooksAPI.update(newBook, newShelf).then(books => {
      newBook.shelf = newShelf;
      let updatedBooks = this.state.books.filter( book => book.id !== newBook.id )
      updatedBooks.push(newBook);
      this.setState({ 
        books: updatedBooks 
      })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MainPage
            books={this.state.books}
            onBookUpdate = {this.updateShelf}
          />
        )} />
        <Route path='/search' render={( { history }) => (
          <SearchPage
            onBookUpdate = {this.updateShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
