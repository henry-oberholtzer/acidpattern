import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    console.error(error)
    errorMessage = "Unknown"
  }

  return (
    <div>
      <h2>System Meltdown</h2>
      <p>It's all out of tune.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  )
}

export { ErrorPage }
