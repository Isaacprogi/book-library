import { testimonials } from '../../data'
import Slider from 'react-slick'


// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './bookcarousel.css'

const BookCarousel = () => {
    const settings = {
        dots:true,
        infinite:true,
        speed:500,
        slidesToShow:3,
        slidesToScoll:1,
        accessibility:true
    }
  return (
    <div className='max-w-[35rem]'>
        <Slider {...settings} >
        {
         testimonials.map((d:any)=>{
            return <div className=' rounded-md' >
                <div className='rounded-t-xl  flex justify-center items-center'>
                <img className='h-44 w-44 rounded-md' src={d.image} alt="" />
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-white font-semibold'>{d.title}</p>
                    <p className=' font-semibold '>{d.author}</p>
                     <div className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">
                        Read
                     </div>
                </div>
            </div>
         })
        }
    </Slider>
    </div>
  )
}

export default BookCarousel