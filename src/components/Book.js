import React, { Component } from 'react'

export class books extends Component {

    deleteBookFunc = () =>{
        this.props.deleteBook(this.props.book._id)
    }
    render() {
        return (
            <>
                <div key={this.props.idx}>
                    {this.props.book.bookName}
                    {this.props.book.bookDescription}
                    {this.props.book._id}

                    <button onClick={this.deletebookFunc}>Delete</button>
                </div>
            </>
        );
    }
}

export default books