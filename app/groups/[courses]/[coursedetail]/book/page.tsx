import Header from "@/components/header";
import Footer from "@/components/footer";
import { countries } from "country-data";
import dotenv from 'dotenv';
import axios from "axios";

const getSingleTrainingCourse = async (code: string, apiurl: string, username: string, password: string) => {
    
    const response = await axios.post(`${apiurl}/Webservices/BrightOfficeAPI.asmx/GetSingleTrainingCourseJSON`, {
        Username: username,
        Password: password,
        Code: code
    });  
    
    return response.data.d.Records;
}

const addDelegateToTrainingCourseV2 = async (code: string, apiurl: string, username: string, password: string) => {
    const response = await axios.post (`${apiurl}/Webservices/BrightOfficeAPI.asmx/AddDelegateToTrainingCourseV2`, {
        Course: {
            Code: code,
            CustomPrice: "",
            DelegateCourseStatus: null,
            Notes: null,
            Price: null,
            VATCode: null,
            VATAmount: null,
            DiscountAmount: null,
            OrderNumber: null,
            PurchaseOrder: null,
            BookingReference: null,
            DelegatePointsUsed: null,
            IsUsePoint: false
        },
        Delegates: [
            {
                LearnerDelegate: {
                    DelegateCode: "",
                    CustomerCode: null,
                    Title: null,
                    FirstName: "Testy",
                    LastName: "Saunders",
                    DateofBirth: null,
                    HouseNumber: null,
                    HouseName: null,
                    Address1: null,
                    Address2: null,
                    Address3: null,
                    Address4: null,
                    PostCode: null,
                    Status: null,
                    Notes: null,
                    Source: null,
                    StaffName: null,
                    Email: "testysaunders123@gmail.com",
                    Telephone: null,
                    Mobile: null,
                    JobTitle: null,
                    JobType: null,
                    CustomField: [
                        {
                            CustomFieldNo: "1",
                            CustomFieldValue: ""
                        }
                    ],
                    Course: {
                        Code: "",
                        CustomPrice: null,
                        DelegateCourseStatus: null,
                        Notes: null,
                        Price: null,
                        VATCode: null,
                        VATAmount: null,
                        DiscountAmount: null,
                        OrderNumber: null,
                        PurchaseOrder: null,
                        BookingReference: null,
                        DelegatePointsUsed: null,
                        IsUsePoint: false
                    }
                },
                Customer: {
                    customerCode: "",
                    b2B: false,
                    title: "",
                    firstName: "Testy",
                    middleName: "",
                    surname: "Saunders",
                    houseName: "",
                    houseNumber: "",
                    address1: "",
                    address2: "",
                    address3: "",
                    address4: "",
                    postcode: "",
                    AlternativeSalutation: "",
                    source: "",
                    SourceEmail: "",
                    IsSourceNeedToCreate: "true",
                    SourceAddress: {
                        houseName: "",
                        houseNumber: "",
                        address1: "",
                        address2: "",
                        address3: "",
                        address4: "",
                        postcode: ""
                    },
                    CompanyAddress: {
                        address1: "",
                        address2: "",
                        address3: "",
                        address4: "",
                        postcode: ""
                    },
                    MultiContacts: [
                        {
                            CustomFields: [
                                {
                                    CustomFieldNo: "1",
                                    CustomFieldValue: ""
                                }
                            ],
                            Firstname: "",
                            Surname: "",
                            address1: "",
                            address2: "",
                            address3: "",
                            address4: "",
                            postcode: ""
                        }
                    ],
                    CustomFields: [
                        {
                            CustomFieldNo: "1",
                            CustomFieldValue: ""
                        }
                    ],
                    telephone: "",
                    mobile: "",
                    dateofBirth: "",
                    company: null,
                    email: "testysaunders123@gmail.com",
                    ninumber: "",
                    ContactMethod: [
                        "Email"
                    ],
                    notes: "",
                    BankDetail: [
                        {
                            BankName: "",
                            AccountName: "",
                            AccountNumber: "",
                            SortCode: ""
                        }
                    ]
                }
            }
        ],
        UserInfo: {
            Username: username,
            Password: password
        }


    });  
    
    return response.data.d.Records.DelegateCode;
}

const createTrainingCourseDelegateInvoice = async (code: string, delegate: string, apiurl: string, username: string, password: string) => {
    const response = await axios.post(`${apiurl}/Webservices/BrightOfficeAPI.asmx/CreateTrainingCourseDelegateInvoice`, {
        UserInfo: {
            Username: username,
            Password: password
        },
        details: {
            TrainingCourseCode: code,
            DelegateCode: delegate,
            IsExtensionInvoice: false,
            ExtensionCost: "",
            ExtensionVATCode: ""
        }
    });  
    
    return response.data.d.Records;
}

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

export default async function BookCourse({ params }: { params: { coursedetail: string, courses: string }}) {

    dotenv.config();
    const username = process.env.BRIGHTOFFICE_API_USERNAME;
    const password = process.env.BRIGHTOFFICE_API_PASSWORD;
    const apiurl = process.env.BRIGHTOFFICE_API_URL;    

    const courses = decodeURIComponent(params.courses)
    const coursedetail = decodeURIComponent(params.coursedetail)

    const data = await getSingleTrainingCourse(coursedetail, apiurl ?? '', username ?? '', password ?? '')

    const delegateCode = await addDelegateToTrainingCourseV2(coursedetail, apiurl ?? '', username ?? '', password ?? '')

    const telephoneCodes = countries.all.map((country:any) => ({
        code: country.countryCallingCodes[0] ? `${country.countryCallingCodes[0]}` : undefined,
        name: country.name,
    }));

  return (    
    <main>
        <Header colorMode="light" headerColor="red" headerTitle="Buy now"/>
        <section className='container mx-auto'>
            <div className="max-w-[90%] mx-auto">
                <div>
                    <h1 className='py-10 lg:py-16 text-3xl lg:text-4xl xl:text-5xl font-bold'>Book Course</h1>
                    <p className="text-base lg:text-xl xl:text-2xl font-bold">TAMS II & III Safety Course at on 10 November 2023</p>            
                </div>
                <div className='pt-12 pb-12 sm:pb-24 flex flex-wrap justify-between gap-16'>
                    <div className='w-full xl:w-7/12'>
                        <p className="text-base lg:text-xl xl:text-2xl font-bold">Your Details</p>
                        <p className='text-xl font-bold pt-8'>Course Participants</p>
                        <p className="py-4">Please note if you require more than five participants, please complete the course enquiry form.</p>
                        <p className=''>* Indicates a required field</p>
                        <form>
                            <p className="text-xl font-bold py-8 text-[#C00008]">Delegate</p>
                            <div>
                                <p className="font-bold">Full Name *</p>
                                <input
                                    className="w-full border-b border-black pt-4 pb-1.5 text-[#272424] outline outline-0"
                                    placeholder="Full name of participant"
                                />
                            </div>
                            <div className="py-8">
                                <p className="font-bold pb-2">Date of birth (optional)</p>
                                <div className="grid grid-cols-3 gap-4">
                                    <select
                                        id="date_select"
                                        className="block py-2.5 text-black border-b border-black focus:outline-none peer font-roboto"
                                    >
                                        <option value="Select day">Select day</option>
                                        {Array.from({ length: 31 }, (_, index) => (
                                            <option key={index + 1} value={index + 1}>
                                                {index + 1}
                                            </option>
                                        ))}
                                    </select>
                                    <select
                                        id="month_select"
                                        className="block py-2.5 text-black border-b border-black focus:outline-none peer font-roboto"
                                    >
                                        <option value="Select month">Select month</option>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </select>
                                    <select
                                        id="year_select"
                                        className="block py-2.5 text-black border-b border-black focus:outline-none peer font-roboto"
                                    >
                                        <option value="Select year">Select year</option>
                                        {Array.from({ length: 2012 - 1908 + 1 }, (_, index) => (
                                            <option key={1908 + index} value={1908 + index}>
                                                {1908 + index}
                                            </option>
                                        ))}
                                    </select>
                                </div>                    
                            </div>
                        
                            <p className="text-xl font-bold py-8 text-[#C00008]">Invoice Contact Details</p>
                            <div>
                                <p className="font-bold">Full Name *</p>
                                <input
                                    className="w-full border-b border-black pt-4 pb-1.5 text-[#272424] outline outline-0"
                                    placeholder="Booking contact first name"
                                />
                            </div>
                            <div className="pt-8">
                                <p className="font-bold">Surname *</p>
                                <input
                                    className="w-full border-b border-black pt-4 pb-1.5 text-[#272424] outline outline-0"
                                    placeholder="Booking contact surname"
                                />
                            </div>
                            <div className="pt-8">
                                <p className="font-bold">Company Name</p>
                                <input
                                    className="w-full border-b border-black pt-4 pb-1.5 text-[#272424] outline outline-0"
                                    placeholder="Your company or organisation name, if applicable"
                                />
                            </div>
                            <div className="pt-8">
                                <p className="font-bold">Email Address *</p>
                                <input
                                    className="w-full border-b border-black pt-4 pb-1.5 text-[#272424] outline outline-0"
                                    placeholder="Booking contact email address"
                                />
                            </div>
                            <div className="pt-8">
                                <p className="font-bold">Telephone Country Code *</p>
                                <select
                                    id="telephone_select"
                                    className="block py-2.5 w-full text-black border-b border-black focus:outline-none peer font-roboto"
                                    >
                                    <option value="Select country">Select country</option>
                                    {telephoneCodes.map((country: any) => (
                                        country.code && (
                                        <option key={`${country.code}-${country.name}`} value={country.code}>
                                            {`${country.code}  -  ${country.name}`}
                                        </option>
                                        )
                                    ))}
                                </select>
                            </div>
                            <div className="pt-8">
                                <p className="font-bold">Telephone *</p>
                                <input
                                    className="w-full border-b border-black pt-4 pb-1.5 text-[#272424] outline outline-0"
                                    placeholder=""
                                />
                            </div>
                            <div className="pt-8">
                                <p className="font-bold">Address 1 *</p>
                                <input
                                    className="w-full border-b border-black pt-4 pb-1.5 text-[#272424] outline outline-0"
                                    placeholder="Billing address line 1"
                                />
                            </div>
                            <div className="pt-8">
                                <p className="font-bold">Address 2 *</p>
                                <input
                                    className="w-full border-b border-black pt-4 pb-1.5 text-[#272424] outline outline-0"
                                    placeholder="Billing address line 2"
                                />
                            </div>
                            <div className="pt-8">
                                <p className="font-bold">Town / City *</p>
                                <input
                                    className="w-full border-b border-black pt-4 pb-1.5 text-[#272424] outline outline-0"
                                    placeholder="Billing town or city"
                                />
                            </div>
                            <div className="pt-8">
                                <p className="font-bold">County *</p>
                                <input
                                    className="w-full border-b border-black pt-4 pb-1.5 text-[#272424] outline outline-0"
                                    placeholder="Billing county"
                                />
                            </div>
                            <div className="pt-8">
                                <p className="font-bold">Postcode *</p>
                                <input
                                    className="w-full border-b border-black pt-4 pb-1.5 text-[#272424] outline outline-0"
                                    placeholder="Billing postcode"
                                />
                            </div>
                            <div className="pt-8">
                                <p className="font-bold">Country *</p>
                                <select
                                    id="country_select"
                                    className="block py-2.5 w-full text-black border-b border-black focus:outline-none peer font-roboto"
                                >                                
                                    <option value="Ireland">Ireland</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                </select>
                            </div>
                            <div className="py-8">
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                                <label htmlFor="vehicle1"> Please tick to confirm you have read our Terms & Conditions *</label>
                            </div>
                            <button className="py-3 px-8 font-bold text-white text-sm lg:text-base xl:text-lg bg-[#C00008] rounded-md hover:-translate-y-2  active:scale-110 transition duration-300">PROCEED TO NEXT STEP</button>
                            
                        </form>
                    </div>
                    <div className='w-full xl:w-4/12 order-first xl:order-last'>
                        <div className="border py-8 px-6 bg-[#F8F8F8]">
                            <p className='text-xl font-bold'>Course Summary</p>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Title:</p>
                                <p className="w-2/3 overflow-auto break-words">{data[0].CourseDescription}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Code:</p>
                                <p className="w-2/3 overflow-auto break-words">{data[0].Code}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Location:</p>
                                <p className="w-2/3 overflow-auto break-words">{data[0].CourseVenueDescription}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Sector:</p>
                                <p className="w-2/3 overflow-auto break-words">{data[0].Sector}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Start Date:</p>
                                <p className="w-2/3 overflow-auto break-words">{courseDay(data[0])} at {courseStartTime(data[0])}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">End Date:</p>
                                <p className="w-2/3 overflow-auto break-words">{courseDay(data[0])} at {courseEndTime(data[0])}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Duration:</p>
                                <p className="w-2/3 overflow-auto break-words">{data[0].Duration} Day</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Max Attendees:</p>
                                <p className="w-2/3 overflow-auto break-words">{data[0].MaximumNumberOfDelegates}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Places Left:</p>
                                <p className="w-2/3  overflow-auto break-words">{data[0].AvailablePlaces}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Price:</p>
                                <p className="w-2/3  overflow-auto break-words">£ {data[0].Price}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Coordinator:</p>
                                <p className="w-2/3  overflow-auto break-words">{data[0].CoordinatorName}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Email:</p>
                                <p className="w-2/3 overflow-auto break-words">{data[0].CoordinatorEmail}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Telephone:</p>
                                <p className="w-2/3  overflow-auto break-words">{data[0].CoordinatorPhone}</p>
                            </div>
                            <div className="flex justify-between pt-4">
                                <p className="w-1/3 font-bold">Mobile Tel:</p>
                                <p className="w-2/3  overflow-auto break-words">{data[0].CoordinatorMobile}</p>
                            </div>
                        </div>
                        <div className="mt-16 py-8 px-6 border bg-[#F8F8F8]">
                            <p className='text-xl font-bold'>Looking to book more than five people?</p>
                            <p className="pt-4">Please enquire if you wish to book a large party or have any queries about any of our courses.</p>
                            <p className="text-[#C00008] font-bold pt-4">MAKE ENQUIRY</p>
                        </div>
                        
                    </div>
                </div>         
            </div>
        </section>
        <Footer/>
    </main>   
  )
}