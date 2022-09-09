import { Source } from "@/types"

export enum SOURCES_ACTIONS {
  RECEIVE_SOURCES
}

export type SourcesState = {
  sourcesById: Record<string, Source>
  idsByCategory: Record<string, string[]>
}

type SourcesAction = {
  type: SOURCES_ACTIONS
  payload?: any
}

export const initialSourcesState = {
  sourcesById: {},
  idsByCategory: {}
} as SourcesState

function sourcesReducer(
  state: SourcesState,
  action: SourcesAction
): SourcesState {
  switch (action.type) {
    case SOURCES_ACTIONS.RECEIVE_SOURCES: {
      const { sources } = action.payload as {
        sources: Source[]
      }
      let sourcesById: Record<string, Source> = {}
      let idsByCategory: Record<string, string[]> = {}
      for (let source of sources) {
        sourcesById[source.id] = source

        if (idsByCategory[source.category]) {
          idsByCategory[source.category].push(source.id)
        } else {
          idsByCategory[source.category] = [source.id]
        }
      }

      return {
        ...state,
        sourcesById,
        idsByCategory
      }
    }
    default:
      throw new Error("Action key hasn't been specified")
  }
}

export default sourcesReducer
