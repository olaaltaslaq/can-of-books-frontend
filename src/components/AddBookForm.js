import React, { Component } from 'react'

class AddBookForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.addbook}>
                    <input type="text" name='bookName' placeholder='add book name' />
                    <input type="text" name='bookDescription' placeholder='add book description' />
                    <input type="submit" value="Add book" />
                </form>
            </div>
        )
    }
}

export default AddBookForm