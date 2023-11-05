import Link from 'next/link'
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const username = process.env.BRIGHTOFFICE_API_USERNAME;
const password = process.env.BRIGHTOFFICE_API_PASSWORD;
const apiurl = process.env.BRIGHTOFFICE_API_URL;
const imageurl = process.env.BRIGHTOFFICE_Image_URL;

async function fetchGroups() {
    try {
      
      const response = await axios.post(`${apiurl}/Webservices/BrightOfficeAPI.asmx/GetPrimaryGroupsJSON`, {
        UserInfo: {
          Username: username,
          Password: password,
        },
      });
  
      if (!response.data) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
      }
  
      return response.data.d.Records;
    } catch (err) {
      console.error('fetch error', err);
      throw new Error('Failed to fetch data');
    }
  }

export default async function OurCourses() {

    const data = await fetchGroups();

    return (
        <div>
            <h2 className='font-roboto text-[#272424] font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl py-8 md:py-12 lg:py-16 xl:py-20 text-center sm:text-left'>Our Courses</h2>
            <div className='grid grid-cols-1 xl:grid-cols-3 gap-10'>
              <Link href={`/groups/${data[4].Code}`}>
                <div className='px-4 pt-12 pb-16 md:pb-20 lg:pb-24 xl:pb-28 shadow-lg hover:shadow-2xl active:scale-110 cursor-pointer transition duration-300'>
                    <img src={ `${imageurl}/${data[4].Code}`} className='h-48 w-screen object-cover' alt="IPAF" />
                    <p className='font-roboto text-lg xl:text-xl text-[#807979] py-10 leading-normal'>{data[4].Description}</p>
                    <h3 className='font-roboto font-bold text-[#272424] text-xl lg:text-2xl xl:text-3xl'>{data[4].Code}</h3>
                </div>
              </Link>
              <Link href={`/groups/${data[3].Code}`}>
                <div className='px-4 pt-12 pb-16 md:pb-20 lg:pb-24 xl:pb-28 shadow-lg hover:shadow-2xl active:scale-110 cursor-pointer transition duration-300'>
                    <img src={ `${imageurl}/${data[3].Code}`} className='h-48 w-screen object-cover' alt="First Aid at Work" />
                    <p className='font-roboto text-lg xl:text-xl text-[#807979] py-10 leading-normal'>{data[3].Description}</p>
                    <h3 className='font-roboto font-bold text-[#272424] text-xl lg:text-2xl xl:text-3xl'>{data[3].Code}</h3>
                </div>
              </Link>                
              <Link href={`/groups/${data[6].Code}`}>
                <div className='px-4 pt-12 pb-16 md:pb-20 lg:pb-24 xl:pb-28 shadow-lg hover:shadow-2xl active:scale-110 cursor-pointer transition duration-300'>
                    <img src={ `${imageurl}/${data[6].Code}`} className='h-48 w-screen object-cover' alt="PASMA" />
                    <p className='font-roboto text-lg xl:text-xl text-[#807979] py-10 leading-normal'>{data[6].Description}</p>
                    <h3 className='font-roboto font-bold text-[#272424] text-xl lg:text-2xl xl:text-3xl'>{data[6].Code}</h3>
                </div>
              </Link>  
            </div>
            <Link href='/groups'><h3 className='text-base md:text-xl font-bold text-[#C00008] text-end pt-4 md:pt-10 cursor-pointer'>View All Courses</h3></Link>
        </div>        
    )
}