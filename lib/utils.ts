export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const stringToInt = (str: string) => parseInt(str.replace(/\D/g, ""))

export const apiRequest = (
  path: string,
  method: string,
  headers?: object,
  body?: string
) => {
  return fetch(`${process.env.API_URL}${path}`, {
    method,
    // @ts-ignore
    headers: {
      "x-api-key": process.env.API_KEY,
      "Content-Type": "application/json",
      ...headers,
    },
    body,
  })
}

export function insertAt(array: Array<any>, index: number, item: any) {
  array.splice(index, 0, item)
}
