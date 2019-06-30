import React from 'react'
import { Form, Button, Header } from 'semantic-ui-react'

const AddPollCard = () => (
  <Form>
    <Form.Field>
      <label>Option one</label>
      <input placeholder='Please enter option one text here' />
    </Form.Field>
    <Form.Field>
        <Header as='h4'>and</Header>
      <label>Option two</label>
      <input placeholder='Please enter option two text here' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default AddPollCard