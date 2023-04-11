import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useState, type ChangeEvent } from 'react'
import { type PrepareAddPostProps, addPost } from './postsSlice'
import { type User, selectAllUsers } from 'features/users/usersSlice'

const INITIAL_STATE: PrepareAddPostProps = {
  title: '',
  content: '',
  authorId: ''
}

export const AddPostForm = () => {
  const [formValues, setFormValues] = useState(INITIAL_STATE)
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (canSave) {
      dispatch(addPost({ ...formValues }))
      setFormValues(INITIAL_STATE)
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const canSave =
    Boolean(formValues.title) &&
    Boolean(formValues.content) &&
    Boolean(formValues.authorId)

  const authorOptions = users.map(({ id, name }: User) => {
    return (
      <option value={id} key={id}>
        {name}
      </option>
    )
  })

  return (
    <div>
      <h2>Add new post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Post Title: </label>
        <input
          type='text'
          id='postTitle'
          name='title'
          value={formValues.title}
          onChange={handleChange}
        />
        <label htmlFor='authorId'>Author: </label>
        <select
          name='authorId'
          id='authorId'
          value={formValues.authorId}
          onChange={handleChange}
        >
          <option value=''>Select an author</option>
          {authorOptions}
        </select>
        <label htmlFor='postContent'>Post Content: </label>
        <input
          type='text'
          id='postContent'
          name='content'
          value={formValues.content}
          onChange={handleChange}
        />

        <button type='submit' disabled={!canSave}>
          Add Post
        </button>
      </form>
    </div>
  )
}
