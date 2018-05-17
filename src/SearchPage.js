import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SearchPage extends Component {

	static propTypes = {
        books: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired,
    }    

    state = {
        query: ''
    }
    
    updateQuery = (query) => {
        this.setState(() => ({
          query: query
        }))
    }
    
    clearQuery = () => {
        this.updateQuery('')
    }

    render() {
        const { query } = this.state
        const { books, onBookUpdate } = this.props

		const showingBooks = query === ''
		? books
		: books.filter((c) => (
			c.title.toLowerCase().includes(query.toLowerCase())
		))        

        return (
            <div className="search-books">
                <div className="search-books-bar">
                {                 
                    <div className="close-search">
                        <Link
                            to = '/'                        
                        >Close 
                        </Link>
                    </div>
                }
                <div className="search-books-input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */

                        showingBooks.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    <div className="book-shelf-changer">
                                    <select onChange={(e) => onBookUpdate(book, e.target.value)} value = {book.shelf} >
                                        <option value="none" disabled>Move to...</option>
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