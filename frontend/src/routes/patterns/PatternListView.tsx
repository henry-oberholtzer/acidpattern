import { useLoaderData } from "react-router-dom"

const PatternListView = () => {
  const data = useLoaderData() as PageJSON

  return (
    <>
      <p>This is a list of patterns.</p>
      <p>{data.count}</p>
    </>
  )
}

export { PatternListView }
