import { useLoaderData } from "react-router-dom"

const UserListView = () => {
  const data = useLoaderData() as PageJSON
  console.log(data)
  return (
    <>
      <p>This is a list of users.</p>
    </>
  )
}

export { UserListView }
