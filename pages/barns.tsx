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
import { DotsVerticalIcon } from "@heroicons/react/solid"

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

  return (
    <Skeleton>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Barns</h1>
        <div className="flex justify-center">
          <Link href="/barn/new">
            <a className="w-full max-w-3xl">
              <Button>Create a new barn</Button>
            </a>
          </Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {data ? (
          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {data.map((barn) => (
              <li
                key={barn.id}
                className="col-span-1 flex shadow-sm rounded-md"
              >
                <div className="flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <Link href={`/barn/${barn.id}`}>
                      <a className="text-gray-900 font-medium hover:text-gray-600">
                        {barn.name}
                      </a>
                    </Link>
                    {/* <p className="text-gray-500">{barn.horses} horses</p> */}
                  </div>
                  <div className="flex-shrink-0 pr-2">
                    <button
                      type="button"
                      className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                    >
                      <span className="sr-only">Open options</span>
                      <DotsVerticalIcon
                        className="w-5 h-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Skeleton>
  )
}
