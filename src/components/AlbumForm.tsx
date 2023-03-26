import { TAlbumForm } from '../types/types'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AlbumForm = ({
  album,
  tags,
  tagRef,
  submitAlbum,
  addTag,
  removeTag,
  beforeAddTag
}: TAlbumForm) => {
  let artistName = '',
    albumName = '',
    description = '',
    price: string | number = '',
    stock: string | number = '',
    albumId = ''
  if (album !== null) {
    ;({ artistName, albumName, description, price, stock, albumId } = album!)
  }

  const title = album === null ? 'add an album: ' : `edit album ${albumId}: `

  return (
    <>
      <h3 className="mb-3 mt-3">{title}</h3>
      <Form
        id="admin-form"
        style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
        onSubmit={submitAlbum}>
        <Form.Group className="mb-3">
          <Row>
            <Col lg="6">
              <Form.Label>Artist</Form.Label>
              <Form.Control
                placeholder="Wu Tang Clan, Katy Perry..."
                name="artist"
                defaultValue={artistName}
              />
            </Col>
            <Col lg="6">
              <Form.Label>Album</Form.Label>
              <Form.Control
                placeholder="Stillmatic, Merry Christmas..."
                name="album"
                defaultValue={albumName}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            defaultValue={description}
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
              <Form.Control onKeyUp={addTag} onKeyDown={beforeAddTag} type="text" ref={tagRef} />
            </Col>
            <Col lg="4">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="text" name="stock" defaultValue={stock} />
            </Col>
            <Col lg="4">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" name="price" defaultValue={price} />
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
