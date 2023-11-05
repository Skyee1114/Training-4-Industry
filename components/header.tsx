import Menu from "@/components/menu";

export default function Header({ colorMode, headerColor, headerTitle }: { colorMode: string, headerColor: string, headerTitle: string }) {

    return (

        <section  className={"header-"+ headerColor +"-img"}>
            <div className="container mx-auto">
                <div className="max-w-[90%] mx-auto">
                    <Menu colorMode={colorMode}/>

                    <div className='pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-24 lg:pb-36 xl:pt-32 xl:pb-48'>
                        <h1 className='xl:w-1/2 font-racing text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight'>{headerTitle}</h1>
                    </div>
                </div>
            </div>            
        </section>
    ) 
}