import * as React from "react"
import Err from "next/error"
import { useRouter } from "next/router"
import { Dialog, Transition } from "@headlessui/react"
import { LockClosedIcon } from "@heroicons/react/solid"
import Link from "next/link"
import Loader from "components/loader"

export default function SignUp() {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [modalOpen, setModalOpen] = React.useState<boolean>(false)
  const [error, setError] = React.useState<Error | null>(null)
  const router = useRouter()

  const cancelButtonRef = React.useRef(null)

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      name: { value: string }
      email: { value: string }
      phone: { value: number }
    }
    setLoading(true)
    fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        name: target.name.value,
        email: target.email.value,
        phone: target.phone.value,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setModalOpen(true)
        } else {
          const err = new Error("Failed to sign up")
          setError(err)
        }
        setLoading(false)
      })
      .catch((err: Error) => setError(err))
  }

  const handleAuth = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      passcode: { value: number }
    }
    setLoading(true)
    setModalOpen(false)
    fetch("/api/auth/authenticate", {
      method: "POST",
      body: JSON.stringify({
        passcode: target.passcode.value,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          // navigate to home
          await router.push("/")
        } else {
          const err = new Error("Failed to authenticate")
          setError(err)
        }
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err)
        setLoading(false)
      })
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <Err statusCode={500}>
        <p>{`${error.name}: ${error.message}`}</p>
      </Err>
    )
  }

  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
              Sign up for an account
            </h2>
            <p className="mt-2 text-center text-sm text-black">
              Or{" "}
              <Link href="/login">
                <a className="font-bold text-slate-600 hover:text-slate-500">
                  sign in
                </a>
              </Link>
            </p>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                inputMode="text"
                name="name"
                id="name"
                autoComplete="name"
                placeholder="Full name"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                type="text"
                inputMode="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="Email address"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                name="phone"
                id="phone"
                autoComplete="tel-national"
                placeholder="Phone number"
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-slate-500 group-hover:text-slate-400"
                  aria-hidden="true"
                />
              </span>
              Sign up
            </button>
          </form>

          <Transition.Root show={modalOpen} as={React.Fragment}>
            <Dialog
              as="div"
              className="fixed z-10 inset-0 overflow-y-auto"
              initialFocus={cancelButtonRef}
              onClose={setModalOpen}
            >
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <form onSubmit={handleAuth}>
                      <label htmlFor="passcode" className="sr-only">
                        SMS Passcode
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        name="passcode"
                        id="passcode"
                        autoComplete="one-time-code"
                        placeholder="SMS Passcode"
                        className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
                      />
                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:col-start-2 sm:text-sm"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                          onClick={() => setModalOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      </div>
    </>
  )
}
