import { useState } from 'react'
import Layout from '../../../components/layout'
import styles from './articles.module.css'
import Kucing from '../../../assets/kucingjulid.jpg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getProfile } from '../../api/user'

export const getServerSideProps = async () => {
  const politics = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/articles/politics?limit=4`, {
    method: 'GET'
  })
  const politic = await politics.json()

  const beauty = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/articles/beauty?limit=4`, {
    method: 'GET'
  })
  const beauts = await beauty.json()

  const showbiz = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/articles/showbiz?limit=4`, {
    method: 'GET'
  })
  const showbizz = await showbiz.json()

  const economy = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/articles/economy?limit=4`, {
    method: 'GET'
  })
  const economyy = await economy.json()

  const health = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/articles/health?limit=4`, {
    method: 'GET'
  })
  const healthh = await health.json()

  const government = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/articles/government?limit=4`, {
    method: 'GET'
  })
  const governmentt = await government.json()

  const culture = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/articles/culture?limit=4`, {
    method: 'GET'
  })
  const culturee = await culture.json()

  const culinary = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/articles/culinary?limit=4`, {
    method: 'GET'
  })
  const culinaryy = await culinary.json()

  const recommended = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/articles?sort=likes&order=desc&limit=4`, {
    method: 'GET'
  })
  const recs = await recommended.json()

  return {
    props: {
      politic: politic?.data,
      beauts: beauts?.data,
      showbizz: showbizz?.data,
      economyy: economyy?.data,
      healthh: healthh?.data,
      governmentt: governmentt?.data,
      culturee: culturee?.data,
      culinaryy: culinaryy?.data,
      recs: recs?.data
    }
  }
}


const Articles = ({politic, beauts, showbizz, economyy, healthh, governmentt, culturee, culinaryy, recs}) => {
  const [filter, setFilter] = useState(null)
  const {profile} = typeof window !== 'undefined' && getProfile()
  const router = useRouter()
  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
    console.log(filter);
  }
  console.log(profile);
  const handleRouter = () => {
    profile.role === 'author'? router.push("/main/articles/post-article") : alert("You are not an author yet!")
  }
  console.log(recs);

  return (
    <Layout>
      <main className={`container-fluid g-0 bg-cream ${styles.header}`}>
        <header className={`${styles.headerBG}`}>
          <div className="wrapper p-3 ps-5 w-50 d-flex flex-column justify-content-around">
            <h4 className={`text-blue ${styles.title}`}>Start Writing an Article</h4>
            <h6 className="text-blue my-5 w-75">You can be an author by being active in reading artciles in a month
              or you can request to be an author if you have been a member for three months.</h6>
            <div
              className="bg-blue px-3 py-2 text-center text-cream w-25 pointer blue-hover"
              onClick={handleRouter}
            >Start writing!</div>
          </div>
        </header>
        <section className="px-5 pb-5 bg-cream w-100">
          <div className="d-flex mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="26" fill="currentColor" class="bi bi-funnel-fill text-blue me-3" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
            </svg>
            <p className="text-blue">Filter Article : sort by <span className="fw-bold">{filter}</span> </p>
          </div>
          {/* filtering here */}
          <select
            className={`mt-2 bg-transparent py-2 px-5 ${styles.selectInput}`}
            onChange={handleChangeFilter}>
                    <option value="Name (A - Z)">Name (A - Z)</option>
                    <option value="Name (Z - A)">Name (Z - A)</option>
                    <option value="Category">Category</option>
                    <option value="Last Added">Last Added</option>
          </select>
          <section className="government w-100 mt-5">
            <div className="upper-category d-flex w-100 justify-content-between mb-3">
              <h5 className="text-blue">Recommended</h5>
              <h6 className="text-blue-light pointer">More</h6>
            </div>
            <div className="lower-category w-100 d-flex justify-content-between">
              {recs?.map((item, index) => {
                return (
                  <div 
                  className={`${styles.wrapperRec} d-flex flex-column m-3 pointer`}
                  onClick={()=> router.push(`/main/articles/detail/${item?.id}`)}
                  key={index}>
                  <Image src={item?.pic ? item.pic : Kucing} width={130} height={150} className={`${styles.recImg} h-50`} />
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
            </div>
          </section>

          {/* Government articles here */}
          <section className={politic.length > 0 ? "government w-100 mt-5" : "d-none"}>
            <div className="upper-category d-flex w-100 justify-content-between mb-3">
              <h5 className="text-blue">Politics</h5>
              <h6 className="text-blue-light pointer"
              onClick={()=>router.push('/main/category/Politics')}>More</h6>
              </div>
            <div className="lower-category w-100 d-flex justify-content-between">
              {politic?.map((item, index) => {
                return (
                  <div 
                  className={`${styles.wrapperRec} d-flex flex-column m-3 pointer`}
                  onClick={()=> router.push(`/main/articles/detail/${item?.id}`)}
                  key={index}>
                  <Image src={item?.pic ? item.pic : Kucing} width={130} height={150} className={`${styles.recImg} h-50`} />
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
            </div>
          </section>
          <section className={beauts.length > 0 ? "government w-100 mt-5" : "d-none"}>
            <div className="upper-category d-flex w-100 justify-content-between mb-3">
              <h5 className="text-blue">Beauty</h5>
              <h6 className="text-blue-light pointer"
              onClick={()=> router.push("/main/category/Beauty")}>More</h6>
            </div>
            {/* mapping sport articles here */}
            <div className="lower-category w-100 d-flex justify-content-between">
              {beauts?.map((item, index) => {
                return (
                  <div 
                  className={`${styles.wrapperRec} d-flex flex-column m-3 pointer`}
                  onClick={()=> router.push(`/main/articles/detail/${item?.id}`)}
                  key={index}>
                  <Image src={item?.pic ? item.pic : Kucing} width={130} height={150} className={`${styles.recImg} h-50`} />
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
            </div>
          </section>
          {/* Politics articles here */}
          <section className={showbizz.length > 0 ? "government w-100 mt-5" : "d-none"}>
            <div className="upper-category d-flex w-100 justify-content-between mb-3">
              <h5 className="text-blue">Showbiz</h5>
              <h6 className="text-blue-light pointer"
              onClick={()=> router.push("/main/category/Showbiz")}>More</h6>
            </div>
            {/* mapping Politics articles here */}
            <div className="lower-category w-100 d-flex justify-content-between">
              {showbizz?.map((item, index) => {
                return (
                  <div 
                  className={`${styles.wrapperRec} d-flex flex-column m-3 pointer`}
                  onClick={()=> router.push(`/main/articles/detail/${item?.id}`)}
                  key={index}>
                  <Image src={item?.pic ? item.pic : Kucing} width={130} height={150} className={`${styles.recImg} h-50`} />
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
            </div>
          </section>
          <section className={healthh.length > 0 ? "government w-100 mt-5" : "d-none"}>
            <div className="upper-category d-flex w-100 justify-content-between mb-3">
              <h5 className="text-blue">Health</h5>
              <h6 className="text-blue-light pointer"
              onClick={()=>router.push('/main/category/Health')}>More</h6>
            </div>
            {/* mapping Politics articles here */}
            <div className="lower-category w-100 d-flex justify-content-between">
              {healthh?.map((item, index) => {
                return (
                  <div 
                  className={`${styles.wrapperRec} d-flex flex-column m-3 pointer`}
                  onClick={()=> router.push(`/main/articles/detail/${item?.id}`)}
                  key={index}>
                  <Image src={item?.pic ? item.pic : Kucing} width={130} height={150} className={`${styles.recImg} h-50`} />
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
            </div>
          </section>
          <section className={economyy.length > 0 ? "government w-100 mt-5" : "d-none"}>
            <div className="upper-category d-flex w-100 justify-content-between mb-3">
              <h5 className="text-blue">Economy</h5>
              <h6 className="text-blue-light pointer"
              onClick={()=> router.push("/main/category/Economy")}>More</h6>
              </div>
            {/* mapping Politics articles here */}
            <div className="lower-category w-100 d-flex justify-content-between">
              {economyy?.map((item, index) => {
                return (
                  <div 
                  className={`${styles.wrapperRec} d-flex flex-column m-3 pointer`}
                  onClick={()=> router.push(`/main/articles/detail/${item?.id}`)}
                  key={index}>
                  <Image src={item?.pic ? item.pic : Kucing} width={130} height={150} className={`${styles.recImg} h-50`} />
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
            </div>
          </section>
          <section className={governmentt.length > 0 ? "government w-100 mt-5" : "d-none"}>
            <div className="upper-category d-flex w-100 justify-content-between mb-3">
              <h5 className="text-blue">Government</h5>
              <h6 className="text-blue-light pointer"
              onClick={()=> router.push("/main/category/Government")}>More</h6>
              </div>
            {/* mapping Politics articles here */}
            <div className="lower-category w-100 d-flex justify-content-between">
              {governmentt?.map((item, index) => {
                return (
                  <div 
                  className={`${styles.wrapperRec} d-flex flex-column m-3 pointer`}
                  onClick={()=> router.push(`/main/articles/detail/${item?.id}`)}
                  key={index}>
                  <Image src={item?.pic ? item.pic : Kucing} width={130} height={150} className={`${styles.recImg} h-50`} />
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
            </div>
          </section>
          <section className={culturee.length > 0 ? "government w-100 mt-5" : "d-none"}>
            <div className="upper-category d-flex w-100 justify-content-between mb-3">
              <h5 className="text-blue">Culture</h5>
              <h6 className="text-blue-light pointer"
              onClick={()=> router.push("/main/category/Culture")}>More</h6>
              </div>
            {/* mapping Politics articles here */}
            <div className="lower-category w-100 d-flex justify-content-between">
              {culturee?.map((item, index) => {
                return (
                  <div 
                  className={`${styles.wrapperRec} d-flex flex-column m-3 pointer`}
                  onClick={()=> router.push(`/main/articles/detail/${item?.id}`)}
                  key={index}>
                  <Image src={item?.pic ? item.pic : Kucing} width={130} height={150} className={`${styles.recImg} h-50`} />
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
            </div>
          </section>
          <section className={culinaryy.length > 0 ? "government w-100 mt-5" : "d-none"}>
            <div className="upper-category d-flex w-100 justify-content-between mb-3">
              <h5 className="text-blue">Culinary</h5>
              <h6 className="text-blue-light pointer"
              onClick={()=> router.push("/main/category/Culinary")}>More</h6>
              </div>
            {/* mapping Politics articles here */}
            <div className="lower-category w-100 d-flex justify-content-between">
              {culinaryy?.map((item, index) => {
                return (
                  <div 
                  className={`${styles.wrapperRec} d-flex flex-column m-3 pointer`}
                  onClick={()=> router.push(`/main/articles/detail/${item?.id}`)}
                  key={index}>
                  <Image src={item?.pic ? item.pic : Kucing} width={130} height={150} className={`${styles.recImg} h-50`} />
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
            </div>
          </section>

        </section>
      </main>
    </Layout>
  )
}

export default Articles