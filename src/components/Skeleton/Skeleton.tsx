import { PropsWithCN, PropsWithCNAndChildren } from "@/types"

const Skeleton = ({
  className,
  count = 1
}: PropsWithCN<{ count?: number }>): JSX.Element => {
  return (
    <>
      {[...Array(count)].map((_, indx) => (
        <div
          key={indx}
          className={`animate-pulse bg-slate-700 rounded-md  ${
            className || ""
          }`}
        ></div>
      ))}
    </>
  )
}

export default Skeleton
