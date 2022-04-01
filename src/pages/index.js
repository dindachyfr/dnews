import styles from './home.module.css'
import Image from 'next/image'
import Economy from '../assets/economy.svg'
import Government from '../assets/government.svg'
import Health from '../assets/health.svg'
import Kucing from '../assets/kucingjulid.jpg'
import Kayla from '../assets/kayla.svg'
import { useState } from 'react'
import Layout from '../components/layout'
import { useRouter } from 'next/router'

export const getServerSideProps = async () => {
  const categories = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/category?limit=6`, {
      method : 'GET'
  })
  const latestArts = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/articles?sort=updated&order=desc&limit=9`, {
      method : 'GET'
  })

  const recArts = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/articles?sort=likes&order=desc&limit=4`, {
      method : 'GET'
  })
  const cats = await categories.json()
  const latest = await latestArts.json()
  const recs = await recArts.json()
  return {
      props : {
          cats: cats?.data,
          latest : latest?.data,
          recs: recs?.data
      }
  }
}

const Home = ({cats, latest, recs}) => {
  const router = useRouter()
  // const {cats, isError} = getCategory()
  // const {recs} = getPopular()
  // const {latest} = getLatest()
  const [save, setSave] = useState(false)

  const handleSave = () => {
    setSave(!save)
  }

  // const recs = Array(3).fill(1)
  const latests = Array(9).fill(1)

  return (
    <Layout>
      <main className="container-fluid g-0 bg-cream">
        <header className={`${styles.headerBG}`}>
          <div className="wrapper p-3 ps-5 w-50">
            <h4 className={`text-blue ${styles.title} mt-5`}>Share Information and Educate People</h4>
            <h6 className="text-blue my-5 w-75">Everyone has their point of view of something, but just don’t be afraid to express the facts. Be an author and share you prespective of something to the world.</h6>
            <div
              className="bg-blue px-3 mt-5 py-2 text-center text-cream w-25 pointer blue-hover"
              onClick={()=>router.push("/main/articles")}
            >Start Exploring!</div>
          </div>
        </header>
        <section className="px-5 pb-5 bg-cream w-100">
          <h5 className="text-blue mt-5 mb-3">Search Article</h5>
          <form className={`input-group flex-nowrap ${styles.formInput} w-25 mb-5 p-2`}>
            <span className={`input-group-text ${styles.spanWrapping}`} id="addon-wrapping">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </span>
            <input
              name="search"
              type="text"
              className={`${styles.formControl}`}
              placeholder="Search"
              aria-describedby="addon-wrapping"
            />
          </form>

          {/* category section */}
          <section className="category w-100 my-5">
            <div className="upper-category d-flex w-100 justify-content-between mb-3">
              <h5 className="text-blue">Category</h5>
              <h6 className="text-blue-light pointer" onClick={()=> router.push("/main/category")}>More</h6>
            </div>
            <div className="lower-category w-100 d-flex justify-content-between flex-wrap px-3">
              {cats?.map((cat, index) => {
                return (
                  <div 
                  className={`${styles.wrapperCat} d-flex flex-column pointer`}
                   key={index}
                   onClick={()=>router.push(`/main/category/${cat.cat_name}`)}
                   >
                    {((cat.cat_name == 'Politics' || cat.cat_name == 'Government' || cat.cat_name == 'Showbiz')  && <Image src={Government} width={183} height={183} alt='' />) ||
                      ((cat.cat_name == 'Beauty' || cat.cat_name == 'Health' || cat.cat_name == 'Culture') && <Image src={Health} width={183} height={183} alt='' />) ||
                      ((cat.cat_name == 'Economy' || cat.cat_name == 'Career' || cat.cat_name == 'Culinary') && <Image src={Economy} width={183} height={183} alt='' />)}
                    <p className="text-center text-blue fw-bold mt-2">{cat.cat_name}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* recommended section */}
          <section className="recommended w-100 my-5">
            <div className="upper-category d-flex w-100 justify-content-between mb-3">
              <h5 className="text-blue">Recommended</h5>
              <h6 className="text-blue-light pointer">More</h6>
            </div>
            {/* mapping recommendations here */}
            <div className="lower-category w-100 d-flex justify-content-between px-3">
              {recs?.map((item, index) => {
                return (
                  <div 
                  className={`${styles.wrapperRec} d-flex flex-column m-3 pointer`}
                  onClick={()=> router.push(`/main/articles/detail/${item?.id}`)}
                  key={index}>
                  <Image src={Kucing} width={130} height={150} className={`${styles.recImg} h-50`} />
                  <div className="rec-right p-3 d-flex flex-fill flex-column justify-content-between">
                    <div className="rec-right-upper h-50">
                      <h5 className="text-blue">{item?.title.substr(0, 35)}</h5>
                      <p className="text-blue">{item?.content.substr(0,40)}</p>
                    </div>
                    <div className="rec-right-lower d-flex justify-content-between align-items-center">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up text-blue me-2 pointer" viewBox="0 0 16 16">
                          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                        </svg>
                        {item?.likes}
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock text-blue me-2" viewBox="0 0 16 16">
                          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                        </svg>
                        {new Date(item?.updated).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                )
              })}
              {/* {recs?.map((rec, index) => {
                return (
                  <div 
                  className={`${styles.wrapperRec} d-flex pointer`}
                  key={index}
                  onClick={()=>router.push(`/main/articles/detail/${rec?.id}`)}>
                  <Image src={Kucing} width={130} height={202} className={`${styles.recImg}`} />
                  <div className="rec-right p-3 d-flex flex-fill flex-column justify-content-between">
                    <div className="rec-right-upper">
                      <h5 className="text-blue">{rec?.title}</h5>
                    </div>
                    <div className="rec-right-lower d-flex justify-content-between align-items-center">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up text-blue me-2 pointer" viewBox="0 0 16 16">
                          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                        </svg>{rec?.likes}
                      </div>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock text-blue me-2" viewBox="0 0 16 16">
                          <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                        </svg>
                        {new Date(rec?.updated).toLocaleDateString()}
                      </div>
                      {!save ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-save text-blue pointer" viewBox="0 0 16 16" onClick={handleSave}>
                          <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                        </svg>
  
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-save-fill text-blue pointer" viewBox="0 0 16 16" onClick={handleSave}>
                          <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z" />
                        </svg>)}
                    </div>
                  </div>
                </div>
                  )
              })} */}
            </div>
          </section>
        </section>
        {/* success story section */}
        <section className={`${styles.sucessSS} bg-blue w-100 p-5`}>
          <div className={`wrapper mt-3 d-flex justify-content-between w-100 h-100`}>
            <div className="left-section w-50 d-flex justify-content-around flex-column h-100">
              <div className="wrapper w-50">
              <h3 className="text-cream">Let's hear about Kayla's success story</h3>
              </div>
              <div className="wrapper w-50">
              <h5 className="text-cream">See how well News Today works in a real user’s life. </h5>
              </div>
            <div
              className="bg-cream px-3 py-2 text-center text-blue w-25 pointer"
            >Lets get started!</div>
          </div>
          <Image src={Kayla} width={672} height={390} alt='' />
            </div>
        </section>
        {/* latest news section */}
        <section className={` w-100 p-5`}>
          <h5 className="text-blue mb-3">Latest News</h5>
          <main className=" mt-3 lower-category w-100 d-flex justify-content-between flex-wrap px-3">
            {latest?.map((item, index) => {
              return (
                <div 
                className={`${styles.wrapperRec} d-flex flex-column m-3 pointer`}
                onClick={()=> router.push(`/main/articles/detail/${item?.id}`)}
                key={index}>
                <Image src={Kucing} width={130} height={150} className={`${styles.recImg} h-50`} />
                <div className="rec-right p-3 d-flex flex-fill flex-column justify-content-between">
                  <div className="rec-right-upper h-50">
                    <h5 className="text-blue">{item?.title.substr(0, 35)}</h5>
                    <p className="text-blue">{item?.content.substr(0,40)}</p>
                  </div>
                  <div className="rec-right-lower d-flex justify-content-between align-items-center">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up text-blue me-2 pointer" viewBox="0 0 16 16">
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                      </svg>
                      {item?.likes}
                    </div>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock text-blue me-2" viewBox="0 0 16 16">
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                      </svg>
                      {new Date(item?.updated).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              //   <div 
              //   className={`${styles.wrapperRec} d-flex my-3 pointer`} 
              //   key= {index}
              //   onClick={()=>router.push(`/main/articles/detail/${item?.id}`)}>
              //   <Image src={Kucing} width={130} height={202} className={`${styles.recImg}`} />
              //   <div className="rec-right p-3 d-flex flex-fill flex-column justify-content-between">
              //     <div className="rec-right-upper">
              //       <h5 className="text-blue">{item?.title}</h5>
              //     </div>
              //     <div className="rec-right-lower d-flex justify-content-between align-items-center">
              //       <div>
              //         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up text-blue me-2 pointer" viewBox="0 0 16 16">
              //           <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
              //         </svg>
              //         {item?.likes}
              //       </div>
              //       <div>
              //         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock text-blue me-2" viewBox="0 0 16 16">
              //           <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
              //           <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
              //         </svg>
              //         {new Date(item?.updated).toLocaleDateString()}
              //       </div>
              //       {!save ? (
              //         <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-save text-blue pointer" viewBox="0 0 16 16" onClick={handleSave}>
              //           <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
              //         </svg>

              //       ) : (
              //         <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-save-fill text-blue pointer" viewBox="0 0 16 16" onClick={handleSave}>
              //           <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z" />
              //         </svg>)}
              //     </div>
              //   </div>
              // </div>

              )
            })}
          </main>

        </section>
      </main>

    </Layout>
  )
}

export default Home