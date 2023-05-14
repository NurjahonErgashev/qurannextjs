import {useQueries } from "@tanstack/react-query"
import { zapros } from "../utils/axios"
export interface Data {
    key: [string, number],
    url: string,
}


export function useGETALL(data: Data[]) {
    const results = useQueries({
        queries: data.map(i => {
            return {
                queryKey: i.key,
                queryFn: () => zapros.get(i.url).then(data => data.data),

            }
        })
    })
    return results
}