import { useLoaderData } from "react-router-dom"

const PatternDetailView = () => {
  const data = useLoaderData()
  console.log(data)
  return (
    <p>This is a pattern detail view</p>
  )
}

export { PatternDetailView }
