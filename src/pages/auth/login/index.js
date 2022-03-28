import styles from '../auth.module.css'
import Image from 'next/image'
import Google from '../../../assets/iconGoogle.svg'
import Facebook from '../../../assets/Facebook.svg'
import Twitter from '../../../assets/Twitter.svg'
import BoxLeftLogin from '../../../components/auth/box-left/boxleftLogin'
import { useState } from 'react'
import fetcher from '../../../helper/fetcher'
import { useRouter } from 'next/router'

const Login = () => {
    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const[errorMsg, setErrorMsg] = useState('')
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleLogin = () =>{
        console.log(form);
        fetcher('POST', 'http://localhost:5000/users/login', {data: form})
        .then((res)=> {
            const result = res?.data?.data[0]
            const token = result.token
            console.log(result);
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(result))
            router.push("/")
        }).catch((err)=> {
            if(err.response.status === 403 || err.response.status === 400){
                setErrorMsg(err.response.data.message)
            }else{
                setErrorMsg('Internal server error, try again later')
            }
        })
    }
  return (
    <main className={`${styles.con} container-fluid g-0 d-flex`}>
    <BoxLeftLogin />
    <div className={`${styles.boxright} box-right w-50 h-100 bg-cream`}>
        <h2 className="text-blue fw-bold">Login</h2>
        <p className="text-blue-light my-3">Hey, welcome back to News Today!</p>
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
        <div 
        className={`${styles.radiusbtn} text-cream bg-blue w-100 my-5 p-3 d-flex justify-content-center`}
        onClick={handleLogin}>
            Login
        </div>
        {errorMsg && <h3 className="text-danger">{errorMsg}</h3>}
        <p className="text-blue-light fw-bold w-100 text-center">OR LOG IN WITH:</p>
        <div className="image-wrapper w-75 mx-auto d-flex justify-content-between mt-3">
            <Image src={Google} width={50} height={50} alt='' />
            <Image src={Facebook} width={50} height={50} alt='' />
            <Image src={Twitter} width={50} height={50} alt='' />
        </div>
    </div>
</main>
)
}

export default Login