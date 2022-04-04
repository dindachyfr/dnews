import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import Layout from "../../../../components/layout"
import styles from './post.module.css'
import Kucing from '../../../../assets/kucingjulid.jpg'
import fetcher from "../../../../helper/fetcher"
import { getProfile } from "../../../api/user"

const PostArticle = () => {
    const router = useRouter()
    const [pic, setPic] = useState(null)
    const { profile, error } = typeof window !== 'undefined' && getProfile()
    const [form, setForm] = useState({
        title: '',
        cat_name: '',
        content: ''
    })

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = () => {
        console.log(form);
        const PPData = new FormData()
        PPData.append('pic', pic)
        PPData.append('user_id', profile.id)
        PPData.append('title', form.title)
        PPData.append('cat_name', form.cat_name)
        PPData.append('content', form.content)
        fetcher('POST', 'https://dnews-dindin.herokuapp.com/articles', {
            data: PPData
        }).then((res) => {
            alert("Article has been successfully submitted")
            router.push("/")
        }).catch((err) => {
            if (err.response.status === 403 || err.response.status === 400) {
                alert(err.response.data.message)
            } else {
                alert("Internal server error, try again")
            }
        })

    }
    const handlePic = (e) => {
        e.preventDefault()
        setPic(e.target.files[0])
    }


    return (
        <Layout>
            <hr className='w-100 p-0 m-0' />
            <main className="container-fluid g-0 bg-cream p-5">
                <div className="upper-title w-50 d-flex justify-content-between py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-left text-blue pointer" viewBox="0 0 16 16"
                        onClick={() => router.back()}>
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                    <h4 className="text-blue">Write Article</h4>
                </div>
                <section className="main-content w-100 d-flex py-3">
                    <div className="left w-25 pe-3 d-flex flex-column justify-content-between">
                        <div className={`${styles.outerFrame} p-4 d-flex justify-content-center`}>
                            <div className={`${styles.inner} d-flex justify-content-center align-items-center text-blue-light`}>
                                {pic ? <Image src={URL.createObjectURL(pic)} height={500} width={299} className={styles.border} /> : "image here"}
                                {/* <Image src={Kucing} height={469} width={299} className={styles.border}/> */}
                            </div>
                        </div>
                        {/* custom upload file button */}
                        <form
                            encType='multipart/form-data'
                            className='wrapper-pp-modal w-100 d-flex justify-content-center pt-3'>
                            <input
                                className='pp-input' type='file'
                                onChange={handlePic}
                            />
                        </form>
                    </div>
                    <div className="right w-75 ms-3 d-flex flex-column justify-content-between">
                        <div className="upper w-100 d-flex justify-content-between">
                            <input
                                className={`w-50 m-3 p-3 bg-transparent ${styles.inputBorder}`}
                                type="text"
                                name="title"
                                placeholder="article title"
                                value={form.title}
                                onChange={handleChange} />
                            <select
                                className={`w-50 m-3 me-0 bg-transparent text-blue ${styles.inputBorder}`}
                                onChange={handleChange}
                                name="cat_name"
                                value={form.cat_name}>
                                <option value="Economy">Economy</option>
                                <option value="Politics">Politics</option>
                                <option value="Government">Government</option>
                                <option value="Career">Career</option>
                                <option value="Beauty">Beauty</option>
                                <option value="Culinary">Culinary</option>
                                <option value="Culture">Culture</option>
                                <option value="Health">Health</option>
                                <option value="Showbiz">Showbiz</option>
                            </select>
                        </div>
                        <div className={`lower w-100 flex-fill p-3`}>
                            <textarea
                                name="content"
                                className={`w-100 m-2 p-3 bg-transparent h-100 ${styles.inputBorder}`}
                                value={form.content}
                                onChange={handleChange}
                            >
                                Write your article here
                            </textarea>
                        </div>
                        {/* button here */}
                        <div
                            className={`${styles.menu} menu-1 w-100 m-3 my-5 blue-hover fw-bold text-cream p-3 bg-blue rounded-3 d-flex justify-content-center pointer`}
                            onClick={handleSubmit}>
                            Publish Article
                        </div>

                    </div>
                </section>
            </main>
        </Layout>
    )
}

export default PostArticle