import styles from './boxleft.module.css'
import { useRouter } from 'next/router'

const BoxLeft = () => {
    const router = useRouter()
    return (
        <div className={`${styles.boxleft} w-50 bg-blue h-100`}>
            <div
                className={`pointer w-50 upper d-flex align-items-center`}
                onClick={() => router.push('/')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-chevron-left text-cream pointer" viewBox="0 0 16 16"
                >
                    <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                </svg>
                <h4 className="text-cream ms-3">Home Page</h4>
            </div>
            <div className="w-100 d-flex flex-column align-items-center mt-5">
                <h1 className={`${styles.titleText} mt-3 text-align-center text-cream`}>D'News</h1>
                <p className="text-cream text-align-center">newstoday@mail.com</p>
            </div>
            <div className="w-100 d-flex justify-content-center mt-5 pt-5">
                <div className="w-100 d-flex justify-content-between mb-3">
                    <hr className="w-25 text-cream" />
                    <p className="text-cream">Already have an account?</p>
                    <hr className="w-25 text-cream" />
                </div>
            </div>
            <div
                className={`${styles.radiusbtn} text-blue bg-blue-light w-100 my-5 p-3 d-flex justify-content-center`}
                onClick={() => router.push('/auth/login')}>
                Login Here
            </div>
            <div className={`w-100 d-flex justify-content-between`}>
                <div className={`left-section d-flex flex-column`}>
                    <p className="text-cream">Why D'News</p>
                    <p className="text-cream mt-3">Community</p>
                </div>
                <div className={`right-section d-flex flex-column`}>
                    <p className="text-cream">Be an author</p>
                    <p className="text-cream mt-3">FAQ</p>

                </div>
            </div>
        </div>
    )
}

export default BoxLeft