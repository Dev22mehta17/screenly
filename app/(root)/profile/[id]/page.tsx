import Header from "@/components/Header";
import Videocard from "@/components/Videocard";
import {dummyCards} from '@/constants';

const page = async({params}:ParamsWithSearch) => {
    const {id } = await params;
  return (
    <div className="wrapper page" >
        <Header subHeader="mehtadev2004@gmail.com" title="Dev Mehta |  Project " userImg="/assets/images/dummy.jpg"  />
        <section className="video-grid">
        {dummyCards.map((card)=>(
        <Videocard key={card.id} {...card}/>
      ))}
        </section>
        
    </div>
  )
}

export default page