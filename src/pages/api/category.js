import useSWR from "swr"
import fetcher from '../../helper/fetcher'

const getCategory = () => {
    const {data, error} = useSWR(['GET', 'http://localhost:5000/category?limit=6'],
     fetcher, 
    //  {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect:false}
     )

    return{
        cats: data?.data?.data,
        isError: error
    }
}

export {
    getCategory
}
