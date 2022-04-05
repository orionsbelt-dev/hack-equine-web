export default function Loader() {
  return (
    <div className="flex justify-center items-center my-10">
      <div
        className="animate-spin inline-block w-40 h-40 border-y-4 rounded-full border-slate-600"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
