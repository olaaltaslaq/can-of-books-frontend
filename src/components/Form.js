import React from 'react'

class Form extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.getBooks}>
                {/* <label>Enter your email</label> */}
                <input type="text" name='bookName' />
                <input type="text" name='bookDescription' />
                <input type="submit" value="get books" />
            </form>
        )
    }
}

export default Form
