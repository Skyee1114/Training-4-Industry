'use client'
// import * as React from "react";
import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import Header from "@/components/header";
import Footer from "@/components/footer";
import dotenv from 'dotenv';

interface ContactFormInput {
  firstname: string;
  email: string;
  telephone: number;
  message: string;
}

export default function Contact() {

  dotenv.config();
  const username = process.env.BRIGHTOFFICE_API_USERNAME;
  const password = process.env.BRIGHTOFFICE_API_PASSWORD;
  const apiurl = process.env.BRIGHTOFFICE_API_URL;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<ContactFormInput>();

  // const [firstname, setFirstname] = useState<string>("");

  const onSubmit = async (data: ContactFormInput) => {

    try {
      const response = await axios.post(`${apiurl}/Webservices/BrightOfficeAPI.asmx/CreateNewProspectV2`, {
        customer: {
          CustomerReference: "",
          Firstname: data.firstname,
          Surname: "Test",  
          CustomerAddress: {
            HouseName: "MTG Digital Ltd",
            HouseNumber: "",
            Address1: "2 Paddock Rd",
            Address2: "",
            Address3: "",
            Address4: "Skelmersdale",
            Address5: "",
            PostCode: "WN8 9PL"
          },
          Telephone: data.telephone,
          Email: data.email,
          CustomerStatus: "Prospect",
          Notes: data.message,
          SourceName: "",
          B2BCustomer: "false",
          IsDeduplicationReq: "true"    
        },
        userInfo: {
          Username: username,
          Password: password
        },
        ClientPassword: ""
    });  

      console.log(response.data);
      // Handle success or show a success message to the user
    } catch (error) {
      console.error(error);
      // Handle error or show an error message to the user
    }
  }

  return (    
    <main>
      <Header colorMode="light" headerColor="red" headerTitle="Contact"/>
      <section className='container mx-auto'>
        <div className="max-w-[90%] mx-auto">
          <div>
            <h1 className='py-10 lg:py-16 text-3xl lg:text-4xl xl:text-5xl font-bold'>Get In Touch</h1>
            <p>Send us a message if you would like further information on any of our courses or to book a course for a group on site at your organisation.</p>
            <p className='pt-4'>Please indicate the COUNTY you are contacting from in the message box below.</p>   
          </div>

          <div className='pt-16 pb-16 sm:pb-32 flex flex-wrap justify-between gap-16'>
            <div className='w-full lg:w-7/12'>
              <p className='text-xl font-bold'>Enquire Today</p>
              <p className='py-4'>* Indicates a required field</p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      className={`peer h-full w-full border-b ${errors?.firstname?.type === "required" ? 'border-red-500' : 'border-black'} pt-4 pb-1.5 text-sm text-[#272424] outline outline-0`}
                      placeholder=" "
                      {...register("firstname", {
                        required: true
                      })}
                    />
                    {errors?.firstname?.type === "required" && <p className='text-red-500 text-xs'>This field is required</p>}
                    <label className={`pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] leading-tight transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight ${errors?.firstname?.type === "required" ? 'text-red-500' : ''}`}>
                      Name *
                    </label>
                  </div>
                </div>              
                
                <div className='pt-8'>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      className={`peer h-full w-full border-b ${errors?.email?.type === "required" ? 'border-red-500' : 'border-black'} pt-4 pb-1.5 text-sm text-[#272424] outline outline-0`}
                      placeholder=" "
                      {...register("email", {
                        required: true
                      })}
                    />
                    {errors?.email?.type === "required" && <p className='text-red-500 text-xs'>This field is required</p>}
                    <label className={`pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] leading-tight transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight ${errors?.email?.type === "required" ? 'text-red-500' : ''}`}>
                      Email *
                    </label>
                  </div>
                </div>
                
                <div className='pt-8'>
                  <div className="relative h-11 w-full min-w-[200px]">
                    <input
                      className={`peer h-full w-full border-b ${errors?.telephone?.type === "required" ? 'border-red-500' : 'border-black'} pt-4 pb-1.5 text-sm text-[#272424] outline outline-0`}
                      placeholder=" "
                      {...register("telephone", {
                        required: true
                      })}
                    />
                    {errors?.telephone?.type === "required" && <p className='text-red-500 text-xs peer-border-red-500'>This field is required</p>}
                    <label className={`pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] leading-tight transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-focus:text-[11px] peer-focus:leading-tight ${errors?.telephone?.type === "required" ? 'text-red-500' : ''}`}>
                      Telephone *
                    </label>
                  </div>
                </div>

                <div className='py-8'>
                  <p className='pb-3 font-bold'>Your Message *</p>
                  <textarea rows={6} 
                    className={`p-2 border ${errors?.message?.type === "required" ? 'border-red-500' : 'border-black'} outline-none resize-y w-full`} 
                    placeholder='Type your message or enquiry here'
                    {...register("message", {
                      required: true
                    })}
                    ></textarea>
                    {errors?.message?.type === "required" && <p className='text-red-500 text-xs'>This field is required</p>}
                </div>
                
                <button type='submit' className="px-6 py-3 font-bold text-white text-sm lg:text-base xl:text-lg bg-[#C00008] rounded-md hover:-translate-y-2 active:scale-110 transition duration-300">SEND ENQUIRY</button>
              </form>
              
              
            </div>
            <div className='w-full lg:w-4/12'>
              <p className='text-2xl font-bold'>Other methods of contact</p>
              <p className='py-4 leading-relaxed'>Unit 6a Breightmet Industrial Estate,<br/>Off Breightmet Fold Lane,<br/>Breightmet,<br/>Bolton,<br/>BL2 6PT</p>
              <p>Telephone : 0300 303 2722</p>
              <p className='py-4'>Email : hello@example.com</p>
              <div className='pt-8'>
                <p className='font-bold text-xl'>Our other regional offices</p>
                <div className='py-4'>
                  <label htmlFor="office_select" className="sr-only">
                      Select an office
                  </label>
                  <select
                      id="office_select"
                      className="w-full block py-2.5 px-2 text-black border border-black rounded-md focus:outline-none peer font-roboto"                   
                  >
                    <option value="Select an office">Select an office</option>
                    <option value="Sheffield">Sheffield</option>
                     <option value="Bolton">Bolton</option>
                  </select>
                </div>
                <button className="py-3 w-full font-bold text-white text-sm lg:text-base xl:text-lg bg-[#C00008] rounded-md hover:-translate-y-2  active:scale-110 transition duration-300">SEARCH</button>
              </div>
            </div>
          </div>         
        </div>
      </section>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2379.4835459473147!2d-1.4507449228941498!3d53.388289571583954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487979f8491fc929%3A0x9b9a5d2db722a0b4!2sTraining%204%20Industry!5e0!3m2!1sen!2sus!4v1698890077145!5m2!1sen!2sus"
          className="w-full h-[400px] lg:h-[500px] xl:h-[650px] border-2 sm:border-4 border-[#C00008]"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>     
      <Footer/>
    </main>   
  )
}