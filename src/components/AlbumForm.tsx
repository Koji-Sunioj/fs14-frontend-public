import { TAlbumForm } from '../types/types'
import { compareCopy, checkNullOREmptyStr } from '../utils/compareCopy'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AlbumForm = ({
  album,
  albumCopy,
  tagRef,
  submitAlbum,
  addTag,
  removeTag,
  resetForm,
  checkSubmittable,
  beforeAddTag,
  flushForm
}: TAlbumForm) => {
  const { artistName, albumName, description, price, stock, tags } = albumCopy!

  let title = 'add an album: ',
    sameAsForm = false
  if (album !== null) {
    sameAsForm = compareCopy(albumCopy!, album!)
    title = `edit album ${album!.albumId}: `
  }
  const isAnyFalseOrNull = albumCopy === null ? true : checkNullOREmptyStr(albumCopy)

  return (
    <>
      <h3 className="mb-3 mt-3">{title}</h3>
      <Form id="admin-form" onSubmit={submitAlbum} onChange={checkSubmittable}>
        <Form.Group className="mb-3">
          <Row>
            <Col lg="6">
              <Form.Label>Artist</Form.Label>
              <Form.Control
                placeholder="Wu Tang Clan, Katy Perry..."
                name="artist"
                value={artistName}
              />
            </Col>
            <Col lg="6">
              <Form.Label>Album</Form.Label>
              <Form.Control
                placeholder="Stillmatic, Merry Christmas..."
                name="album"
                value={albumName}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
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
              <Form.Control
                onKeyUp={addTag}
                name="tags"
                onKeyDown={beforeAddTag}
                type="text"
                ref={tagRef}
              />
            </Col>
            <Col lg="4">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" value={stock!} />
            </Col>
            <Col lg="4">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={price!} />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          {tags!.length > 0 &&
            tags!.map((tag: string) => (
              <Button
                key={tag}
                variant="info"
                onClick={() => {
                  removeTag(tag)
                }}>
                {tag}
              </Button>
            ))}
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={(album !== null && !sameAsForm) || isAnyFalseOrNull}
          id="form-submit">
          Submit
        </Button>
        <Button variant="warning" type="reset" onClick={resetForm}>
          Reset
        </Button>
        {album !== null && (
          <Button variant="success" onClick={flushForm}>
            New album mode
          </Button>
        )}
      </Form>
    </>
  )
}

export default AlbumForm
