import React, { useState } from 'react'
import Layout from '../../../../components/layout'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Kucing from '../../../../assets/kucingjulid.jpg'
import styles from './detail.module.css'
import { getDetailArticle } from '../../../api/article'
import { getComments } from '../../../api/comment'
import fetcher from '../../../../helper/fetcher'

const ArticleDetail = () => {
    const router = useRouter()
    const id = router.query.id
    const user = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user'))
    const { article } = getDetailArticle(id)
    const { comments } = getComments(id)
    const DATE_OPTIONS = {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
    };
    const [comment, setComment] = useState('')
    const [like, setLike] = useState(false)
    const [save, setSave] = useState(false)

    const handleChange = (e) => {
        setComment(e.target.value)
    }

    const handleSubmit = () => {
        if (user) {
            fetcher('POST', 'http://localhost:5000/comment', {
                data: {
                    user_id: user.id,
                    article_id: id,
                    comment: comment
                }
            }).then((res) => {
                alert("comment posted")
                setComment('')
            }).catch((err) => {
                alert("Write comment!");
            })
        } else {
            alert("Please Log In First!")
            setComment('')
        }
    }

    const handleLike = () => {
        if (user) {
            if (!like) {
                fetcher('PUT', `http://localhost:5000/articles/like/${id}`)
                    .then((res) => {
                        setLike(true)       //kalo true, nanti di tambahin jmlh like, kalo ga, dikurangin
                        console.log("yha benar");
                    }).catch((err) => {
                        console.log(err);
                    })
            } else {
                fetcher('PUT', `http://localhost:5000/articles/dislike/${id}`)
                    .then((res) => {
                        setLike(false)       //kalo true, nanti di tambahin jmlh like, kalo ga, dikurangin
                        console.log("yha salah");
                    }).catch((err) => {
                        console.log(err);
                    })
            }
        } else {
            alert("Please Log In First!")
        }
    }

    const handleSave = () => {
        if (user) {
            if (!save) {
                fetcher('POST', `http://localhost:5000/saved-post`, {
                    data: {
                        user_id: user.id,
                        article_id: id
                    }
                })
                    .then((res) => {
                        setSave(true)       //kalo true, nanti di tambahin jmlh like, kalo ga, dikurangin
                        console.log("yha benar");
                    }).catch((err) => {
                        if (err.response.status === 403) {
                            alert(err.response.data.message)
                            setSave(true)
                        }
                    })
            } else {
                fetcher('DELETE', `http://localhost:5000/saved-post/${user.id}/${id}`)
                    .then((res) => {
                        setSave(false)       //kalo true, nanti di tambahin jmlh like, kalo ga, dikurangin
                        console.log("yha salah");
                    }).catch((err) => {
                        console.log(err);
                    })
            }
        } else {
            alert("Please Log In First!")
        }
    }

    //comment dummy
    // const comments = [{
    //     name: "Meongna",
    //     comment: "Imma prepare my paw for war!"
    // }, {
    //     name: "Meongni",
    //     comment: "Hold that thought @Meongna war brings sorrow to both parties"
    // }, {
    //     name: "Meongna",
    //     comment: "duhhh, boomer *shrugs*"
    // }
    // ]
    return (
        <Layout>
            <hr className='w-100 p-0 m-0' />
            <main className="container-fluid g-0 bg-cream p-5">
                <div className="upper-title w-50 d-flex justify-content-between py-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chevron-left text-blue pointer" viewBox="0 0 16 16"
                        onClick={() => router.back()}>
                        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                    <h4 className="text-blue">Article Viewer {id}</h4>
                </div>
                <div className={`${styles.wrapperContent}`}>
                    {/* article title, image, and info lays here */}
                    <section className={`upper-section w-100 d-flex flex-fill`}>
                        <Image src={Kucing} width={595} height={370} alt='' className='me-3' />
                        <div className="upper-right d-flex flex-column flex-fill justify-content-between ms-3">
                            <h2 className="text-blue">{article?.title}</h2>
                            <p className="text-blue">{article?.author} - Author</p>
                            <p className="text-blue-light">
                                {new Date(article?.updated).toLocaleDateString("en-GB", DATE_OPTIONS)}</p>
                            {/* likes and share section lays here */}
                            <div className="d-flex likes-and-save-section">
                                <div className={`d-flex align-items-center ${styles.wrapperLike}`}>
                                    {!like ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="32" fill="currentColor" class="bi bi-hand-thumbs-up text-blue me-2 pointer" viewBox="0 0 16 16" onClick={handleLike}>
                                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                                            </svg> {article?.likes}
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="32" fill="currentColor" class="bi bi-hand-thumbs-up-fill text-blue me-2 pointer" viewBox="0 0 16 16" onClick={handleLike}>
                                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                                            </svg> {article?.likes}
                                        </>
                                    )}
                                </div>
                                {!save ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="32" fill="currentColor" class="bi bi-save text-blue ms-3 pointer" viewBox="0 0 16 16" onClick={handleSave}>
                                        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
                                    </svg>
                                ) :
                                    (<svg xmlns="http://www.w3.org/2000/svg" width="27" height="32" fill="currentColor" class="bi bi-save-fill text-blue ms-3 pointer" viewBox="0 0 16 16" onClick={handleSave}>
                                        <path d="M8.5 1.5A1.5 1.5 0 0 1 10 0h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h6c-.314.418-.5.937-.5 1.5v7.793L4.854 6.646a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 9.293V1.5z" />
                                    </svg>)}
                            </div>
                            <div className={`${styles.radiusbtn} text-cream bg-blue w-75 my-5 p-3 d-flex justify-content-center pointer`}>
                                Share
                            </div>

                        </div>
                    </section>
                {/* article content lays here */}
                <section className={`w-100 my-lg-5 text-wrap text-blue lh-base ${styles.contentText}`}>
                    {article?.content}
                    <br />
                    <br />
                    During the 2019 Southeast Asian Games, governor the Sports Authority of Thailand (SAT) Kongsak Yodmanee criticised the organization of the games, as the Philippines held the games in many cities and municipalities, causing to the various concerns and controversies. He will propose to hold the next Thailand's Southeast Asian Games in "one" city or province. He also suggested Bangkok and Chonburi Province are the best choice for hosting the Thailand's games. He mentioned Bangkok traffic is less congested than Manila and the city has many existing venues for the games but water sports venues.
                    Bangkok hosted the inaugural games in 1959 and 1967 as Southeast Asian Peninsular Games, which were the precursor to the modern Southeast Asian Games, and 1985 as Southeast Asian Games. Bangkok hosted many global and continental events such as four-time Asian Games and Summer Universiade in 2007.
                    Bangkok will host the 2021 Asian Indoor and Martial Arts Games with Chonburi Province It acted as the test event and a prelude for the future multi-sport event, a proposed Youth Olympic Games in 2026.
                    During the 2019 Southeast Asian Games, governor the Sports Authority of Thailand (SAT) Kongsak Yodmanee criticised the organization of the games, as the Philippines held the games in many cities and municipalities, causing to the various concerns and controversies. He will propose to hold the next Thailand's Southeast Asian Games in "one" city or province. He also suggested Bangkok and Chonburi Province are the best choice for hosting the Thailand's games. He mentioned Bangkok traffic is less congested than Manila and the city has many existing venues for the games but water sports venues.
                    Bangkok hosted the inaugural games in 1959 and 1967 as Southeast Asian Peninsular Games, which were the precursor to the modern Southeast Asian Games, and 1985 as Southeast Asian Games. Bangkok hosted many global and continental events such as four-time Asian Games and Summer Universiade in 2007.
                    Bangkok will host the 2021 Asian Indoor and Martial Arts Games with Chonburi Province It acted as the test event and a prelude for the future multi-sport event, a proposed Youth Olympic Games in 2026.

                </section>
                </div>

                {/* comment section lays here */}
                <div className="w-100">
                <section className={`${styles.wrapperContent} d-flex flex-column align-items-center mb-3`}>
                    {/* input comment lays here */}
                    <div className={styles.wrapperComment}>
                    <div className="input-comment-section d-flex align-items-center">
                        <div className="d-flex align-items-center me-3">
                            <Image src={Kucing} width={55} height={55} className={`rounded me-2`} alt='' />
                            <div className="d-flex flex-column">
                                <p className="fw-bold text-blue mb-0">You</p>
                                <input
                                    className={`${styles.inputComment} bg-transparent`}
                                    name='comment'
                                    onChange={handleChange}
                                    value={comment}
                                    placeholder='Leave you comment here' />
                            </div>
                        </div>
                        <p className={`text-cream bg-blue ${styles.buttonSubmit} d-flex align-items-center pointer ms-3`} onClick={handleSubmit}>Submit</p>
                    </div>
                    {/* mapping comment here */}
                    {comments?.map((comment, index) => {
                        return (
                            <div className="d-flex align-items-center my-3" key={index}>
                                <Image src={Kucing} width={55} height={55} className={`rounded me-2`} alt='' />
                                <div className="d-flex flex-column">
                                    <p className="fw-bold text-blue mb-0">{comment?.username}</p>
                                    <p className="text-blue text-wrap w-100">{comment?.comment}</p>
                                </div>
                            </div>
                        )
                    })}

                    </div>
                </section>
                </div>
            </main>
        </Layout>
    )
}

export default ArticleDetail