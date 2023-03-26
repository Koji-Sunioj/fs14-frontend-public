import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, TAppState, TAlbum } from '../types/types'
import { adminRemoveAlbum, adminAddAlbum, adminPatchAlbum } from '../features/albums/albumSlice'

import AlbumForm from '../components/AlbumForm'

import { v4 as uuid4 } from 'uuid'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

const AdminPage = () => {
  const tagRef = useRef<HTMLInputElement>(null)
  const [tags, setTags] = useState<string[]>([])
  const [editTarget, setEditTarget] = useState<string | null>(null)
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

    const validForm = [artistName, albumName, description, price, stock, tags.join(',')].every(
      (field) => field.length > 0 && !isNaN(price) && !isNaN(stock)
    )

    if (validForm) {
      const newAlbum: Partial<TAlbum> = {
        albumId: undefined,
        artistName: artistName,
        albumName: albumName,
        description: description,
        price: Number(price),
        stock: Number(stock),
        tags: tags
      }

      const flow = editTarget === null ? 'add' : 'edit'

      switch (flow) {
        case 'add':
          newAlbum.albumId = uuid4()
          dispatch(adminAddAlbum(newAlbum))
          break
        case 'edit':
          newAlbum.albumId = editTarget!
          dispatch(adminPatchAlbum(newAlbum))
          break
        default:
          return null
      }
      flow === 'edit' && setEditTarget(null)
      setTags([])
      ;(document.getElementById('admin-form')! as HTMLFormElement).reset()
    }
  }

  const beforeAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
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

  const removeAlbum = (albumId: string) => {
    dispatch(adminRemoveAlbum(albumId))
  }

  const editAlbum = editTarget === null ? null : data?.find((album) => album.albumId === editTarget)

  return (
    <>
      <AlbumForm
        tags={tags}
        tagRef={tagRef}
        album={editAlbum}
        addTag={addTag}
        removeTag={removeTag}
        submitAlbum={submitAlbum}
        beforeAddTag={beforeAddTag}
      />

      <h3 className="mb-3 mt-3">current stock: </h3>
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
                <td>
                  <Button
                    onClick={() => {
                      setEditTarget(albumId)
                      setTags(tags)
                    }}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      removeAlbum(albumId!)
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

export default AdminPage
