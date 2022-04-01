import Kucing from '../../../assets/kucingjulid.jpg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './navbar.module.css'

const Navbar = () => {
    const auth = typeof window !== 'undefined' && localStorage.getItem('token')
    const router = useRouter()
    const [home, setHome] = useState(false)
    const [articles, setArticles] = useState(false)
    const [cat, setCat] = useState(false)
    const [about, setAbout] = useState(false)

    const Jalan = () => {
        if (router.pathname.includes("/")) {
            setHome(true)
            setArticles(false)
            setCat(false)
            setAbout(false)
        }
        if (router.pathname.includes("/main/articles")) {
            setHome(false)
            setArticles(true)
            setCat(false)
            setAbout(false)
        }
        if (router.pathname.includes("category")) {
            setHome(false)
            setArticles(false)
            setCat(true)
            setAbout(false)
        }
        if (router.pathname.includes("profile")) {
            setHome(false)
            setArticles(false)
            setCat(false)
            setAbout(false)
        }

    }

    const handleNavigate1 = () => {
        router.push('/')
    }

    const handleNavigate2 = () => {
        router.push('/main/articles')
    }

    const handleNavigate3 = () => {
        router.push('/main/category')
    }

    const handleNavigate4 = () => {
        setHome(false)
        setArticles(false)
        setCat(false)
        setAbout(true)
        // router.push('/main/about')
    }

    useEffect(() => {
        typeof window !== 'undefined' && Jalan()
    }, [router.pathname])

    return (
        <>
            <header className={`container-fluid bg-cream g-0 py-3 px-5 d-flex justify-content-between align-items-center`}>
                <h3 className="fw-bold text-blue pointer" onClick={()=>router.push("/")}>D'News</h3>
                <div className="navbar-menu w-50 d-flex justify-content-between align-items-center">
                    <span
                        className={home ? `text-blue pointer ${styles.borderBottom}` : "text-blue pointer"}
                        name="setHome"
                        onClick={handleNavigate1}>Home</span>
                    <span
                        className={articles ? `text-blue pointer ${styles.borderBottom}` : "text-blue pointer"}
                        onClick={handleNavigate2}>Articles</span>
                    <span
                        className={cat ? `text-blue pointer ${styles.borderBottom}` : "text-blue pointer"}
                        onClick={handleNavigate3}>Category</span>
                    <span
                        className={about ? `text-blue pointer ${styles.borderBottom}` : "text-blue pointer"}
                        onClick={handleNavigate4}>About</span>
                </div>
                <div className="right-section d-flex align-items-center">
                    {auth ? (<>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bell text-blue me-3" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
                        </svg>
                        <Image src={Kucing} blurDataURL={Kucing} width={35} height={35} className='radius-50' alt='' onClick={()=>router.push('/main/profile-edit')} />
                    </>) : (
                        <>
                            <span
                                className="text-blue fw-bold me-5 pointer"
                                onClick={() => router.push('/auth/register')}
                            >Sign Up</span>
                            <div
                                className="bg-blue px-3 py-2 text-center text-cream pointer"
                                onClick={() => router.push('/auth/login')}
                            >Login</div>
                        </>
                    )}
                </div>
            </header>
        </>
    )
}

export default Navbar