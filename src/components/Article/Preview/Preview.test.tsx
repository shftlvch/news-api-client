import { render, screen } from "@testing-library/react"
import { article } from "../__mocks__/article"
import Preview from "./Preview"

it("should render images", () => {
  render(<Preview {...article} />)
  const images = screen.getAllByRole("img")
  images.forEach((el) => expect(el).toBeInTheDocument())
})
