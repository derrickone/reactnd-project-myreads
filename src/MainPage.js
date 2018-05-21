import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class MainPage extends Component {

	static propTypes = {
        books: PropTypes.array.isRequired,
        onBookUpdate: PropTypes.func.isRequired,
    }    

    render() {

        const { books, onBookUpdate } = this.props
        const currentReadShelf = books.filter(a => a.shelf==="currentlyReading")
        const wantToReadShelf = books.filter(b => b.shelf==="wantToRead")
        const readShelf = books.filter(c => c.shelf==="read")

        return (
            <div className="list-books">
                <div className="list-books-title">
                <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                <div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {
                            currentReadShelf.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                        <select onChange={(e) => onBookUpdate(book, e.target.value)} value = {book.shelf} >
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
                        </ol>
                    </div>
                    </div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {
                            wantToReadShelf.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                        <select onChange={(e) => onBookUpdate(book, e.target.value)} value = {book.shelf} >
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
                        </ol>
                    </div>
                    </div>
                    <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                        {
                            readShelf.map((book) => (
                                <li key={book.id}>
                                    <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                        <select onChange={(e) => onBookUpdate(book, e.target.value)} value = {book.shelf} >
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
                        </ol>
                    </div>
                    </div>
                </div>
                </div>
                <div className="open-search">
                    <Link
                        to = '/search'
                        className='open-search'
                    >Add a book </Link>
                </div>
            </div>
        )
    }
}
export default MainPage