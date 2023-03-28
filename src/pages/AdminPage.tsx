import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, TAppState, TAlbum } from '../types/types'
import { adminRemoveAlbum, adminAddAlbum, adminPatchAlbum } from '../features/albums/albumSlice'

import AlbumForm from '../components/AlbumForm'
import AdminTable from '../components/AdminTable'

import { v4 as uuid4 } from 'uuid'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'

const AdminPage = () => {
  const tagRef = useRef<HTMLInputElement>(null)
  const [albumCopy, setAlbumCopy] = useState<null | Partial<TAlbum>>(null)
  const [tags, setTags] = useState<string[]>([])
  const [editTarget, setEditTarget] = useState<string | null>(null)
  const dispatch = useDispatch<AppDispatch>()
  const {
    albums: { data, error, message, loading }
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
      setAlbumCopy({ ...albumCopy, tags: tagCopy })
      tagRef.current!.value = ''
    }
  }

  const removeTag = (tag: string) => {
    const tagCopy = tags.filter((stateTag) => stateTag !== tag)
    setAlbumCopy({ ...albumCopy, tags: tagCopy })
    setTags(tagCopy)
  }

  const fillForm = (albumId: string, tags: string[]) => {
    const copy = data!.find((album) => album.albumId)
    setAlbumCopy(copy!)
    setEditTarget(albumId)
    setTags(tags)
    window.scrollTo(0, 0)
    ;(document.getElementById('admin-form')! as HTMLFormElement).reset()
  }

  const removeAlbum = (albumId: string) => {
    setEditTarget !== null && setEditTarget(null)
    dispatch(adminRemoveAlbum(albumId))
  }

  const checkSubmittable = (event: any) => {
    if (editTarget !== null) {
      const {
        currentTarget: {
          artist: { value: artistName },
          album: { value: albumName },
          price: { value: price },
          stock: { value: stock },
          description: { value: description }
        }
      } = event
      const newAlbum: Partial<TAlbum> = {
        artistName: artistName,
        albumName: albumName,
        description: description,
        tags: tags
      }

      if (price.length > 0) {
        newAlbum.price = Number(price)
      }

      if (stock.length > 0) {
        newAlbum.stock = Number(stock)
      }
      const newALbumCopy = { ...albumCopy, ...newAlbum }
      setAlbumCopy(newALbumCopy!)
    }
  }

  const editAlbum = editTarget === null ? null : data?.find((album) => album.albumId === editTarget)

  return (
    <>
      <AlbumForm
        tags={tags}
        tagRef={tagRef}
        albumCopy={albumCopy}
        album={editAlbum}
        addTag={addTag}
        removeTag={removeTag}
        checkSubmittable={checkSubmittable}
        submitAlbum={submitAlbum}
        beforeAddTag={beforeAddTag}
        setEditTarget={setEditTarget}
      />
      {data !== null && <AdminTable albums={data} fillForm={fillForm} removeAlbum={removeAlbum} />}
      {error && (
        <Alert className="mt-3" variant="danger">
          {message}
        </Alert>
      )}
      {loading && <Spinner animation="grow" variant="primary" />}
    </>
  )
}

export default AdminPage
