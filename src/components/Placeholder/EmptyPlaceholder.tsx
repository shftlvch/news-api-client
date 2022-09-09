import { PropsWithCN } from "@/types"
import { PropsWithChildren } from "react"

const IDEAS = [
  "gdp in india",
  "when merge",
  "happy kittens",
  "react 18",
  "stranger things",
  "gal gadot",
  "sam harris",
  "christopher nolan",
  "is lex fridman a robot?",
  "what is love?"
]

const EmptyPlaceholderTag = ({
  onClick,
  children
}: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <button
      className="cursor-pointer underline-offset-4 border rounded-lg px-2 py-0 border-teal-800 hover:-translate-y-[1px] hover:bg-teal-900/40 transition-all"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const EmptyPlaceholder = ({
  className,
  onSelect
}: PropsWithCN<{ onSelect: (value: string) => void }>) => {
  return (
    <div
      className={`flex w-full h-full justify-center items-center flex-col gap-2 ${
        className || ""
      }`}
    >
      <div className="mb-4">Start typing to search.</div>
      <div>Need ideas? Try:</div>{" "}
      <div className="flex flex-wrap justify-center gap-1 max-w-md">
        {IDEAS.map((idea, indx) => (
          <EmptyPlaceholderTag key={indx} onClick={() => onSelect(idea)}>
            {idea}
          </EmptyPlaceholderTag>
        ))}
      </div>
    </div>
  )
}

export default EmptyPlaceholder
