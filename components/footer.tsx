import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {

    return (
        <footer>
            <div className='bg-[#2C2C2C]'>
                <div className='container mx-auto'>
                    <div className='max-w-[90%] mx-auto py-8 sm:py-14 lg:py-28  flex flex-wrap justify-between gap-6 lg:gap-8'>
                        <div className='lg:w-1/5'>
                            <img src="/img/t4i_light_logo.svg" alt="avatar"  />
                            <p className='font-roboto text-base lg:text-lg text-white pt-5 lg:pt-8'>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat </p>
                        </div>
                        <div className='lg:w-1/5'>
                            <p className='text-xl lg:text-2xl text-white'>Sheffield</p>
                            <div className='border-solid border border-[#C00008]'></div>
                            <div className='flex justify-start pt-5 lg:pt-8 items-start'>
                                <img src="/img/place_light.svg" className='w-[25px] lg:w-[30px]' alt="place" />
                                <p className='font-roboto text-base lg:text-lg text-white pl-3'>1 Up Access Ltd Office, Foley Street, Sheffield, S4 7YW</p>
                            </div>
                            <div className='flex justify-start items-start py-3 lg:py-4'>
                                <img src="/img/phone_light.svg" className='w-[25px] lg:w-[30px]' alt="phone" />
                                <p className='font-roboto text-base lg:text-lg text-white pl-3'>0300 303 2722</p>
                            </div>
                            <div className='flex justify-start items-start'>
                                <img src="/img/mail_light.svg" className='w-[25px] lg:w-[30px]' alt="mail" />                            
                                <p className='font-roboto text-base lg:text-lg text-white pl-3'>hello@example.com</p>
                            </div>
                        </div>
                        <div className='lg:w-1/5'>
                            <p className='text-xl lg:text-2xl text-white'>Bolton</p>
                            <div className='border-solid border border-[#C00008]'></div>
                            <div className='flex justify-start pt-5 lg:pt-8 items-start'>
                                <img src="/img/place_light.svg" className='w-[25px] lg:w-[30px]' alt="place" />
                                <p className='font-roboto text-base lg:text-lg text-white pl-3'>Unit 6a Breightmet Industrial Estate, Off Breightmet Fold Lane, Breightmet, Bolton, BL2 6PT</p>
                            </div>
                            <div className='flex justify-start items-start py-3 lg:py-4'>
                                <img src="/img/phone_light.svg" className='w-[25px] lg:w-[30px]' alt="phone" />
                                <p className='font-roboto text-base lg:text-lg text-white pl-3'>0300 303 2722</p>
                            </div>
                            <div className='flex justify-start items-start'>
                                <img src="/img/mail_light.svg" className='w-[25px] lg:w-[30px]' alt="mail" />  
                                <p className='font-roboto text-base lg:text-lg text-white pl-3'>hello@example.com</p>
                            </div>
                        </div>
                        <div className='lg:w-1/5'>
                            <p className='text-xl lg:text-2xl text-white'>Social Media</p>
                            <div className='border-solid border border-[#C00008]'></div>
                            <div className='flex justify-start pt-5 lg:pt-8 items-start'>
                                <img src="/img/place_light.svg" className='w-[25px] lg:w-[30px]' alt="place" />
                                <p className='font-roboto text-base lg:text-lg text-white pl-3'>Unit 6a Breightmet Industrial Estate, Off Breightmet Fold Lane, Breightmet, Bolton, BL2 6PT</p>
                            </div>
                            <div className='flex justify-start items-start py-3 lg:py-4'>
                                <img src="/img/phone_light.svg" className='w-[25px] lg:w-[30px]' alt="phone" />
                                <p className='font-roboto text-base lg:text-lg text-white pl-3'>0300 303 2722</p>
                            </div>
                            <div className='flex justify-start items-start'>
                                <img src="/img/mail_light.svg" className='w-[25px] lg:w-[30px]' alt="mail" /> 
                                <p className='font-roboto text-base lg:text-lg text-white pl-3'>hello@example.com</p>
                            </div>
                        </div>

                    </div>
                </div>
                
            </div>

            <div className='bg-[#C00008]'>
                <div className='container mx-auto'>
                    <div className='max-w-[90%] mx-auto py-3 md:py-4 lg:py-5 md:flex md:flex-wrap md:justify-between text-center   '>
                        <p className='font-roboto text-base lg:text-lg text-white'>@2023 Training 4 Industry. All rights reserved.</p>
                        <p className='font-roboto text-base lg:text-lg text-white'>Brought to you by MTG Digital</p>
                    </div>
                </div>
                
            </div>
        </footer>
    )
}