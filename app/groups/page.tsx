import type { Metadata } from 'next'
import axios from 'axios';
import dotenv from 'dotenv';
import Header from "@/components/header";
import Footer from "@/components/footer";
import Groupcard from '@/components/groupcard';
import Link from 'next/link'

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

// async function getPrices(code:any) {
//   try {
//     const username = process.env.BRIGHTOFFICE_API_USERNAME;
//     const password = process.env.BRIGHTOFFICE_API_PASSWORD;
//     const response = await axios.post('https://mytraining4industry.co.uk/Webservices/BrightOfficeAPI.asmx/GetActiveTrainingCoursesListJSON2', {
//       Username: username,
//       Password: password,
//       PrimaryGroup: code,
//       CourseCode: "",
//       StartDate: "",
//       EndDate: "" 
//   });

//     if (!response.data) {
//       // This will activate the closest `error.js` Error Boundary
//       throw new Error('Failed to fetch data');
//     }

//     return response.data;
//   } catch (err) {
//     console.error('fetch error', err);
//     throw new Error('Failed to fetch data');
//   }
// }

export const metadata: Metadata = {
  title: 'Courses - Training 4 Industry',
  description: 'First Aid at Work - Blended Learning, IPAF 3A/3B Online Theory + Practical, Asbestos Awareness (UKATA), Abrasive Wheels - In House, Emergency First Aid at Work',
}

export default async function Groups() {

  const data = await fetchGroups()
  const defaultImageUrl = "/img/courses_box.svg";
//const price: string[] = [];
  // {data.d.Records.map((group:any, index:any) => (
  //   var price = await getPrices(group.Code);
  // ))}  
 
  return (    
    <main>
      <Header colorMode="light" headerColor="red" headerTitle="Our Courses"/>
      <section className='container mx-auto'>
        <div className="max-w-[90%] mx-auto">
          <div className='py-20 sm:py-48 w-11/12 mx-auto'>          
            <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-24'>
              {data.map((group:any, index:any) => (
                <div key={index} className='hover:shadow-2xl active:scale-110 cursor-pointer transition duration-300'>
                  <Link href={`/groups/${group.Code}`}>
                    {/* <img src="img/courses_box.svg" alt="courses" className='w-full' /> */}
                    <Groupcard imageurl={`${imageurl}/${group.Code}`}/>
                    {/* <img src={ `${imageurl}/${group.Code}`} alt="courses" className='h-40 sm:h-60 lg:h-72 2xl:h-48 w-screen object-cover' /> */}
                    <div className='max-w-full break-words px-8 pt-8 '>
                      <div className='h-16 sm:h-20 xl:h-24'>
                        <h3 className='font-roboto font-black text-xl sm:text-2xl xl:text-3xl'>{group.Code}</h3>
                        <p className='font-roboto font-black text-base sm:text-lg xl:text-xl'>From £155</p>
                      </div>                   
                      <p className='font-roboto text-[#272424] text-base sm:text-lg xl:text-xl pt-12 pb-4'>{group.Description}</p>
                    </div>
                  </Link>              
                </div>
              ))}
              
            </div>          
          </div>    
        </div>                   
      </section>     
      <Footer/>
    </main>   
  )
}
