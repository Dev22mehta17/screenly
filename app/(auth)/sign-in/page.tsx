'use client'

import { authClient } from '@/lib/auth-client'
import Image from '@/node_modules/next/image'
import Link from '@/node_modules/next/link'
import React from 'react'
// import { arrayBuffer } from 'stream/consumers'

const page = () => {
  const handleSignIn =async()=>{
    return await authClient.signIn.social({provider: 'google'})
  }
  return (
    <main className='sign-in'>
      <aside className='testimonial'>
        <Link href="/">
          <Image src="/assets/icons/logo.svg" alt="logo" width={32} height={32} />
          <h1>Screenly</h1>
        </Link>
        <div className='description'>
          <section>
            <figure>
              {Array.from({length:5}).map((_,index)=>(
                <Image src="/assets/icons/star.svg" alt="star" width={20} height={20} key={index} />
              ))}
            </figure>
            <p>
            Screenly simplifies screen recording — whether it's a quick demo or a full presentation, it's seamless, efficient, and ready to share in seconds.
            </p>
            <article>
              <Image src="/assets/images/jason.png" alt="jason" width={64} height={64} className="rounded-full" />
              <div>
                <h2>
                  Jason Rivera
                </h2>
                <p>Product Designer , NovaByte</p>
              </div>
            </article>
          </section>
        </div>
            <p>© Screenlyy {(new Date()).getFullYear()} </p>
      </aside>
      <aside className='google-sign-in'>
        <section>
          <Link href="/">
          <Image src="/assets/icons/logo.svg" alt="logo" width={40} height={40} />
          <h1>Screenly</h1>
          </Link>
          <p>Create and share your very first <span>Screenly video</span> in no time!!</p>
          <button onClick={handleSignIn}>
            <Image src="/assets/icons/google.svg" alt="google" width={22} height={32} />
            <span>Sign in with Google</span>
          </button>
        </section>

      </aside>
      <div className='overlay'/>

    </main>
  )  
}

export default page