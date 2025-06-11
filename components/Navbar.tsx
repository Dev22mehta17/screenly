import Image from "@/node_modules/next/image"
import Link from "@/node_modules/next/link"

const user ={ };

const Navbar = () => {
  return (
   <header className="navbar">
    <nav>
        <Link href="/">
            <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32}/>
            <h1>Screenly</h1>
        </Link>
        {user && (
            <figure>
                <button>
                    <Image src="/assets/images/dummy.jpg" alt="User" width={36} height={36} className="rounded-full aspect-square "/>
                </button>
                <button className="Cursor-pointer">
                    <Image src="/assets/icons/logout.svg" alt="logout" width={24} height={24} className="rotate-180"/>

                </button>
            </figure>
        )}
    </nav>

   </header>
  )
}

export default Navbar