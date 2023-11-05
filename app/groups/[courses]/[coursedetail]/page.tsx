import dotenv from 'dotenv';
import axios from 'axios';
import Header from "@/components/header";
import Footer from "@/components/footer";
import OurCourses from "@/components/ourcourses";
import WhyChooseUs from "@/components/whychooseus";
import AboutUs from "@/components/aboutus";
import Courseitem from '@/components/courseitem';

const getSingleTrainingCourse = async (code: string, apiurl: any, username: any, password: any) => {
    
    const response = await axios.post(`${apiurl}/Webservices/BrightOfficeAPI.asmx/GetSingleTrainingCourseJSON`, {
        Username: username,
        Password: password,
        Code: code
    });  
    
    return response.data.d.Records;
}

export default async function CourseDetail({ params }: { params: { coursedetail: string, courses: string }}) {

    dotenv.config();
    const username = process.env.BRIGHTOFFICE_API_USERNAME;
    const password = process.env.BRIGHTOFFICE_API_PASSWORD;
    const apiurl = process.env.BRIGHTOFFICE_API_URL;
    const imageurl = process.env.BRIGHTOFFICE_Image_URL;

    const courses = decodeURIComponent(params.courses)
    const coursedetail = decodeURIComponent(params.coursedetail)

    const data = await getSingleTrainingCourse(coursedetail, apiurl, username, password)
    
    return (    
        <main>
            <Header colorMode="light" headerColor={`${data[0].County === "Bolton" ? "blue" : data[0].County === "Sheffield" ? "green": "red"}`} headerTitle={courses}/>
            <section className='container mx-auto' >
                <div className="max-w-[90%] mx-auto relative">
                    {courses && apiurl && username && password &&
                        <Courseitem code={courses} courseSingle={data[0]} apiurl={apiurl} username={username} password={password} />                     
                    }

                    <div className="pt-24 xl:pt-60">
                        <AboutUs order="text"/>    
                    </div>   
                    <div className='pt-20'>
                        {
                            imageurl && apiurl && username && password &&
                            <OurCourses/>
                        }
                        
                    </div>
                    <div className='w-10/12 mx-auto py-24 xl:py-40 text-center'>
                        <WhyChooseUs/>
                    </div>
                </div>
            </section>
            <Footer/>  
        </main>
        
    )
}
