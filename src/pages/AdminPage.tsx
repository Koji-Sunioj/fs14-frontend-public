import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, TAppState } from '../types/types'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const AdminPage = () => {
  const [tags, setTags] = useState([])
  const dispatch = useDispatch<AppDispatch>()
  const {
    albums: { data }
  } = useSelector((state: TAppState) => state)

  const submitAlbum = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <h3>current stock: </h3>
      <Table
        responsive
        striped
        style={{
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '10px 10px 0px 0px'
        }}>
        <thead>
          <tr>
            <th>artist</th>
            <th>album</th>
            <th>price</th>
            <th>stock</th>
            <th>tags</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((album) => {
            const { artistName, albumId, albumName, price, stock, tags } = album
            return (
              <tr key={albumId}>
                <td>{artistName}</td>
                <td>{albumName}</td>
                <td>{price}</td>
                <td>{stock}</td>
                <td>{tags.join(', ')}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <h3>add an album: </h3>

      <Form
        style={{ backgroundColor: 'white', padding: '10px', borderRadius: '10px' }}
        onSubmit={submitAlbum}>
        <Form.Group className="mb-3">
          <Row>
            <Col lg="6">
              <Form.Label>Artist</Form.Label>
              <Form.Control placeholder="Wu Tang Clan, Katy Perry..." name="artist" />
            </Col>
            <Col lg="6">
              <Form.Label>Album</Form.Label>
              <Form.Control placeholder="Stillmatic, Merry Christmas..." name="album" />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Iron maiden's second album, was very influential.."
            name="description"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
            <Col lg="4">
              <Form.Label>Tags</Form.Label>
              <Form.Control type="text" name="tags" />
            </Col>
            <Col lg="4">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" />
            </Col>
            <Col lg="4">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default AdminPage
