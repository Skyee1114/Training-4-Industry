import type { Metadata } from 'next'
import Header from "@/components/header";
import OurCourses from "@/components/ourcourses";
import WhyChooseUs from "@/components/whychooseus";
import AboutUs from "@/components/aboutus";
import GetQuote from "@/components/getquote";
import Footer from "@/components/footer";
import dotenv from 'dotenv';

export const metadata: Metadata = {
  title: 'About - Training 4 Industry',
}

export default function About() {
  dotenv.config();
  const username = process.env.BRIGHTOFFICE_API_USERNAME;
  const password = process.env.BRIGHTOFFICE_API_PASSWORD;
  const apiurl = process.env.BRIGHTOFFICE_API_URL;
  const imageurl = process.env.BRIGHTOFFICE_Image_URL;

  return (    
    <main>
      <Header colorMode="light" headerColor="red" headerTitle="About Us"/>
      <section className='container mx-auto'>
        <div className="max-w-[90%] mx-auto">
          <div className='flex flex-wrap justify-between gap-4 pt-20 lg:pt-32 xl:pt-48'>
            <div className="lg:w-1/2">
              <h2 className='text-center lg:text-left text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#272424] font-roboto font-bold leading-tight lg:leading-snug xl:leading-normal'>Are you required to complete mandatory Childcare training?</h2>
            </div>
            <div className='lg:w-2/5'>
              <p className='text-center lg:text-left text-lg sm:text-xl xl:text-2xl text-[#272424] font-roboto leading-normal'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. cia consequat duis enim velit mollit.</p>
            </div>
          </div>
          <div className='pt-20 lg:pt-32 xl:pt-40 xl:relative'>
            <GetQuote/>
          </div>
          <div className='w-10/12 mx-auto pt-24 lg:pt-48 xl:pt-[500px] text-center'>
            <WhyChooseUs/>
          </div>
          <div className="pt-24 lg:pt-40 xl:pt-60">
            <AboutUs order="image"/>
          </div>       
          <div className='py-20 xl:py-40'>
          {imageurl && apiurl && username && password &&
            <OurCourses/>   
          }
          </div>
        </div>        
      </section>     
      <Footer/>
    </main>   
  )
}
