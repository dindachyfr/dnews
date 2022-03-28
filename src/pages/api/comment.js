import useSWR from "swr"
import fetcher from '../../helper/fetcher'

const getComments = (id) => {
    const {data, error} = useSWR(['GET', `http://localhost:5000/comment/${id}`],
     fetcher, 
    //  {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect:false}
     )

    return{
        comments: data?.data?.data,
        isError: error
    }
}

export {
    getComments
}
