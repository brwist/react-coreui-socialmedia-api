import { SET_STORIES, STORIES_ERROR } from '../types/stories';

export const setStories = stories => ({
  type: SET_STORIES,
  stories,
})

export const setStoriesError = error => {
  return ({
    type: STORIES_ERROR,
    error
  })
}