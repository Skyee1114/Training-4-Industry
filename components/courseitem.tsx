'use client'

import axios from 'axios';
import { useInfiniteQuery, QueryClient, QueryClientProvider } from "react-query"
import {useRef, useEffect } from "react"
import Link from 'next/link'

const currentDate = new Date();
const targetDate = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000);
const formattedTargetDate = targetDate.toLocaleDateString("en-GB", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
});


const fetchCourses = async (code: string, page: any, apiurl: string, username: string, password: string) => {

    console.log(username, password)
    
    const response = await axios.post(`${apiurl}/Webservices/BrightOfficeAPI.asmx/GetActiveTrainingCoursesListJSON2_Paginated`, {
        Username: username,
        Password: password,
        PrimaryGroup: code,
        CourseCode: "",
        StartDate: formattedTargetDate,
        EndDate: "" ,
        PageSize: "10",
        PageNumber: page,
        MatterType: "",
        CourseStatus: "Confirmed Course",
        CourseVenue: ""
    });  
    
      return response.data.d.Records;
}

const queryClient = new QueryClient();

function formatTime(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Europe/London',
    };
    return date.toLocaleString('en-GB', options);
}

function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {        
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',        
        timeZone: 'Europe/London'
    };
    return date.toLocaleString('en-GB', options);
}

function courseStartTime(course: any): string {
    
    const coursedate = course.CourseDate;
    const start = coursedate ? new Date((Number(coursedate.match(/\d+/)[0]) / 1000) * 1000) : null;
    const startTimeFormatted = start ? formatTime(start) : '';    
    return startTimeFormatted
}

function courseEndTime(course: any): string {
    
    const enddate = course.EndDate;
    const end = enddate ? new Date((Number(enddate.match(/\d+/)[0]) / 1000) * 1000) : null;
    const endTimeFormatted = end ? formatTime(end) : '';

    return endTimeFormatted
}

function courseDay(course: any): string {
    
    const enddate = course.EndDate;
    const end = enddate ? new Date((Number(enddate.match(/\d+/)[0]) / 1000) * 1000) : null;
    const dayformatted = end ? formatDate(end) : '';
    const dateFormat = `${dayformatted}`;  

    return dateFormat
}

const Infinitetable = ({ code, courseSingle, apiurl, username, password }: { code: string, courseSingle: any, apiurl: string, username: string, password: string }) => {  
            
    const myRef = useRef<any>(null)

    const {data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
        ['query'], 
        async ({pageParam = 1}) => await fetchCourses(code, pageParam, apiurl, username, password), 
        {
        getNextPageParam: (_, pages) => pages.length + 1
        }
    ) 

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting && !isFetchingNextPage) {
                fetchNextPage();
            }
            });
        }
        );
        if (myRef.current) {
        observer.observe(myRef.current);
        }
        return () => {
        if (myRef.current) {
            observer.unobserve(myRef.current);
        }
        };
    }, []);
    
    return (
        <>    
            <div className='xl:absolute w-full xl:w-1/2 -top-72 right-0 bg-white rounded-xl xl:rounded-3xl px-10 py-12 md:px-16 md:py-20 shadow-2xl'>
                <h3 className='text-2xl md:text-4xl text-black font-bold font-roboto'>Venue Information</h3>
                <p className='font-roboto text-base md:text-xl text-[#807979] leading-normal py-4 md:py-8'>{courseSingle.CourseContent}</p>
                <div className='px-4 py-5 md:px-8 md:py-10 bg-[#ECECEC] rounded-xl'>
                    <p className='text-[#272424] font-roboto font-bold text-lg md:text-2xl'>{courseSingle.County}</p>
                    <p className='text-[#272424] font-roboto text-base md:text-xl py-4 leading-loose'>{courseSingle.CourseVenueAddress1}, {courseSingle.CourseVenueAddress2}, {courseSingle.CourseVenueAddress3}, {courseSingle.County}, {courseSingle.Postcode}</p>
                    <p className='font-roboto text-[#272424] font-bold text-lg md:text-2xl'>{courseStartTime(courseSingle)} - {courseEndTime(courseSingle)}</p>
                    <div className='flex justify-between items-center pt-8 md:pt-16'>
                        <div className='flex justify-between items-end'>
                            <p className='text-[#272424] font-roboto font-bold text-3xl md:text-5xl'>£{courseSingle.Price}</p>
                            <p className='text-[#272424] font-roboto text-base md:text-xl'>+vat</p>
                        </div>
                        <Link href={`/groups/${code}/${courseSingle.Code}/book`}><button className="px-4 py-2 md:px-8 md:py-3 text-white text-sm md:text-xl transform bg-[#C00008] rounded-xl hover:-translate-y-2  active:scale-110 transition duration-300">Buy Now</button></Link>
                        
                    </div>                    
                </div>               
            </div>

            <div className='w-full xl:w-2/5 pt-20 xl:pt-40'>
                <div>
                    <h3 className='font-black font-roboto text-xl sm:text-2xl'>Course content</h3>
                    <p className='font-roboto text-[#807979] text-base sm:text-xl pt-5 leading-normal'>{courseSingle.CourseContent}</p>
                </div>
                <div className='pt-16'>
                    <h3 className='font-black font-roboto text-xl sm:text-2xl'>Learning objectives</h3>
                    <p className='font-roboto text-[#807979] text-base sm:text-xl pt-5 leading-normal'>{courseSingle.LearningObjectives}</p>
                </div>           
            </div>
            

            <div className='flex flex-wrap justify-between pt-24 xl:pt-48 gap-8'>
                <div className='w-full xl:w-5/12'>
                    <img src="/img/3.png" className='w-full' alt="2" />
                </div>                
                <div className='w-full xl:w-1/2'>
                    <div className='py-12 px-12 rounded-xl bg-[#F8F8F8] max-h-[750px] overflow-y-auto my-scroll'>
                        <table className="w-full table-auto">
                            <tbody>
                                {data?.pages.map((page: any, i: any) => (
                                page.map((p: any, j: any) => (
                                    <tr key={`${i}-${j}`} className="border-b border-black grid grid-cols-1 sm:grid-cols-2 gap-2 items-center pt-5 pb-4 sm:pb-0">
                                        <td>
                                            <div className='flex justify-between'>                                            
                                                <h3 className='font-roboto font-black text-lg'>{p.CourseDescription}</h3>                                                    
                                            </div>                                        
                                            <div className='py-2'>
                                                <h3 className='font-roboto font-black text-lg'>{p.County}</h3>
                                                <p className='font-roboto text-[#272424] text-lg'>{courseStartTime(p)} - {courseEndTime(p)}</p>
                                                <p className='font-roboto text-[#272424] text-lg'>{courseDay(p)}</p>
                                            </div>                                        
                                        </td>
                                        <td className='text-center sm:text-end'><Link href={`/groups/${code}/${p.Code}`}><button className="px-6 py-3 text-white font-roboto transform bg-[#C00008] rounded-xl text-base sm:text-lg hover:-translate-y-2  active:scale-110 transition duration-300">View Course</button></Link></td>
                                    </tr>
                                ))
                                ))}
                                <tr ref={myRef}></tr>
                            </tbody>
                        </table> 
                    </div>   
                </div>                
            </div>
                             
        </>
    )  
}

export default function Courseitem ({ code, courseSingle, apiurl, username, password }: { code: string, courseSingle: any, apiurl: string, username: string, password: string }) {
  
    return (
      <QueryClientProvider client={queryClient}>
          <Infinitetable code={code} courseSingle={courseSingle} apiurl={apiurl} username={username} password={password}/>
      </QueryClientProvider>
    )
  }
