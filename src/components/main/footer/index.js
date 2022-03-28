import styles from './footer.module.css'

const Footer = () => {

    return (
        <div className={`${styles.footer} footer container-fluid g-0 p-5 pb-4 bg-blue d-lg-block d-none`}>
            <div className="wrapper p-5 d-flex justify-content-between align-items-center">
                <div className={`d-flex justify-content-between flex-column`}>
                    <p className="text-cream mb-5">Why D'News</p>
                    <p className="text-cream mb-5">Be an Author</p>
                    <p className="text-cream mb-5">Community</p>
                    <p className="text-cream">FAQ</p>
                </div>
                <div className={`d-flex justify-content-between flex-column`}>
                    <h3 className="text-cream fw-bold text-end mb-5">D'News</h3>
                    <p className="text-cream text-end mb-5">Jendral Sudirman Street No. 23
                        Jakarta, Indonesia</p>
                    <p className="text-cream text-end mb-5">(621)989898934</p>
                    <p className="text-cream text-end">newstoday@mail.com</p>
                </div>
            </div>
        </div>
    )
}

export default Footer