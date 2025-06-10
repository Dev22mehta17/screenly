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
    </nav>

   </header>
  )
}

export default Navbar