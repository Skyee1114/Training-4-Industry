"use client"
import Link from 'next/link'
import axios from 'axios';
import {useEffect, useState} from 'react'
import { MdArrowForwardIos } from 'react-icons/md'
import {LiaBarsSolid} from 'react-icons/lia'
import {RxCross1} from 'react-icons/rx'

export default function Menu({ colorMode }: { colorMode: string }) {

    const [groups, setGroups] = useState<any>([]);
    const [selectedGroup, setSelectedGroup] = useState("CCNSG");
    const [groupindex, setGroupIndex] = useState(0);
    let timeoutId: ReturnType<typeof setTimeout>;

    useEffect(() => {
        async function fetchData() {
        try {
            const response = await axios.get('/courses_menu.json');
            setGroups(response.data.groups);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
        }
        fetchData();
    }, []);

    const [showGroupsList, setShowGroupsList] = useState(false);

    const handleCoursesMenuMouseEnter = () => {
        timeoutId = setTimeout(() => {
            setShowGroupsList(true);
        }, 300);
    };

    const handleCoursesMenuMouseLeave = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
        setShowGroupsList(false);
        }, 300);
    };

    const handleCourseMouseEnter = (group: any) => {
        setSelectedGroup(group);
        setGroupIndex(groups.findIndex((item:any) => item.name === group));        
      }
    
    const handleCourseMouseLeave = () => {
        setSelectedGroup(groups[groupindex]);
    }

    const [mobileMenu, setMobileMenu] = useState(false);
  
    const mobileMenuButtonClick = () => {
      setMobileMenu(!mobileMenu);
    };
  
    return (
        <nav className='flex justify-between pt-8 relative'>

            {/*--------------------- Desktop menu---------------------- */}
            <div>
                <img
                    src={"/img/t4i_logo_" + colorMode + ".png"}
                    className='w-3/5 sm:w-4/5 lg:w-5/6  xl:w-full'
                    alt="avatar"
                />
            </div>
            <div className='hidden lg:block pt-5'>
                <div className='flex justify-end gap-3 xl:pb-3 pb-2'>
                    <div className='flex justify-start items-center'>
                    <img src={"/img/place_" + colorMode + ".svg"} className='w-[25px] xl:w-[30px]' alt="place" />
                    <p className={`pl-1 ${colorMode === 'dark' ? 'text-[#272424]' : 'text-white'} text-sm xl:text-base`}>Certacs house, Unit 10-12 Westgate, Skelmersdale</p>
                    </div>
                    <div className='flex justify-start items-center'>
                    <img src={"/img/mail_" + colorMode + ".svg"} className='w-[25px] xl:w-[30px]' alt="mail" />
                    <p className={`pl-1 ${colorMode === 'dark' ? 'text-[#272424]' : 'text-white'} text-sm xl:text-base`}>support@domain.com</p>
                </div>  
            </div>
            <div className={`border ${colorMode === 'dark' ? 'border-[#272424]' : 'border-white'} lg:w-[560px] xl:w-[750px]`}></div>
                <div className='flex justify-end gap-14 xl:gap-20 pt-2 xl:pt-3 '>
                    <Link href="/"><p className={`text-base xl:text-lg ${colorMode === 'dark' ? 'text-[#272424]' : 'text-white'} font-bold hover:text-red-500 transition duration-300 pb-4`}>Home</p></Link>
                    <Link href='/about'><p className={`text-base xl:text-lg ${colorMode === 'dark' ? 'text-[#272424]' : 'text-white'} font-bold hover:text-red-500 transition duration-300 pb-4`}>About</p></Link>

                    <div className='relative' onMouseEnter={handleCoursesMenuMouseEnter} onMouseLeave={handleCoursesMenuMouseLeave}>
                        <Link href='/groups'><p className={`text-base xl:text-lg ${colorMode === 'dark' ? 'text-[#272424]' : 'text-white'} font-bold hover:text-red-500 transition duration-300 pb-4`}>Courses</p></Link>
                        {showGroupsList && (
                            <div>
                                <img
                                    src={"/img/menu_arrow.svg"}
                                    className='w-2/5 absolute z-1 top-7 left-5'
                                    alt="arrow"
                                />
                                <div className='absolute z-10 -left-72 bg-white shadow-gray-700 shadow-md w-max rounded-lg flex justify-between'>
                                    <div className='py-12 pl-12'>
                                        <p className='text-[#242424] text-base xl:text-lg font-bold'>Course Types</p>
                                        <ul className='text-[#242424] pt-4'>
                                        {groups.map((group:any, index:any) => (
                                            <li key={index}><Link href={`/groups/${group.name}`}><p className='py-2 text-base xl:text-lg hover:bg-[#F8F8F8] pl-3 pr-8 rounded-l-xl' onMouseEnter={() => handleCourseMouseEnter(group.name)} onMouseLeave={handleCourseMouseLeave}>{group.name}</p></Link></li>
                                        ))}
                                        </ul>
                                    </div>
                                    <div className='bg-[#F8F8F8] p-12 rounded-r-lg'>
                                        {selectedGroup && (
                                            <ul className='text-[#747474]'>
                                                {groups[groupindex].courses.map((course:any, index:any) => (                                       
                                                    <li key={index}><Link href={`/groups/${groups[groupindex].name}/${course.code}`}><p className='py-2 text-base xl:text-lg hover:text-[#242424]'>{course.name}</p></Link></li>                                    
                                                
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    
                                </div>
                            </div>                        
                        )}
                    </div>



                    <Link href='/online-courses'><p className={`text-base xl:text-lg ${colorMode === 'dark' ? 'text-[#272424]' : 'text-white'} font-bold hover:text-red-500 transition duration-300 pb-4`}>Online Courses</p></Link>
                    <Link href='/contact'><p className={`text-base xl:text-lg ${colorMode === 'dark' ? 'text-[#272424]' : 'text-white'} font-bold hover:text-red-500 transition duration-300 pb-4`}>Contact</p></Link>
                </div>
            </div>

            {/*--------------------- mobile menu---------------------- */}
            <div className={`lg:hidden pt-3 sm:pt-5 relative cursor-pointer ${colorMode === 'dark' ? 'text-[#272424]' : 'text-white'}`} onClick={mobileMenuButtonClick}>
                
                {   !mobileMenu && (
                    <LiaBarsSolid size={48}/>
                )}
                {
                    mobileMenu && (
                        <RxCross1 size={44} />
                    )
                }                                   
                   
            </div>

            {
            mobileMenu && 
            <div className='lg:hidden absolute top-32 z-10 w-full text-center border bg-[#F8F8F8]'>                
                <Link href="/">
                    <div className='flex justify-between items-center px-8 text-start text-[#272424] hover:text-red-500 transition duration-300'>
                        <p className='text-xl font-bold py-4'>Home</p>
                        <MdArrowForwardIos size={24} />
                    </div>                    
                </Link>     
                <Link href='/about'>
                    <div className='flex justify-between items-center px-8 text-start text-[#272424] hover:text-red-500 transition duration-300 border-t'>
                        <p className='text-xl font-bold py-4'>About</p>
                        <MdArrowForwardIos size={24} />
                    </div>                    
                </Link>   
                <Link href='/groups'>
                    <div className='flex justify-between items-center px-8 text-start text-[#272424] hover:text-red-500 transition duration-300 border-t'>
                        <p className='text-xl font-bold py-4'>Courses</p>
                        <MdArrowForwardIos size={24} />
                    </div>                        
                </Link>
                <Link href='/online-courses'>
                    <div className='flex justify-between items-center px-8 text-start text-[#272424] hover:text-red-500 transition duration-300 border-t'>
                        <p className='text-xl font-bold py-4'>Online Courses</p>
                        <MdArrowForwardIos size={24} />
                    </div>
                </Link>
                <Link href='/contact'>
                    <div className='flex justify-between items-center px-8 text-[#272424] hover:text-red-500 transition duration-300 border-t'>
                        <p className='text-xl font-bold py-4'>Contact</p>
                        <MdArrowForwardIos size={24} />
                    </div>   
                </Link>
            </div>
            }
        </nav>
    )
}