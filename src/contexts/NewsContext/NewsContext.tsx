import { PAGE_SIZE } from "@/constants"
import { Article, SearchRequest, Source } from "@/types"
import fetcher from "@/utils/fetcher"
import { useCallback } from "react"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer
} from "react"
import sourcesReducer, {
  SourcesState,
  initialSourcesState,
  SOURCES_ACTIONS
} from "./reducers/sources"
import searchReducer, {
  initialSearchState,
  SearchState,
  SEARCH_ACTIONS
} from "./reducers/search"

interface INewsContext {
  sources: {
    state: SourcesState
  }
  search: {
    state: SearchState
    setDomain: (id: string) => void
    setCategory: (id: string) => void
    addVisited: (id: string) => void
    set: (q: string) => void
    nextPage: () => void
  }
}

/**
 * We can add chaching for each request here
 */
export const NewsContext = createContext<INewsContext>({
  sources: {
    state: initialSourcesState
  },
  search: {
    state: initialSearchState,
    setDomain: () => {},
    setCategory: () => {},
    addVisited: () => {},
    set: () => {},
    nextPage: () => {}
  }
})

/**
 * Base context
 */
export const useNewsContext = (): INewsContext => useContext(NewsContext)

export function NewsContextProvider({
  children
}: PropsWithChildren<unknown>): JSX.Element {
  const [searchState, dispatchSearch] = useReducer(
    searchReducer,
    initialSearchState
  )
  const [sourcesState, dispatchSources] = useReducer(
    sourcesReducer,
    initialSourcesState
  )

  /**
   * Querying search endpoint from the API
   */
  const fetchPage = useCallback(async () => {
    if (searchState.q === "") {
      return
    }
    let args: SearchRequest = {
      q: searchState.q,
      page: searchState.size + 1,
      pageSize: PAGE_SIZE
    }
    if (searchState.category) {
      args["sources"] = sourcesState.idsByCategory[searchState.category]
    }
    if (searchState.domain) {
      args["domains"] = [searchState.domain]
    }
    const resp = await fetcher<Article[]>({
      endpoint: "everything",
      args
    })
    dispatchSearch({
      type: SEARCH_ACTIONS.RECEIVE_PAGE,
      payload: {
        articles: resp?.articles,
        hasMore: resp?.articles && resp?.articles.length === PAGE_SIZE
      }
    })
  }, [
    searchState.q,
    searchState.size,
    searchState.domain,
    searchState.category,
    sourcesState.idsByCategory
  ])

  /**
   * Executing the callback (search endpoint) on changes
   */
  useEffect(() => {
    fetchPage()
  }, [fetchPage])

  /**
   * Side-effects when query string changes
   */
  useEffect(() => {
    if (searchState.q === "") {
      dispatchSearch({
        type: SEARCH_ACTIONS.RESET_ENTITIES
      })
      return
    }
    dispatchSearch({
      type: SEARCH_ACTIONS.REQUEST_ENTITIES
    })
  }, [searchState.q])

  /**
   * Querying sources
   */
  const fetchSources = useCallback(async () => {
    const resp = await fetcher<Source[]>({
      endpoint: `top-headlines/sources`
    })
    dispatchSources({
      type: SOURCES_ACTIONS.RECEIVE_SOURCES,
      payload: { sources: resp?.sources }
    })
  }, [])

  /**
   * Handling current id changes
   */
  useEffect(() => {
    fetchSources()
  }, [fetchSources])

  return (
    <NewsContext.Provider
      value={{
        sources: {
          state: sourcesState
        },
        search: {
          state: searchState,
          addVisited: (id: string) =>
            dispatchSearch({
              type: SEARCH_ACTIONS.ADD_VISITED_CATEGORY,
              payload: { id }
            }),
          set: (q: string) =>
            dispatchSearch({
              type: SEARCH_ACTIONS.SET_QUERY,
              payload: { q }
            }),
          setDomain: (id: string) =>
            dispatchSearch({
              type: SEARCH_ACTIONS.SET_DOMAIN,
              payload: { id }
            }),
          setCategory: (id: string) =>
            dispatchSearch({
              type: SEARCH_ACTIONS.SET_CATEGORY,
              payload: { id }
            }),
          nextPage: () =>
            dispatchSearch({
              type: SEARCH_ACTIONS.REQUEST_MORE_ENTITIES
            })
        }
      }}
    >
      {children}
    </NewsContext.Provider>
  )
}
