import { getUserProps } from "lib/user"
import { InferGetServerSidePropsType } from "next"
import * as React from "react"
import Err from "next/error"
import useSWR from "swr"
import { Barn } from "lib/barn"
import { fetcher } from "lib/utils"
import Link from "next/link"
import Button from "components/button"
import Skeleton from "components/skeleton"

export const getServerSideProps = getUserProps

export default function Home({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, error: barnsError } = useSWR<Barn[], Error>(
    `/api/barns?userID=${user.id}`,
    fetcher
  )

  if (barnsError) {
    return <Err statusCode={500} title={barnsError.message} />
  }

  let barn: Barn | null = null
  if (data) {
    barn = data[0]
  }

  return (
    <Skeleton>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {barn ? (
          <h1 className="text-2xl font-semibold text-gray-900">{barn.name}</h1>
        ) : (
          <div className="flex justify-center">
            <Link href="/barn/new">
              <a className="w-full max-w-3xl">
                <Button>Create a new barn</Button>
              </a>
            </Link>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Replace with your content */}
        <div className="py-4">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
        </div>
        {/* /End replace */}
      </div>
    </Skeleton>
  )
}
