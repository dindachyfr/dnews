import axios from "axios"

const fetcher = (method='GET', url, args) => {
    return axios({
        method,
        url,
        ...args
    })
}

export default fetcher