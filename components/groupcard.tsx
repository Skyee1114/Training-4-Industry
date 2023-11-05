'use client'
import { useState } from "react";

const defaultImageUrl = '/img/courses_box.svg';

export default function Groupcard({ imageurl }: { imageurl: string }) {
    return (
        <>            
            <img
                src={imageurl}
                alt="Groups"
                className="h-40 sm:h-60 lg:h-72 2xl:h-48 w-screen object-cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = defaultImageUrl;
                }}
            />                
        </>
    )
}