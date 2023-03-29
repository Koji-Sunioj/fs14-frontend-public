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
  const {
    albums: { data, error, message, loading }
  } = useSelector((state: TAppState) => state)
  const tagRef = useRef<HTMLInputElement>(null)
  const [tags, setTags] = useState<string[]>([])
  const [editTarget, setEditTarget] = useState<string | null>(null)
  const initAlbum = {
    artistName: '',
    albumName: '',
    description: '',
    price: 0,
    stock: 0
  }
  const [albumCopy, setAlbumCopy] = useState<null | Partial<TAlbum>>(initAlbum)
  const dispatch = useDispatch<AppDispatch>()

  const submitAlbum = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const flow = editTarget === null ? 'add' : 'edit'
    switch (flow) {
      case 'add':
        const newAlbum = { ...albumCopy }
        newAlbum.albumId = uuid4()
        dispatch(adminAddAlbum(newAlbum))
        break
      case 'edit':
        const rowClass = document.getElementById(`row-${albumCopy!.albumId}`)?.classList
        rowClass!.remove('fade-in')
        setTimeout(() => {
          rowClass!.add('fade-in')
        }, 50)
        setEditTarget(null)
        dispatch(adminPatchAlbum(albumCopy))
        break
      default:
        return null
    }

    flushForm()
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
    const copy = data!.find((album) => album.albumId === albumId)
    setAlbumCopy(copy!)
    setEditTarget(albumId)
    setTags(tags)
    window.scrollTo(0, 0)
    document.getElementById(`button-${albumId}`)?.setAttribute('disabled', 'true')
    editTarget !== null &&
      document.getElementById(`button-${editTarget}`)?.removeAttribute('disabled')
    ;(document.getElementById('admin-form')! as HTMLFormElement).reset()
  }

  const removeAlbum = (albumId: string) => {
    const rowClass = document.getElementById(`row-${albumId}`)?.classList
    rowClass!.add('fade-out')
    setTimeout(() => {
      editTarget !== null && flushForm()
      rowClass!.remove('fade-out')
      dispatch(adminRemoveAlbum(albumId))
    }, 400)
  }

  const checkSubmittable = (event: React.ChangeEvent<HTMLFormElement>) => {
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
      tags: tags,
      price: price.length > 0 ? Number(price) : null,
      stock: stock.length > 0 ? Number(stock) : null
    }

    const newALbumCopy = { ...albumCopy, ...newAlbum }
    setAlbumCopy(newALbumCopy!)
  }

  const flushForm = () => {
    if (editTarget !== null) {
      document.getElementById(`button-${editTarget}`)?.removeAttribute('disabled')
      setEditTarget(null)
    }
    setTags([])
    setAlbumCopy(initAlbum)
    ;(document.getElementById('admin-form')! as HTMLFormElement).reset()
  }

  const editAlbum = editTarget === null ? null : data?.find((album) => album.albumId === editTarget)

  const resetForm = () => {
    if (editTarget !== null) {
      setTags(editAlbum!.tags)
      setAlbumCopy(editAlbum!)
    } else {
      setAlbumCopy(initAlbum)
      setTags([])
    }
    ;(document.getElementById('admin-form')! as HTMLFormElement).reset()
  }

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
        flushForm={flushForm}
        resetForm={resetForm}
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
