'use client'

import axios from 'axios';
import { useInfiniteQuery, QueryClient, QueryClientProvider } from "react-query"
import {useState, useRef, useEffect } from "react"
import Link from 'next/link'

const currentDate = new Date();
const targetDate = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000);
const formattedTargetDate = targetDate.toLocaleDateString("en-GB", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
});

const fetchCourses = async (code: string, page: any, apiurl:string, username: string, password: string) => {
    
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
    
    console.log(formattedTargetDate)
    
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

function courseTime(course: any): string {
    const coursedate = course.CourseDate;
    const start = coursedate ? new Date((Number(coursedate.match(/\d+/)[0]) / 1000) * 1000) : null;
    const startTimeFormatted = start ? formatTime(start) : '';
    const enddate = course.EndDate;
    const end = enddate ? new Date((Number(enddate.match(/\d+/)[0]) / 1000) * 1000) : null;
    const endTimeFormatted = end ? formatTime(end) : '';
    const dayformatted = end ? formatDate(end) : '';
    const combinedFormat = `${startTimeFormatted} - ${endTimeFormatted} ${dayformatted}`;

    return combinedFormat
}

const Infinitetable = ({ code, apiurl, username, password }: { code: string, apiurl: string, username: string, password: string })=> {  
    
    const [selectedLocation, setSelectedLocation] = useState<string>("Location")

    const handleLocationChange = (event: any) => {
        setSelectedLocation(event.target.value);
    }

    const myRef = useRef<any>(null)

    const { data, fetchNextPage, isFetchingNextPage, refetch } = useInfiniteQuery(
        ['query'],
        async ({ pageParam = 1 }) => await fetchCourses(code, pageParam, apiurl, username, password),
        {
          getNextPageParam: (_, pages) => pages.length + 1,
        }
      );
    
    useEffect(() => {
        // Function to reset the fetched data and start from the first page
        const resetData = async () => {
            await queryClient.removeQueries(['query']);
            await refetch();
        };

        resetData();
    }, [code]);

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
            <section className='container mx-auto'>  
                <div className="max-w-[90%] mx-auto">
                    <div className="flex justify-end pt-20 lg:pt-30 xl:pt-40 pb-10">                        
                        <select
                            id="location_select"
                            className="block py-2.5 px-2 text-black border-0 border-b-2 border-black focus:outline-none peer font-roboto"
                            onChange={handleLocationChange}
                        >
                            <option value="Location">Location</option>
                            <option value="Online">Online</option>
                            <option value="Sheffield">Sheffield</option>
                            <option value="Bolton">Bolton</option>
                        </select>
                    </div>
                    <div className='pb-40'>
                        <div className='py-8 px-8 lg:py-16 lg:px-16 rounded-2xl bg-[#F8F8F8] max-h-[1000px] overflow-y-auto my-scroll'>
                            <table className="w-full table-auto">
                                <tbody>
                                    {data?.pages.map((page: any, i: any) => (
                                    page.map((p: any, j: any) => (
                                        <tr key={`${i}-${j}`} className={`${selectedLocation === p.County || selectedLocation === "Location" || selectedLocation === "Online" ? 'block' : 'hidden'} border-b border-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center pt-4 lg:pt-10 pb-4 lg:pb-0`}>
                                            <td>
                                                <h3 className='font-roboto font-black text-base lg:text-lg xl:text-xl'>{p.CourseDescription}</h3>
                                                <div className='py-3 pl-0 sm:pl-4'>
                                                    <p className='font-roboto font-black text-base lg:text-lg xl:text-xl'>{p.County}</p>
                                                    <p className='font-roboto text-[#272424] text-base lg:text-lg xl:text-xl'>{courseTime(p)}</p>
                                                </div>
                                            </td>
                                            <td className='hidden lg:block lg:text-center'>
                                                <p className='font-roboto font-black text-base lg:text-lg xl:text-xl'>£{p.Price}</p>
                                            </td>
                                            <td className='text-center sm:text-end'><Link href={`/groups/${code}/${p.Code}`}><button className="px-4 py-2 xl:px-6 xl:py-3 text-white font-roboto transform bg-[#C00008] rounded-xl text-base xl:text-xl hover:-translate-y-1  active:scale-110 transition duration-300">View Course</button></Link></td>
                                        </tr>
                                    ))
                                    ))}
                                    <tr ref={myRef}></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>                
            </section>
            
        </>
    )  
}

export default function Coursetable ({ code, apiurl, username, password }: { code: string, apiurl: string, username: string, password: string }) {
  
    return (
      <QueryClientProvider client={queryClient}>
          <Infinitetable code={code} apiurl={apiurl} username={username} password={password}/>
      </QueryClientProvider>
    )
  }
