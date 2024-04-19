import { useLoaderData } from "react-router-dom"

const PatternDetailView = () => {
  const data = useLoaderData() as PageJSON
  return (
    <>
      <p>This is a pattern detail view</p>
      <p>{data.results}</p>
    </>
  )
}

export { PatternDetailView }
