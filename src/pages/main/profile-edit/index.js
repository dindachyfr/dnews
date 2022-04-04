import Image from 'next/image'
import Layout from '../../../components/layout'
import styles from './profedit.module.css'
import Kucing from '../../../assets/kucingjulid.jpg'
import { useEffect, useState } from 'react'
import Sidebar from '../../../components/main/sidebarProfile'
import { getProfile } from '../../api/user'
import fetcher from '../../../helper/fetcher'

const Profedit = () => {
    const [form, setForm] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        job: '',
        about: ''
    })
    const [modal, setModal] = useState(false)
    const [PP, setPP] = useState(null)
    const handleModal = () => setModal(!modal)
    const { profile, error } = typeof window !== 'undefined' && getProfile()
    console.log(profile);
    const handlePP = (e) => {    //buat nampung file PP
        e.preventDefault()
        setPP(e.target.files[0])
        console.log(PP);
    }

    const handleSetPP = (e) => { //buat upload PP
        e.preventDefault()
        const PPData = new FormData()
        PPData.append('profile_picture', PP)
        fetcher('PUT', `http://localhost:5000/users/profile-picture/${profile.id}`, {
            data: PPData
        })
        .then((res) => {
            setModal(!modal)
        }).catch((err)=>{
            console.log(err.message);
        })
    }

    // const profile = {
    //     name: "Meong Meong",
    //     email: "meong@mail.com",
    //     username: "meongwati",
    //     role: "member",
    //     job: "thief",
    //     about: "sometimes i meow, sometimes i dont. but i always have my eyes on your plate"
    // }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = () => {
        fetcher('PUT', `https://dnews-dindin.herokuapp.com/users/${profile.id}`, {
            data: form
        }).then((res) => {
            alert("Profile has been successfully updated")
            setForm({
                name: '',
                username: '',
                password: '',
                email: '',
                job: '',
                about: ''
            })
        }).catch((err) => {
            if (err.response.status === 403 || err.response.status === 400) {
                alert(err.response.data.message)
            } else {
                alert("Internal server error, try again")
            }
        })
    }

    const handleUpdateRole = () => {
        if(profile.role === "member"){
            fetcher('PUT', `https://dnews-dindin.herokuapp.com/users/author/${profile.id}`)
            .then((res) => {
                window.reload()
            }).catch((err) => {
                console.log(err);
            })
        }
        else{
            alert("You are already an author!")
        }
    }


    return (
        <Layout>
            {/* <hr className='w-100 p-0 m-0' />
            <main className={`${styles.mainCon} container-fluid g-0 bg-cream d-flex`}> */}
            <Sidebar>
                <section className="right p-5">
                    <div className="upper d-flex w-100 justify-content-center">
                        <Image src={profile?.profile_picture ? profile.profile_picture : Kucing} width={113} height={113} className='radius-50' alt='' />
                    </div>
                    <div className="d-flex w-100 justify-content-center mt-3">
                        <p className="text-blue-light me-2 pointer"
                            onClick={handleModal}>Edit Photo</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil text-blue-light" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                    </div>
                    <div className="form-profile d-flex flex-fill h-75 w-100">
                        <div className="left-form w-50 d-flex flex-column justify-content-between pb-5">
                            <div className="form-1">
                                <h5 className="text-blue mt-3 mb-3">Username:</h5>
                                <input
                                    className={`w-75 p-3 bg-transparent ${styles.inputBorder}`}
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    value={form.username}
                                    placeholder={profile?.username ? `@${profile.username}` : "Enter your username"} />

                            </div>
                            <div className="form-2">
                                <h5 className="text-blue mt-5 mb-3">Email:</h5>
                                <input
                                    className={`w-75 p-3 bg-transparent ${styles.inputBorder}`}
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    value={form.email}
                                    placeholder={profile?.email ? profile.email : "Enter your email"} />
                            </div>
                            <div className="form-3">
                                <h5 className="text-blue mt-5 mb-3">Job:</h5>
                                <input
                                    className={`w-75 p-3 bg-transparent ${styles.inputBorder}`}
                                    type="text"
                                    name="job"
                                    onChange={handleChange}
                                    value={form.job}
                                    placeholder={profile?.job ? profile.job : "Enter your job"} />
                            </div>
                            <div className="form-4">
                                <h5 className="text-blue mt-5 mb-3">About:</h5>
                                <input
                                    className={`w-75 p-3 bg-transparent ${styles.inputBorder} text-wrap`}
                                    type="text"
                                    name="about"
                                    onChange={handleChange}
                                    value={form.about}
                                    placeholder={profile?.about ? profile.about : "Tell about yourself within 140 characters"} />
                            </div>
                        </div>
                        <div className="right-form ms-5 w-50 pe-3">
                            <div className="form-1">
                                <h5 className="text-blue mt-3 mb-3">Name:</h5>
                                <input
                                    className={`w-75 p-3 bg-transparent ${styles.inputBorder}`}
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={form.name}
                                    placeholder={profile?.name ? profile.name : "Enter your name"} />
                            </div>
                            <div className="form-2 mt-3">
                                <h5 className="text-blue mt-5 mb-3">Password:</h5>
                                <input
                                    className={`w-75 p-3 bg-transparent ${styles.inputBorder}`}
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={form.password}
                                    placeholder="Enter new password" />
                            </div>
                            <div
                                className={`${styles.menu} menu-1 w-75 m-3 my-5 blue-hover fw-bold text-cream p-3 bg-blue rounded-3 d-flex justify-content-center pointer`}
                                onClick={handleUpdateRole}>
                                Be an author
                            </div>
                            <div
                                className={`${styles.menu} menu-1 w-75 m-3 my-5 blue-hover fw-bold text-cream p-3 bg-blue rounded-3 d-flex justify-content-center pointer`}
                                onClick={handleSubmit}>
                                Save Changes
                            </div>

                        </div>

                    </div>
                </section>
                {modal &&
                    <main class={`${styles.conModal} container-fluid d-flex flex-column p-0 justify-content-between`}>
                        <div class={`${styles.modalPin} d-flex flex-column justify-content-around bg-light w-25 p-3 m-3`}>
                            <div class="top-modal d-flex justify-content-between mt-5">
                                <h4>Set Profile Picture</h4>
                                <h3 class="close-modal pointer" onClick={handleModal}>x</h3>
                            </div>
                            <p class="text-blue-light">Set a cool picture of you to your profile</p>
                            <div className='wrapper-pp-modal w-100 d-flex justify-content-center'>
                                <img className="user-pic-modal my-auto" width={113} height={113} src={profile.profile_picture ? profile.profile_picture : Kucing} alt="" />
                            </div>
                            <form
                                encType='multipart/form-data'
                                className='wrapper-pp-modal w-100 d-flex justify-content-center pt-3'>
                                <input className='pp-input' type='file'
                                onChange={handlePP} 
                                />
                            </form>
                            <div class="button-wrapper w-100 d-flex justify-content-center">
                                <div
                                    className={`${styles.menu} menu-1 w-75 m-3 my-5 blue-hover fw-bold text-cream p-3 bg-blue rounded-3 d-flex justify-content-center pointer`}
                                onClick={handleSetPP}
                                >
                                    Save Changes
                                </div>
                            </div>

                        </div>
                    </main>
                }
            </Sidebar>
            {/* </main> */}
        </Layout>
    )
}

export default Profedit