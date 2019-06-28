import React, { Component } from 'react'
import { connect } from 'react-redux'


 class Question extends Component {
  render() {
	  console.log('this props: ', this.props)
    return (
      <div className='tweet'>

      </div>
    )
  }
}

 function mapStateToProps ({ authedUser, questions  }, {id}) {
	 const question = questions[id]

  return {
    authedUser,
    question,
  }
}

 export default connect(mapStateToProps)(Question)