import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    name: string;
    image: string;
    link: string;
    index: number;
    backgroundImage?: string;
    aosType?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    name,
    image,
    link,
    index,
    backgroundImage,
    aosType = "fade-up"
}) => {
    return (
        <Link
            to={link}
            className="group bg-gradient-to-br from-[#F5F7FA] to-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer relative flex flex-col h-full border border-gray-200/30"
            data-aos={aosType}
            data-aos-delay={index * 100}
            style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
        >
            {/* White inset box for product image */}
            <div className="pt-3 px-3 flex-grow">
                <div className="bg-white h-64 flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-md">
                    {image ? (
                        <img
                            alt={name}
                            className="w-[92%] h-[92%] object-contain transition-transform duration-700 group-hover:scale-105"
                            src={image}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                            <i className="ri-image-line text-4xl text-gray-300"></i>
                        </div>
                    )}
                </div>
            </div>

            {/* Title and Action Button */}
            <div className="px-3 py-4 min-h-[4rem] flex items-center justify-center">
                <h3 className="text-xl font-medium text-gray-800 transition-colors duration-300 group-hover:text-[#2879B6] text-center">
                    {name}
                </h3>
                {/* Hide blue button for now
                <div className="w-11 h-11 bg-[#2879B6] flex items-center justify-center transition-all duration-300 group-hover:bg-[#1f5f8f] group-hover:shadow-lg relative overflow-hidden">
                    <i className="ri-external-link-line text-white text-lg relative z-10 transition-transform duration-300 group-hover:scale-110"></i>
                    <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
                */}
            </div>
        </Link>
    );
};

export default ProductCard;
