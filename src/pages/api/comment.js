import useSWR from "swr"
import fetcher from '../../helper/fetcher'

const getComments = (id) => {
    const {data, error} = useSWR(['GET', `https://dnews-dindin.herokuapp.com/comment/${id}`],
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
