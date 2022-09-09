import { Article } from "@/types"
import { Set } from "typescript"

export enum SEARCH_ACTIONS {
  SET_QUERY,
  RESET_ENTITIES,
  REQUEST_ENTITIES,
  REQUEST_MORE_ENTITIES,
  RECEIVE_PAGE,
  ADD_VISITED_CATEGORY,
  SET_DOMAIN,
  SET_CATEGORY
}

export type SearchState = {
  q: string
  domain?: string
  category?: string
  isValidating: boolean
  pages?: Article[][]
  domains: Set<string>
  visitedCategories: Set<string>
  size: number
  hasMore: boolean
}

type SearchAction = {
  type: SEARCH_ACTIONS
  payload?: any
}

export const initialSearchState = {
  q: "",
  domain: undefined,
  category: undefined,
  isValidating: false,
  pages: undefined,
  domains: new Set<string>(),
  visitedCategories: new Set<string>(),
  size: 0,
  hasMore: false
} as SearchState

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  const { pages, domains, visitedCategories, domain, category } = state
  switch (action.type) {
    case SEARCH_ACTIONS.SET_QUERY: {
      const { q } = action.payload as { q: string }
      return {
        ...state,
        q
      }
    }
    case SEARCH_ACTIONS.RESET_ENTITIES: {
      return {
        ...state,
        pages: undefined,
        domain: undefined,
        size: 0,
        hasMore: false,
        isValidating: false,
        domains: new Set<string>()
      }
    }
    case SEARCH_ACTIONS.REQUEST_ENTITIES: {
      return {
        ...state,
        pages: undefined,
        size: 0,
        hasMore: true,
        isValidating: true,
        domains: new Set<string>()
      }
    }
    case SEARCH_ACTIONS.RECEIVE_PAGE: {
      const { articles, hasMore } = action.payload as {
        articles: Article[]
        hasMore: boolean
      }
      for (let article of articles) {
        const domainName = new URL(article.url)
        domains.add(domainName.hostname.replace("www.", ""))
      }
      return {
        ...state,
        pages: pages && pages.length ? [...pages, articles] : [articles],
        domains,
        hasMore,
        isValidating: false
      }
    }
    case SEARCH_ACTIONS.REQUEST_MORE_ENTITIES: {
      return {
        ...state,
        size: state.size + 1,
        isValidating: true
      }
    }
    case SEARCH_ACTIONS.ADD_VISITED_CATEGORY: {
      const { id } = action.payload as {
        id: string
      }
      visitedCategories.add(id)
      return {
        ...state,
        visitedCategories
      }
    }
    case SEARCH_ACTIONS.SET_DOMAIN: {
      const { id } = action.payload as {
        id: string
      }
      return {
        ...state,
        domain: id === domain ? undefined : id,
        pages: undefined,
        size: 0,
        hasMore: true,
        isValidating: true
      }
    }
    case SEARCH_ACTIONS.SET_CATEGORY: {
      const { id } = action.payload as {
        id: string
      }
      return {
        ...state,
        category: id === category ? undefined : id,
        domain: undefined,
        pages: undefined,
        size: 0,
        hasMore: true,
        isValidating: true,
        domains: new Set<string>()
      }
    }
    default:
      throw new Error("Action key hasn't been specified")
  }
}

export default searchReducer
