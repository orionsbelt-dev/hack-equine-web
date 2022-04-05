export const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const stringToInt = (str: string) => parseInt(str.replace(/\D/g, ""))
