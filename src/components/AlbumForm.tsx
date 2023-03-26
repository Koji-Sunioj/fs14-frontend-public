import { TAlbumForm } from '../types/types'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AlbumForm = ({ tags, tagRef, submitAlbum, addTag, removeTag }: TAlbumForm) => {
  return (
    <>
      <h3>add an album: </h3>
      <Form
        id="admin-form"
        style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
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
              <Form.Control onKeyUp={addTag} type="text" name="tags" ref={tagRef} />
            </Col>
            <Col lg="4">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" />
            </Col>
            <Col lg="4">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" step=".01" />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          {tags.length > 0 &&
            tags.map((tag: string) => (
              <Button
                key={tag}
                style={{ margin: '2px 2px 2px 0px' }}
                variant="info"
                onClick={() => {
                  removeTag(tag)
                }}>
                {tag}
              </Button>
            ))}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default AlbumForm
