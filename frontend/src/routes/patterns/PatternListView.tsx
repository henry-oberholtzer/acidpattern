import { useLoaderData } from "react-router-dom"

const PatternListView = () => {
  const data = useLoaderData()

  return (
    <>
      <p>This is a list of patterns.</p>
    </>
  )
}

export { PatternListView }
