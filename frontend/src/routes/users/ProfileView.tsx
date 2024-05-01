import { Navigate } from "react-router-dom"
import { DisplayTitle, ModalFrame, NavigationButton } from "../../components/UI"
import { useAuth } from "../../hooks/useAuth"

const ProfileView = () => {
  const { user } = useAuth()

  if (user) {
    return (
      <ModalFrame>
        <DisplayTitle>{user.user.username}</DisplayTitle>
        <NavigationButton to="/logout" text="log out" />
      </ModalFrame>
    )
  } else {
    <Navigate to="/login"></Navigate>
  }
}

export { ProfileView }
