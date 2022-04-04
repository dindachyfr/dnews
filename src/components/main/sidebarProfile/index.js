import styles from './profedit.module.css'
import Image from 'next/image'
import Kucing from '../../../assets/kucingjulid.jpg'
import { makePublicRouterInstance, useRouter } from 'next/router'
import { getProfile } from '../../../pages/api/user'

const Sidebar = (props) => {
    const{children} = props
    const router = useRouter()
    const {profile, error} = getProfile()
    const handleLogout = () => {
        localStorage.clear()
        router.push("/")
    }
    // const profile = {
    //     name: "Meong Meong",
    //     email: "meong@mail.com",
    //     username: "meongwati",
    //     role: "member",
    //     job: "thief",
    //     about: "sometimes i meow, sometimes i dont. but i always have my eyes on your plate"
    // }

    return (
        <>
            <hr className='w-100 p-0 m-0' />
            <main className={`${styles.mainCon} container-fluid g-0 bg-cream d-flex`}>
                <section className="left w-25 d-flex p-5 pe-0 justify-content-between flex-column">
                    <h4 className="text-blue">Profile</h4>
                    <div className={`${styles.profileBox} p-3 rounded-3 shadow-lg w-75 mx-3`}>
                        <div className="upper d-flex">
                            <Image src={profile?.profile_picture ? profile.profile_picture : Kucing} width={66} height={60} alt='' className='rounded-3' />
                            <div className="d-flex flex-column justify-content-between ms-3">
                                <p className="text-blue-light">@{profile?.username}</p>
                                <h6 className="text-blue fw-bold">{profile?.name}</h6>
                                <h5 className="text-blue-light">{profile?.role}</h5>
                            </div>
                        </div>
                        <div className="lower mt-3">
                            <p className="text-blue fw-bold mb-0">About</p>
                            <p className="text-blue text-wrap">{profile?.about}</p>
                        </div>
                    </div>
                    <div className="h-50 d-flex flex-column justify-content-between">
                        <div
                            className={`${styles.menu} menu-1 w-75 mx-3 p-3 rounded-3 d-flex justify-content-between pointer`}
                            onClick={() => router.push('/main/profile-edit')}>
                            <p className="fw-bold text-blue mb-0">Edit Profile</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-chevron-right text-blue" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                        <div className={`${styles.menu} menu-1 w-75 mx-3 p-3 rounded-3 d-flex justify-content-between pointer`}
                            onClick={() => router.push('/main/saved-posts')}
                        >
                            <p className="fw-bold text-blue mb-0">Saved Posts</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-chevron-right text-blue" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                        <div className={`${styles.menu} menu-1 w-75 mx-3 p-3 rounded-3 d-flex justify-content-between pointer`}>
                            <p className="fw-bold text-blue mb-0">FAQ</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-chevron-right text-blue" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                        <div className={`${styles.menu} menu-1 w-75 mx-3 p-3 rounded-3 d-flex justify-content-between pointer`}>
                            <p className="fw-bold text-blue mb-0">Help</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" class="bi bi-chevron-right text-blue" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                        <div 
                        className={`${styles.menu} menu-1 w-75 mx-3 blue-hover fw-bold text-cream p-3 bg-blue rounded-3 d-flex justify-content-center pointer`}
                        onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                </section>
                <div className='w-75 border-start'>{children}</div>
            </main>
        </>
    )
}

export default Sidebar