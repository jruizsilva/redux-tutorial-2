import { type PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit'
import { type RootState } from 'app/store'
import { sub } from 'date-fns'

export interface Post {
  id: string
  title: string
  content: string
  date: string
  authorId?: string
  reactions: Reactions
}
type IObjectKeys = Record<string, number>

interface Reactions extends IObjectKeys {
  thumbsUp: number
  wow: number
  heart: number
  rocket: number
  coffee: number
}

export interface PrepareAddPostProps
  extends Omit<Post, 'id' | 'date' | 'reactions'> {}

export interface PayloadAddReaction {
  postId: string
  reaction: keyof Reactions
}

const INITIAL_REACTIONS = {
  thumbsUp: 0,
  wow: 0,
  heart: 0,
  rocket: 0,
  coffee: 0
}

const INITIAL_STATE: Post[] = [
  {
    id: '1',
    title: 'Learning Redux Toolkit',
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: INITIAL_REACTIONS
  },
  {
    id: '2',
    title: 'Slices...',
    content: 'The more I say slice, the more I want pizza.',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: INITIAL_REACTIONS
  }
]

export const postsSlice = createSlice({
  name: 'posts',
  initialState: INITIAL_STATE,
  reducers: {
    addPost: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare({ content, title, authorId }: PrepareAddPostProps) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            authorId,
            reactions: INITIAL_REACTIONS
          }
        }
      }
    },
    addReaction(state, action: PayloadAction<PayloadAddReaction>) {
      const { postId, reaction } = action.payload
      const postToUpdate = state.find((post) => post.id === postId)
      if (postToUpdate != null) {
        postToUpdate.reactions[reaction]++
      }
    }
  }
})

export const selectAllPosts = (state: RootState) => state.posts

export const { addPost, addReaction } = postsSlice.actions

export default postsSlice
