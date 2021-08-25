import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap/";
import "./BestBooks.css";
import BookForm from "./components/bookAddForm";
import UpdateBook from "./components/updateBook";
import { withAuth0 } from "@auth0/auth0-react";

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      books: [],
      showUpdateForm: false,
      selectedBook: {},
    };
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////

  componentDidMount = async () => {
    const { user, isAuthenticated } = this.props.auth0;

    await this.setState({
      email: user.email,
    });

    let url = `${process.env.REACT_APP_DATABASE}/books?email=${this.state.email}`;

    console.log(url);
    let booksData = await axios.get(url); // http://localhost:4000/books

    this.setState({
      books: booksData.data,
    });

    // console.dir(booksData.data[0].title);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////

  sendBook = async (event) => {
    event.preventDefault();

    console.log("sendBook is runnig");
    let title = event.target.title.value;

    let description = event.target.description.value;

    let bookDataObj = {
      email: this.state.email,
      title,
      description,
    };
    console.log("sendBook before resdata");
    console.log(process.env.REACT_APP_DATABASE, "this link");
    let resData = await axios.post(
      `${process.env.REACT_APP_DATABASE}/addbook`,
      bookDataObj
    );

    await this.setState({
      books: resData.data,
    });

    console.log("sendBook finished runnig");
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////

  deleteBook = async (bookID) => {
    let resData = await axios.delete(
      `${process.env.REACT_APP_DATABASE}/deletebook/${bookID}?email=${this.state.email}`
    );

    this.setState({
      books: resData.data,
    });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  updateBookButton = async (bookID) => {
    await this.setState({
      showUpdateForm: false,
    });

    let pressedBook = this.state.books.find((book) => {
      return book._id === bookID;
    });

    this.setState({
      selectedBook: pressedBook,
      showUpdateForm: true,
    });
  };

  updateBook = async (e) => {
    e.preventDefault();
    let bookData = {
      title: e.target.title.value,
      description: e.target.description.value,
      email: this.state.email,
    };

    let bookID = this.state.selectedBook._id;
    let booksData = await axios.put(
      `${process.env.REACT_APP_DATABASE}/updateBook/${bookID}`,
      bookData
    );
    this.setState({
      books: booksData.data,
    });
  };

  handleClose = () => {
    this.setState({
      showUpdateForm: false,
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  render() {
    return (
      <>
        <BookForm sendBook={this.sendBook} />

        <div className="tab2">
          <ul>
            {this.state.books.length !== 0 ? (
              this.state.books.map((item, i) => {
                return (
                  <li key={i}>
                    <h4> {item.title}</h4>
                    <p>{item.description}</p>
                    <Button
                      variant="danger"
                      onClick={() => this.deleteBook(item._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => this.updateBookButton(item._id)}
                    >
                      Update
                    </Button>
                  </li>
                );
              })
            ) : (
              <p>No Books added yet</p>
            )}

            <Modal show={this.state.showUpdateForm} onHide={this.handleClose}>
              <Modal.Title>Update Book Info</Modal.Title>
              <UpdateBook
                bookInfo={this.state.selectedBook}
                updateBook={this.updateBook}
              />
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal>
         
          </ul>
        </div>
      </>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
