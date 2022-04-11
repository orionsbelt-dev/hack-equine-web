import { getUserProps } from "lib/user"
import { InferGetServerSidePropsType } from "next"
import * as React from "react"
import { useRouter } from "next/router"
import Err from "next/error"

export const getServerSideProps = getUserProps

export default function Home({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [error, setError] = React.useState<Error | null>(null)
  const router = useRouter()

  const handleLogout = (e: React.SyntheticEvent) => {
    e.preventDefault()
    fetch("/api/auth/logout", {
      method: "POST",
    })
      .then((res) => {
        console.log({ status: res.status })
        if (res.status === 200) {
          router.push("/login")
        } else {
          const err = new Error("Failed to logout")
          setError(err)
        }
      })
      .catch((err: Error) => {
        setError(err)
      })
  }

  if (error) {
    return <Err statusCode={500} title={error.message} />
  }

  return (
    <div>
      <h1>Welcome to Hack Equine!</h1>
      <button onClick={handleLogout}>Sign out</button>
    </div>
  )
}
