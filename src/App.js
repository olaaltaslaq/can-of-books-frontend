import React from "react";
import Header from "./Header";
import Login from "./Login";
import Footer from "./Footer";
import Profile from "./profile";
import BestBooks from './BestBooks';
import { withAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBooksComponent: false,
      bookName: ''
    }
  }

  getBooks = async (e) => {
    e.preventDefault();

    let bookName = e.target.bookName.value;
    console.log(bookName);

    await this.setState({
      bookName: bookName
    })

    let bookInfo = {
      bookName: bookName
    }
    let booksData = await axios.get(`${process.env.REACT_APP_SERVER}/getBooks`, { params: bookInfo })
    this.setState({
      Books: booksData.data,
      showBooksComponent: true
    })

    addBook = async (e) => {
      e.preventDefault();

      let bookInfo = {
        bookName: e.target.bookName.value,
        bookDescription: e.target.bookDescription.value,
      }

      let bookInfoData = await axios.post(`${process.env.REACT_APP_SERVER}/addbook`, bookInfo)
      this.setState({
        books: bookInfoData.data
      })

    }

    deletebook = async (bookID) => {

      let booksInfo = await axios.delete(`${process.env.REACT_APP_SERVER}/deletebook/${bookID}?bookName=${this.state.bookName}`)
      this.setState({
        books: booksInfo.data
      })
    }

    render(){
  
      console.log("app", this.props);

      const { isAuthenticated } = this.props.auth0;

      console.log(process.env.REACT_APP_SERVER);

      return (

        <Router>
          <Header />
          <Switch>
            {(isAuthenticated) ?
              <Route exact path="/">
                {" "}
                <BestBooks />{" "}
              </Route>
              :
              <Route exact path="/">
                <Login />
              </Route>
            }
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>

          return (
          {/* <> */}
          <Form
            getbooks={this.getbooks}
          />

          {this.state.showbooksComponent &&
            this.state.books.map((book, idx) => {

              return (
                <book
                  book={book}
                  idx={idx}
                  deletebook={this.deletebook}
                />
              )
            })
          }

          <AddbookForm
            addBook={this.addBook} />

          {/* // </> */}
          )

          <Footer />
        </Router>

      )
     
    }

    export default withAuth0(App);
