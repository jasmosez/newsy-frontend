import React from 'react'

let missingImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQvSeCWTVw5702o2n_lZRid3MkuIi8t2HkvZc6gvI1Eu3fZzeQu"

class AuthorCard extends React.Component {

    render() {
        return (
            <div>
                {/* <img src={this.props.image ? this.props.image : missingImg} alt={"picture of " + this.props.name}/> */}
                <span>{this.props.name}</span>
            </div>

        )
    }



}

export default AuthorCard;