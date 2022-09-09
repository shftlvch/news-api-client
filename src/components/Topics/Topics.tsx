import { PropsWithCN } from "@/types"

export type TopicItem = { id: string; label: string }

const Topics = ({
  items,
  value,
  onSelect
}: PropsWithCN<{
  items?: TopicItem[]
  value?: string
  onSelect: (id: string) => void
}>) => {
  return (
    <div>
      {items?.map(({ id, label }) => (
        <div
          key={id}
          className={`cursor-pointer ${
            id === value ? "font-semibold" : ""
          } hover:opacity-90`}
          onClick={() => onSelect(id)}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

export default Topics
