import { Article, PropsWithCN } from "@/types"

const Preview = ({
  className,
  title,
  urlToImage,
  description
}: PropsWithCN<Article>) => {
  return (
    <div
      className={`rounded-md overflow-hidden cursor-pointer group border flex ${
        className || ""
      }`}
    >
      <div className="w-1/4 shrink-0">
        <img
          className="w-full h-full object-cover object-top group-hover:-translate-x-2 transition-transform"
          src={urlToImage}
          alt={title}
        />
      </div>
      <div className="px-4 py-4">
        <h3 className="text-xl mb-2">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  )
}

export default Preview
