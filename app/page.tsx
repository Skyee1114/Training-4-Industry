import Menu from "@/components/menu";
import WhyChooseUs from "@/components/whychooseus";
import AboutUs from "@/components/aboutus";
import OurCourses from "@/components/ourcourses";
import Footer from "@/components/footer";
import GetQuote from "@/components/getquote";
import dotenv from 'dotenv';
import Link from "next/link";

export default function Home() {
  dotenv.config();
  const username = process.env.BRIGHTOFFICE_API_USERNAME;
  const password = process.env.BRIGHTOFFICE_API_PASSWORD;
  const apiurl = process.env.BRIGHTOFFICE_API_URL;
  const imageurl = process.env.BRIGHTOFFICE_Image_URL;
  return (   
    <main>
      <section className='bk-home-img '>
        <div className="container mx-auto">
          <div className="max-w-[90%] mx-auto">
            <Menu colorMode="dark"/>
            <div className='sm:max-w-xl w-100 pt-16 md:pt-20 lg:pt-24 xl:pt-30'>
              <h1 className='font-racing text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center sm:text-left text-[#272424] leading-none xl:leading-tight'>Learn from the people that care</h1>
              <h3 className='py-5 sm:py-8 md:py-10 lg:py-12 xl:py-16 font-roboto text-lg md:text-xl lg:text-2xl xl:text-3xl text-center sm:text-left font-bold text-[#272424] leading-tight xl:leading-snug'>Online Childcare Courses & Healthcare Courses</h3>
              <div className='text-center sm:text-left'>
                <Link href="/contact">
                  <button className="px-6 py-2 md:px-8 md:py-3 lg:px-10 lg:py-4 xl:px-12 xl:py-5 text-white text-base lg:text-lg xl:text-xl bg-[#C00008] rounded-md hover:-translate-y-2  active:scale-110 transition duration-300">Enquire today</button>
                </Link>
                
              </div>          
            </div>
            <div className='flex flex-wrap justify-between gap-4  py-48 md:pt-48 md:pb-72 lg:py-96'>
              <div className="lg:w-1/2">
                <h2 className='text-center lg:text-left text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white font-roboto font-bold leading-tight lg:leading-snug xl:leading-normal'>Are you required to complete mandatory Childcare training?</h2>
              </div>
              <div className='lg:w-2/5'>
                <p className='text-center lg:text-left text-lg sm:text-xl xl:text-2xl text-white font-roboto leading-normal'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. cia consequat duis enim velit mollit.</p>
              </div>
            </div>
          </div>
        </div>        
      </section>
      
      <section className="container mx-auto">
        <div className="max-w-[90%] mx-auto">          
          <div className='-mt-40 md:-mt-60 lg:-mt-64 xl:relative'>
            <GetQuote/>     
          </div>
          <div className="pt-24 xl:pt-96">
            <AboutUs order="image"/>
          </div>       
          <div className="pt-8 md:pt-12 lg:pt-20">
          {imageurl && apiurl && username && password &&
            <OurCourses/>   
          }
          </div>
          <div className='w-10/12 mx-auto py-20 lg:py-40 text-center'>
            <WhyChooseUs/>
          </div>
        </div>      
      </section>     
      <Footer/>
    </main>   
  )
}
