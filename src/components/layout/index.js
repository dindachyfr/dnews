import Footer from "../main/footer"
import Navbar from "../main/navbar"

const Layout = (props) => {
    const{children} = props
  return (
    <>
    <Navbar/>
    <div>{children}</div>
    <Footer/>
    </>
  )
}

export default Layout