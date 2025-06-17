import Header from '@/components/Header'
import Videocard from '@/components/Videocard'
import React from 'react'
import {dummyCards} from '@/constants';

const Page = () => {
  return (
    <main className="wrapper page">
      <Header title="All Videos" subHeader='Public Library' />

      <section className="video-grid">
        {dummyCards.map((card)=>(
        <Videocard key={card.id} {...card}/>
      ))}
        </section>
       

    </main>
  )
}

export default Page