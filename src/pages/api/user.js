import useSWR from "swr"
import fetcher from '../../helper/fetcher'

const getProfile = () => {
    const token = typeof window !== 'undefined' && localStorage.getItem('token')
    const {data, error} = useSWR(['GET', 'https://dnews-dindin.herokuapp.com/users/user/profile', {
        headers: {Authorization: `Bearer ${token}`}
    }], fetcher, 
    // {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect:false}
    )

    return{
        profile: data?.data?.data,
        isError: error
    }
}

export {
    getProfile
}