//import testimonial data
import {testimonials} from '../../data'

//import swiper react component
import {Swiper,SwiperSlide} from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import '../../swiper.css'

//import required modules
import { Autoplay,Pagination } from 'swiper/modules'

const TestimonialSlider = () => {
  return (
    <>
    <Swiper
      pagination={{
        clickable:true
      }}
      autoplay={{
        delay:2500,
        disableOnInteraction:false
      }}
      modules={[Autoplay,Pagination]}
      className='mySwiper'
    >
       {
        testimonials.map((item:any,index:number)=>{
            const {author,title,genre,image} = item;
            return <SwiperSlide key={index}>
                <div className='flex flex-col justify-center items-center '>
                    <div className='w-48 h-48 lg:w-[328px] lg:h-[328px]'>
                     <img className='rounded-2xl' src={image} alt=''/>
                    </div>
                    <div className='flex flex-col max-w-3xl'>
                       <h5 className='font-body text-2xl  italic font-normal'>{title}</h5>
                    </div>
                    <div>
                        <p className='text-lg text-accent'>{author}</p>
                        <p>{genre}</p>
                    </div>
                </div>
            </SwiperSlide>
        })
       }
    </Swiper>
    </>
  )
}

export default TestimonialSlider