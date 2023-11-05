import dotenv from 'dotenv';
import Coursetable from "@/components/coursetable";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from 'next/link'

export default function Courses ({ params }: { params: { courses: string } }) {
    dotenv.config();
    const username = process.env.BRIGHTOFFICE_API_USERNAME;
    const password = process.env.BRIGHTOFFICE_API_PASSWORD;
    const apiurl = process.env.BRIGHTOFFICE_API_URL;
    const courses = decodeURIComponent(params.courses)

    return (
        <main>
            <Header colorMode="light" headerColor="gray" headerTitle={courses}/>            
                {courses && apiurl && username && password &&
                    <Coursetable code={courses} apiurl={apiurl} username={username} password={password}/>
                }                    
            <Footer/>
        </main>
        
        
    )
}