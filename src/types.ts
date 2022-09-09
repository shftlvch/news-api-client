import { PropsWithChildren } from "react"

export type PropsWithCN<T = {}> = { className?: string } & T
export type PropsWithCNAndChildren<T> = PropsWithChildren<PropsWithCN<T>>

export type SearchRequest = PaginationRequest & {
  q: string
  sources?: string[]
  domains?: string[]
}

export type PaginationRequest = {
  pageSize?: number
  page?: number
}

export type Article = {
  author: string
  content: string
  description: string
  publishedAt: string
  source: Omit<
    Source,
    "id" | "description" | "url" | "category" | "language" | "country"
  > & { id: string | null }
  id: null
  name: string
  title: string
  url: string
  urlToImage: string
}

export type Source = {
  id: string
  name: string
  description: string
  url: string
  category: string
  language: string
  country: string
}
