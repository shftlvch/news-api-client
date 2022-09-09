import { fireEvent, render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { Search } from "./Search"

beforeEach(() => {
  jest.useFakeTimers()
  jest.spyOn(global, "setTimeout")
})
afterEach(() => jest.useRealTimers())

it("use debounce when search triggered", async () => {
  render(<Search initialValue="" onChange={() => {}} />)

  await act(async () => {
    const el = screen.getByRole("textbox")
    fireEvent.change(el, { target: { value: "kittens" } })

    expect(setTimeout).toBeCalled()
  })
})

it("show reset button if value.length > 0", async () => {
  render(<Search initialValue="" onChange={() => {}} />)

  await act(async () => {
    const el = screen.getByRole("textbox")
    fireEvent.change(el, { target: { value: "kittens" } })

    expect(setTimeout).toBeCalled()
  })
  const btn = screen.getByRole("button")
  expect(btn).toBeInTheDocument()
})
