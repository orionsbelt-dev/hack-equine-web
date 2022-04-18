import Form, { Input } from "components/form"
import Heading from "components/heading"
import Button, { Cancel } from "components/button"
import { getUserProps } from "lib/user"
import { InferGetServerSidePropsType } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import * as React from "react"
import Loader from "components/loader"
import Err from "next/error"

export const getServerSideProps = getUserProps

export default function NewBarn({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const [error, setError] = React.useState<Error | null>(null)
  const [errorCode, setErrorCode] = React.useState<number>(0)
  const [loading, setLoading] = React.useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const target = e.target as typeof e.target & {
      name: { value: string }
    }
    const resp = await fetch("/api/barn", {
      method: "POST",
      body: JSON.stringify({
        name: target.name.value,
      }),
    })
    const data = (await resp.json()) as {
      error?: string
    }
    if (resp.status === 200) {
      await router.push("/")
    } else {
      setError(
        data.error ? new Error(data.error) : new Error("Failed to create barn")
      )
      setErrorCode(resp.status)
    }
    setLoading(false)
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Err statusCode={errorCode} err={error} />
  }

  return (
    <>
      <Heading>New Barn</Heading>
      <Form onSubmit={handleSubmit}>
        <Input label="Barn Name" id="name" type="text" />
        <div className="flex flex-row-reverse gap-5">
          <Button type="submit">Submit</Button>
          <Link href="/">
            <a className="w-full">
              <Cancel />
            </a>
          </Link>
        </div>
      </Form>
    </>
  )
}
