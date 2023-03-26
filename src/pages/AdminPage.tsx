import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, TAppState } from '../types/types'
import { fetchAlbums } from '../features/albums/albumSlice'

import AlbumForm from '../components/AlbumForm'

import { v4 as uuid4 } from 'uuid'
import Table from 'react-bootstrap/Table'

const AdminPage = () => {
  const tagRef = useRef<HTMLInputElement>(null)
  const [flow, setFlow] = useState<string>('add')
  const [tags, setTags] = useState<string[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const {
    albums: { data },
    filter
  } = useSelector((state: TAppState) => state)

  const submitAlbum = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const {
      currentTarget: {
        artist: { value: artistName },
        album: { value: albumName },
        price: { value: price },
        stock: { value: stock },
        description: { value: description }
      }
    } = event

    if (
      [artistName, albumName, description, price, stock, tags.join(',')].every(
        (field) => field.length > 0
      )
    ) {
      const newAlbum = {
        albumId: uuid4(),
        artistName: artistName,
        albumName: albumName,
        price: Number(price),
        stock: Number(stock),
        tags: tags
      }

      switch (flow) {
        case 'add':
          localStorage.setItem('adminAlbum', JSON.stringify(newAlbum))
          dispatch(fetchAlbums(filter))
          break
        case 'edit':
          break
        default:
          return null
      }
      ;(document.getElementById('admin-form')! as HTMLFormElement).reset()
    }
  }

  const addTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value: tag }
    } = event

    if (event.key === 'Enter' && tag.length > 0) {
      const tagCopy = [...tags]
      tagCopy.push(tag)
      setTags(tagCopy)
      tagRef.current!.value = ''
    }
  }

  const removeTag = (tag: string) => {
    const tagCopy = tags.filter((stateTag) => stateTag !== tag)
    setTags(tagCopy)
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
      {flow === 'add' && (
        <AlbumForm
          tags={tags}
          tagRef={tagRef}
          submitAlbum={submitAlbum}
          addTag={addTag}
          removeTag={removeTag}
        />
      )}
    </>
  )
}

export default AdminPage
