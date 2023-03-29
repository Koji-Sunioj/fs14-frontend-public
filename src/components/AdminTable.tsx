import { TAdminTable } from '../types/types'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const AdminTable = ({ albums, fillForm, removeAlbum }: TAdminTable) => {
  return (
    <>
      <h3 className="mb-3 mt-3">current stock: </h3>
      <Table variant="dark" responsive="xl" striped>
        <thead>
          <tr>
            <th>artist</th>
            <th>album</th>
            <th>price</th>
            <th>stock</th>
            <th>tags</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {albums?.map((album) => {
            const { artistName, albumId, albumName, price, stock, tags } = album
            const buttonId = `button-${albumId}`
            const rowId = `row-${albumId}`
            return (
              <tr key={albumId} className="fade-in" id={rowId}>
                <td>{artistName}</td>
                <td>{albumName}</td>
                <td>{price}</td>
                <td>{stock}</td>
                <td>{tags.join(', ')}</td>
                <td>
                  <Button
                    id={buttonId}
                    onClick={() => {
                      fillForm(albumId, tags)
                    }}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      removeAlbum(albumId)
                    }}>
                    Delete
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}
export default AdminTable
