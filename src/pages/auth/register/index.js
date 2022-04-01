import BoxLeft from '../../../components/auth/box-left'
import styles from '../auth.module.css'
import Image from 'next/image'
import Google from '../../../assets/iconGoogle.svg'
import Facebook from '../../../assets/Facebook.svg'
import Twitter from '../../../assets/Twitter.svg'
import { useState } from 'react'
import fetcher from '../../../helper/fetcher'
import { useRouter } from 'next/router'


const Register = () => {
    const router = useRouter()
    const[errorMsg, setErrorMsg] = useState("")
    const [form, setForm] =  useState({
        email:'',
        password:'',
        phone_number:''
    })
    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleSubmit = () => {
        console.log(form);
        fetcher('POST', `https://dnews-dindin.herokuapp.com/users/register`, {data: form})
        .then((res)=> {
            router.push("/auth/login")
        }).catch((err)=> {
            if(err.response.status === 403 || err.response.status === 400){
                setErrorMsg(err.response.data.message)
            }else{
                setErrorMsg('Internal server error, try again later')
            }
        })

    }
    return (
        <>
            <main className={`${styles.con} container-fluid g-0 d-flex`}>
                <BoxLeft />
                <div className={`${styles.boxright} box-right w-50 h-100 bg-cream`}>
                    <h2 className="text-blue fw-bold">Sign Up</h2>
                    <p className="text-blue-light my-3">Hey, welcome to News Today! Create an account to enjoy our full feautres!</p>
                    <h5 className="text-blue mt-5 mb-3">Email Address:</h5>
                    <input
                        className={`w-100 p-3 bg-transparent ${styles.inputBorder}`}
                        type="text"
                        name="email"
                        onChange={handleChange}
                        value={form.email}
                        placeholder="Enter your email address" />
                    <h5 className="text-blue mt-3 mb-3">Password:</h5>
                    <input
                        className={`w-100 p-3 bg-transparent ${styles.inputBorder}`}
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={form.password}
                        placeholder="Enter your password" />
                    <h5 className="text-blue mt-3 mb-3">Phone Number:</h5>
                    <input
                        className={`w-100 p-3 bg-transparent ${styles.inputBorder}`}
                        type="number"
                        name="phone_number"
                        onChange={handleChange}
                        value={form.phone_number}
                        placeholder="Enter your phone number" />
                    <div 
                    className={`${styles.radiusbtn} text-cream bg-blue w-100 my-5 p-3 d-flex justify-content-center`}
                    onClick={handleSubmit}>
                        Sign Up
                    </div>
                    {errorMsg && <h3 className="text-danger">{errorMsg}</h3>}
                    <p className="text-blue-light fw-bold w-100 text-center">OR SIGN UP WITH:</p>
                    <div className="image-wrapper w-75 mx-auto d-flex justify-content-between mt-3">
                        <Image src={Google} width={50} height={50} alt='' />
                        <Image src={Facebook} width={50} height={50} alt='' />
                        <Image src={Twitter} width={50} height={50} alt='' />
                    </div>
                </div>
            </main>
        </>
    )
}

export default Register