import useSWR from "swr"
import fetcher from '../../helper/fetcher'

const getPopular = () => {
    const { data, error } = useSWR(['GET', 'http://localhost:5000/articles?sort=likes&order=desc&limit=3'],
        fetcher,
        { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }
    )

    return {
        recs: data?.data?.data,
        isError: error
    }
}

const getDetailArticle = (id) => {
    const { data, error } = useSWR(['GET', `http://localhost:5000/articles/detail/${id}`],
        fetcher,
        // { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }
    )

    return {
        article: data?.data?.data,
        isError: error,
    }
}

const getLatest = () => {
    const { data, error } = useSWR(['GET', 'http://localhost:5000/articles?sort=updated&order=desc&limit=9'],
        fetcher,
        // { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }
    )

    return {
        latest: data?.data?.data,
        isError: error
    }
}

const getSaved = (id) => {
    const {data, error} = useSWR(['GET', `https://dnews-dindin.herokuapp.com/saved-post/${id}`],
     fetcher, 
    //  {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect:false}
     )

    return{
        saved: data?.data?.data,
        isError: error
    }
}

const getArtByCat = (cat_name) => {
    const {data, error} = useSWR(['GET', `http://localhost:5000/articles/${cat_name}`],
     fetcher, 
     {revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect:false}
     )

    return{
        artCats: data?.data?.data,
        isError: error
    }
}


export {
    getPopular,
    getDetailArticle,
    getLatest,
    getSaved,
    getArtByCat
}
