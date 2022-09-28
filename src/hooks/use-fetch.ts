import { useEffect, useState } from 'react'

type Loading = boolean

export const useFetch = <D = unknown>(url: string) => {
  const [loading, setLoading] = useState<Loading>(true)
  const [data, setData] = useState<D>()

  useEffect(() => {
    const getProductList = async () => {
      const res = await fetch(url)

      if (!res.ok) {
        setLoading(false)
        throw new Error(`${res.status} Error`)
      }

      const resData = (await res.json()) as D

      setData(resData)
      setLoading(false)
    }
    getProductList()
  }, [url])

  return [loading, data] as const
}
