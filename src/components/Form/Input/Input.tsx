import { PropsWithCN } from "@/types"
import { ChangeEvent, useId } from "react"

type InputProps = {
  label?: string
  placeholder?: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
  className,
  label,
  placeholder,
  name,
  value,
  onChange
}: PropsWithCN<InputProps>) => {
  const id = useId()
  return (
    <div className={`${className || ""}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        className="text-black mt-1 focus:ring-2 focus:ring-slate-500  focus:border-slate-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}
