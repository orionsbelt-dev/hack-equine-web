import React from "react"

type Props = React.ComponentPropsWithoutRef<"h1">

export default function Heading(props: Props) {
  let classNames: string = "mt-6 text-center text-3xl font-extrabold text-black"
  if (props.className) {
    classNames += ` ${props.className}`
  }
  return (
    <h1 className={classNames} {...props}>
      {props.children}
    </h1>
  )
}
