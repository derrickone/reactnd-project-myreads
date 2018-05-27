import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import noThumbnail from './icons/image_not_found.jpg'

class SearchPage extends Component {

	static propTypes = {
        books: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired,
    }    

    state = {
        query: '',
        searchedBooks: [],
        searchError: false
    }
    
    findBookInMySelf = (book) => {
        const foundBook = this.props.books.find(b => b.id === book.id);
        return foundBook ? foundBook.shelf : 'none'
    }
    
    searchBooks = (query) => {
        this.setState(() => ({
            query: query
          }))
  
        if (query){
            BooksAPI.search(query, 20).then((books) => {
                books.length > 0 ? this.setState({ searchedBooks: books }) 
                : this.setState({searchedBooks: [], searchError: true})
            })      
        } else {
            this.setState({searchedBooks: [], searchError: true})
        }   
    }

    render() {
        const { query, searchedBooks, searchError } = this.state
        const { books, onBookUpdate } = this.props 

        return (
            <div className="search-books">
                <div className="search-books-bar">
                {                                     
                    <Link to = '/'>
                    <div className="close-search">Close</div>
                    </Link>                    
                }
                <div className="search-books-input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(event) => this.searchBooks(event.target.value)}
                    />
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            searchedBooks.map((book) => (    
                                <li key={book.id}>
                                    <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noThumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                        <select onChange={(e) => onBookUpdate(book, e.target.value.trim())} value = {this.findBookInMySelf(book)} >
                                            <option value="move" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read" >Read</option>
                                            <option value="none">None</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                    </div>
                                </li>
                            ))                   
                        }
                        {
                            searchError && (
                                <div>
                                    <div>
                                        <h4>Your search returned 0 books. Please try search for a different book!</h4>
                                    </div>
                                </div>
                            )
                        }
                    </ol>
                    </div>
                </div>
                </div>
                <div className="search-books-results">
                <ol className="books-grid"></ol>
                </div>
            </div>
        )
    }
}
export default SearchPage