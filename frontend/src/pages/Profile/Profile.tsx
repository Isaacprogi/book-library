import Image from '../../assets/me.jpg'
import Background from '../../assets/top_logo.jpg'
import BookPlaceholder from '../../assets/bookplaceholder.png'



const Profile = () => {
  return (
    <div className="w-full  h-[calc(100%-4rem)] max-w-[1200px] mx-auto">

      <div className="flex gap-[2rem] w-full">
        <div className="w-full flex flex-col gap-y-[.5rem] flex-1 ">

          <div className='bg-white border border-gray-300 rounded-md'>
            <div style={{
              backgroundImage: `url(${Background})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }} className="w-full hover:opacity-[.9] duration-300 relative h-[10rem]">
              <div className="w-[7rem] absolute left-[1rem] bottom-[-3rem] h-[7rem] rounded-full overflow-hidden">
                <img src={Image} alt="" />
              </div>
            </div>

            <div className="flex flex-col gap-y-[.5rem] p-[1rem]  mt-[3rem]">
              <span>Isaac Anasonye</span>
              <span>Computer Science</span>
              <span>300L</span>

            </div>
          </div>
          <span className='font-[500]'>
            About
          </span>

          <div className="bg-white h-[5rem] border border-gray-300 p-[1rem] rounded-md">
            My name is Isaac Anasonye. I am a student of the university if Nigeria, Nsukka
          </div>


        </div>

        <div className="flex-none flex p-[1rem]  w-[30rem]">
          <span className="w-full rounded-md px-[1rem] max-w-[25rem] bg-red-100 border border-gray-400 mx-auto bg-white h-[25rem]">
            <div className='mt-[1rem] text-center'>New Book Available</div>
            <div className="w-full mx-auto rounded-sm mt-[1rem] max-w-[15rem] bg-blue-700 h-[15rem]">
              <img src={BookPlaceholder} className='w-full h-full' alt="" />
            </div>
          </span>
        </div>
      </div>

      <div className="w-full ">
        <span className='font-[500]'>
          My Collection
        </span>

        <div className="w-full  flex gap-[1rem] mt-[1rem]  rounded-md flex-wrap">
          <div className="w-[10rem] h-[12rem] rounded-md overflow-hidden bg-red-500">
            <img src={BookPlaceholder} className='w-full h-full' alt="" />
          </div>
          <div className="w-[10rem] h-[12rem] rounded-md overflow-hidden bg-red-500">
            <img src={BookPlaceholder} className='w-full h-full' alt="" />
          </div>
          <div className="w-[10rem] h-[12rem] rounded-md overflow-hidden bg-red-500">
            <img src={BookPlaceholder} className='w-full h-full' alt="" />
          </div>
          <div className="w-[10rem] h-[12rem] rounded-md overflow-hidden bg-red-500">
            <img src={BookPlaceholder} className='w-full h-full' alt="" />
          </div>
          <div className="w-[10rem] h-[12rem] rounded-md overflow-hidden bg-red-500">
            <img src={BookPlaceholder} className='w-full h-full' alt="" />
          </div>
          <div className="w-[10rem] h-[12rem] rounded-md overflow-hidden bg-red-500">
            <img src={BookPlaceholder} className='w-full h-full' alt="" />
          </div>

        </div>

      </div>



    </div>
  )
}

export default Profile