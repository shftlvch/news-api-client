import Preview from "@/components/Article/Preview/Preview"
import Skeleton from "@/components/Skeleton/Skeleton"
import { Search } from "@/components/Search/Search"
import EmptyPlaceholder from "@/components/Placeholder/EmptyPlaceholder"
import { useNewsContext } from "@/contexts/NewsContext/NewsContext"
import { PAGE_SIZE } from "@/constants"
import InfiniteScroll from "react-infinite-scroll-component"
import Topics, { TopicItem } from "@/components/Topics/Topics"

/**
 * Home/search page
 *
 */
function Home() {
  const {
    sources: {
      state: { sourcesById }
    },
    search: {
      state: {
        q,
        domain,
        category,
        isValidating,
        pages,
        domains,
        visitedCategories,
        hasMore
      },
      set,
      setDomain,
      setCategory,
      addVisited,
      nextPage
    }
  } = useNewsContext()

  const result = pages?.reduce((prev, curr) => {
    return [...prev, ...curr]
  }, [])

  let categoriesList: TopicItem[] = []
  visitedCategories.forEach((category) => {
    categoriesList.push({ id: category, label: category })
  })

  let domainList: TopicItem[] = []
  domains.forEach((domain) => {
    domainList.push({ id: domain, label: domain })
  })

  return (
    <div className="container pt-8">
      <div className="grid grid-cols-12 gap-1">
        <div className="col-span-12 md:col-span-6 md:col-start-4">
          <Search initialValue={q} onChange={set} className="mb-6" />
        </div>
        <div className="col-span-3 col-start-1 hidden md:block">
          {categoriesList.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-1 text-lg font-semibold">Topics</h2>
              <Topics
                items={categoriesList}
                onSelect={setCategory}
                value={category}
              />
            </div>
          )}
          {domainList.length > 0 && (
            <div className="mb-6">
              <h2 className="mb-1 text-lg font-semibold">Domains</h2>
              <Topics items={domainList} onSelect={setDomain} value={domain} />
            </div>
          )}
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-4">
          {!result && !isValidating && (
            <EmptyPlaceholder onSelect={set} className={"py-32"} />
          )}
          {q !== "" && (
            <InfiniteScroll
              dataLength={result?.length || 0}
              next={nextPage}
              hasMore={hasMore}
              loader={<Skeleton count={PAGE_SIZE} className={"w-full h-20"} />}
              className="grid grid-cols-1 gap-4 max-w-2xl mx-auto pb-80"
            >
              {isValidating && !result && (
                <Skeleton count={PAGE_SIZE} className={"w-full h-20"} />
              )}
              {result?.length === 0 && (
                <div className="flex justify-center items-center col-span-full py-32">
                  No items found 😢
                </div>
              )}
              {result?.map((article, indx) => (
                <a
                  key={indx}
                  onClick={() =>
                    article.source.id !== null &&
                    addVisited(sourcesById[article.source.id]?.category)
                  }
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Preview {...article} />
                </a>
              ))}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
