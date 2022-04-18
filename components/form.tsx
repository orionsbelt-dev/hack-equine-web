import React from "react"

type FormProps = React.ComponentPropsWithoutRef<"form">

export default function Form(props: FormProps) {
  let classNames: string = "mt-8 space-y-6 max-w-3xl mx-auto px-6"
  if (props.className) {
    classNames += ` ${props.className}`
  }
  return (
    <form {...props} className={classNames}>
      <div className="rounded-md shadow-sm space-y-5">{props.children}</div>
    </form>
  )
}

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string
}

export function Input(props: InputProps) {
  let classNames: string =
    "appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-slate-500 focus:border-slate-500 focus:z-10 sm:text-sm"
  if (props.className) {
    classNames += ` ${props.className}`
  }
  return (
    <>
      <label htmlFor={props.id} className="sr-only">
        {props.label}
      </label>
      <input placeholder={props.label} {...props} className={classNames} />
    </>
  )
}
