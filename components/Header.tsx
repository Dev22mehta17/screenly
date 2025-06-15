
const Header = ({subHeader,title,userImg}:SharedHeaderProps) => {
  return (
    <header className="header">
        <section className="header-container">
            <div className="details">
                {userImg && (
                    <Image src={userImg || 'assets/images/dummy.jpeg'} alt="user" width={66} height={66} className="rounded-full"/>
                    )
                }
                <article>
                    <p>{subHeader}</p>
                    <h1>{title}</h1>
                </article>
            </div>
            <aside>
                <link href="/upload">
                    {/* <Image src="/assets/icons/upload.svg" alt="upload"width={16} height={16}/> */}
                    <span>Upload A Video</span>
                </link>
            </aside>
        </section>
    </header>
  )
}

export default Header