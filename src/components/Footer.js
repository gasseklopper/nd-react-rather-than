import React, { Component } from "react";
import { Segment, Container } from 'semantic-ui-react'

class Footer extends Component {
  render() {
    return (
		<Segment inverted  className="footer" color = 'grey' style = {
			{
				marginTop: "3em",
				padding: "3em",
				width: "100%",
				position: "fixed",
				bottom: "0",
				left: "0"
			}}>
				<Container textAlign = 'center' style = {
					{
						fontSize: "0.9em"
					}
				}>
					Markus Morley, {new Date().getFullYear()}, created with React, Adobe XD, Semantic Ui
				</Container>
		</Segment >
    )
  }
}

export default Footer
