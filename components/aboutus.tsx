export default function AboutUs({ order }: { order: string }) {

    return (
        <div className='flex flex-wrap justify-between items-center'>
          <div className={`text-center w-full xl:w-1/2 ${order === 'image' ? 'order-first' : 'order-last'}`}>
            <img src="/img/2.png" className='w-full h-full' alt="2" />
          </div>
          <div className='xl:w-2/5 py-10'>
            <h2 className='text-[#C00008] text-base md:text-lg xl:text-xl font-bold text-center sm:text-left'>ABOUT US</h2>
            <h3 className='text-2xl md:text-4xl xl:text-5xl font-bold py-4 lg:py-6 xl:py-8 text-[#272424] text-center sm:text-left'>Training 4 Industry</h3>
            <p className='font-roboto text-base md:text-lg xl:text-xl text-[#807979] py-4 xl:py-6 leading-relaxed'>Training4industry are one of the leading industry training providers in the north of England. 
              We pride ourselves in training people to the highest possible standards with safety being at the forefront of our business.
              We are fully accredited with the necessary awards and have high standards for our organisation and our staff. We are a recognised training provider within the UK construction industry and have been awarded by national bodies such as IPAF, PASMA, Qualsafe and CITB Site Safety Plus. We provide a competitive pricing structure and we achieve this by employing our own instructors and using our own training facilities which are of a very high standard. Our training facilities are among the best in the UK, trust us to keep your staff safe.
            </p>
            <div className='flex justify-between'>
              <div className='text-center'>
                <p className='text-2xl md:text-4xl xl:text-5xl font-bold text-[#2C2C2C] py-2 lg:py-4 xl:py-6'>26k+</p>
                <p className='text-xs md:text-base font-bold  text-[#2C2C2C]'>Students</p>
              </div>
              <div className='text-center'>
                <p className='text-2xl md:text-4xl xl:text-5xl font-bold text-[#2C2C2C] py-2 lg:py-4 xl:py-6'>60+</p>
                <p className='text-xs md:text-base font-bold text-[#2C2C2C]'>Active Courses</p>
              </div>
              <div className='text-center'>
                <p className='text-2xl md:text-4xl xl:text-5xl font-bold text-[#2C2C2C] py-2 lg:py-4 xl:py-6'>12k</p>
                <p className='text-xs md:text-base font-bold text-[#2C2C2C]'>Customers</p>
              </div>
            </div>
          </div>
        </div>
    )
}