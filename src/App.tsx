import Home from "@/pages/Home"
import { NewsContextProvider } from "./contexts/NewsContext/NewsContext"

export default function App() {
  return (
    <NewsContextProvider>
      <Home />
    </NewsContextProvider>
  )
}
