"use client";
import React, { useState } from "react";
const ImagesSlider = ({ images }: any) => {
    const [imageIndex, setImageIndex] = useState<number>(0);

    return (
        <>
            <div className="relative w-full h-72">
                <img
                    src={images?.[imageIndex]}
                    alt="Property Image"
                    width={200} height={200}
                    className=" w-full h-72  absolute rounded-md object-cover  object-center"
                />
            </div>
            <div className=" grid grid-cols-3 min-[500px]:grid-cols-4  gap-4">
                {images &&
                    images?.map((img: any, index: number) => (
                        <div key={index} className="col-span-1 border-gray-400 border-2 rounded-md cursor-pointer">
                            <img
                                src={img}
                                alt="Property Image"
                                width={10}
                                height={10}
                                onClick={() => setImageIndex(index)}
                                className=" w-full h-24 sm:h-28 rounded-md object-cover object-center cursor-pointer"
                            />
                        </div>
                    ))}
            </div>
        </>
    );
};

export default ImagesSlider;
