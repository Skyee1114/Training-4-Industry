import Link from 'next/link'

export default function GetQuote() {
    return (
        <div>
          <img
            src="/img/1.png"
            className='w-full'
            alt="1"
          />
          <div className='xl:absolute -bottom-80 left-28 w-full xl:w-5/12 bg-white rounded-xl sm:rounded-3xl px-5 py-8 lg:px-10 lg:py-16 shadow-2xl'>
            <h3 className='text-2xl lg:text-3xl xl:text-4xl font-bold text-[#272424] leading-normal'>Investing in cutting edge and untapped markets</h3>
            <p className='font-roboto text-base lg:text-lg xl:text-xl text-[#807979] leading-relaxed py-4 xl:py-10'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. cia consequat duis enim velit mollit. </p>
            <button className="px-6 py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-5 text-white text-base lg:text-lg xl:text-xl transform bg-[#C00008] rounded-md hover:-translate-y-2  active:scale-110 transition duration-300">Get a Quote</button>
          </div>     
        </div>
    )
}