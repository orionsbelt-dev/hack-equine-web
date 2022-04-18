type Props = React.ComponentPropsWithoutRef<"button">

export default function Button({ type, className, children, onClick }: Props) {
  let classNames: string =
    "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
  if (className) {
    classNames += ` ${className}`
  }
  return (
    <button type={type} className={classNames} onClick={onClick}>
      {children}
    </button>
  )
}

export function Cancel(props: Props) {
  let classNames: string =
    "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
  if (props.className) {
    classNames += ` ${props.className}`
  }
  return (
    <Button {...props} className={classNames}>
      Cancel
    </Button>
  )
}
