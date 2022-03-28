import { useState } from 'react'
import Layout from '../../../components/layout'
import styles from './category.module.css'
import Government from '../../../assets/government.svg'
import Health from '../../../assets/health.svg'
import Economy from '../../../assets/economy.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Category = () => {
    const router = useRouter()
    const [filter, setFilter] = useState(null)
    const handleChangeFilter = (e) => {
        setFilter(e.target.value)
        console.log(filter);
    }

    const cats = [
        { id: 1, name: "Politics" },
        { id: 2, name: "Health" },
        { id: 3, name: "Economy" },
        { id: 4, name: "Beauty" },
        { id: 5, name: "Career" },
        { id: 6, name: "Government" },
        { id: 7, name: "Culture" }, //bareng beauty
        { id: 8, name: "Culinary" },    //bareng economy
        { id: 9, name: "Showbiz" } //bareng politics
      ]
    

    return (
        <Layout>
            <main className="container-fluid g-0 bg-cream">
                <header className={`${styles.headerBG}`}>
                    <div className="wrapper p-3 ps-5 w-50">
                        <h4 className={`text-blue ${styles.title} mt-5`}>Choose Article by Category</h4>
                        <h6 className="text-blue my-5 w-75">Category helps you to read another article that you haven’t thought before.
                            You able to read all articles for free. Enjoy the reading!</h6>
                    </div>
                </header>
                {/* <section className='px-5'>
                    <div className="d-flex mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" fill="currentColor" class="bi bi-funnel-fill text-blue me-3" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
                        </svg>
                        <p className="text-blue">Filter Article : sort by <span className="fw-bold">{filter}</span> </p>
                    </div>

                </section> */}
                {/* filtering here */}
                {/* <div className="px-5">
                    <select
                        className={`mt-2 bg-transparent py-2 px-5 ${styles.selectInput}`}
                        onChange={handleChangeFilter}>
                        <option value="Name (A - Z)">Name (A - Z)</option>
                        <option value="Name (Z - A)">Name (Z - A)</option>
                        <option value="Category">Category</option>
                        <option value="Last Added">Last Added</option>
                    </select>
                </div> */}
                <section className="category w-100 mt-5 px-5">
                    <div className="upper-category d-flex w-100 justify-content-between pb-3">
                        <h5 className="text-blue">Government</h5>
                        <h6 className="text-blue-light pointer">Click the category to explore articles</h6>
                        <h6 className="text-blue-light pointer">9 categories found</h6>
                    </div>
                    <div className="lower-category w-100 d-flex justify-content-between flex-wrap px-3">
                        {cats.map((cat, index) => {
                            return (
                                <div 
                                className={`${styles.wrapperCat} d-flex flex-column pointer`} 
                                key={index}
                                onClick={()=>router.push(`/main/category/${cat.name}`)}
                                >
                                    {((cat.name == 'Politics' || cat.name == 'Government' || cat.name == 'Showbiz') && <Image src={Government} width={2*183} height={2*183} alt='' />) ||
                                        ((cat.name == 'Beauty' || cat.name == 'Health' || cat.name == 'Culture') && <Image src={Health} width={2*183} height={2*183} alt='' />) ||
                                        ((cat.name == 'Economy' || cat.name == 'Career' || cat.name == 'Culinary') && <Image src={Economy} width={2*183} height={2*183} alt='' />)}
                                    <p className="text-center text-blue fw-bold mt-2">{cat.name}</p>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </main>
        </Layout>
    )
}

export default Category