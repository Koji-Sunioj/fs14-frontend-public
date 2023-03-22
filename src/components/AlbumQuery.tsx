import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { FilterStateType } from '../types/types'

type AlbumQueryType = {
  filter: FilterStateType
  changeSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
  createQuery: (event: React.FormEvent<HTMLFormElement>) => void
}

const AlbumQuery = ({ filter, changeSelect, createQuery }: AlbumQueryType) => {
  const { sortField, direction, query } = filter

  return (
    <Row className="mt-3 mb-3">
      <Col lg={4}>
        <Form.Label>Sort by</Form.Label>
        <Form.Select value={sortField} onChange={changeSelect} name="sortField">
          {['artistName', 'albumName', 'price', 'stock'].map((field) => (
            <option key={field} value={field}>
              {field
                .split(/(?=[A-Z])/)
                .join(' ')
                .toLocaleLowerCase()}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col lg={4}>
        <Form.Label>Direction</Form.Label>
        <Form.Select value={direction} onChange={changeSelect} name="direction">
          <option value={'ascending'}>ascending</option>
          <option value={'descending'}>descending</option>
        </Form.Select>
      </Col>

      <Col lg={4}>
        <Form onSubmit={createQuery}>
          <Form.Label>Search</Form.Label>
          <InputGroup>
            <Button variant="primary">Search</Button>
            <Form.Control name="query" type="text" defaultValue={query!} />
          </InputGroup>
        </Form>
      </Col>
    </Row>
  )
}

export default AlbumQuery