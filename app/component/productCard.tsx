import Image from 'next/image';
import React, { useState } from 'react';

const ProductCard = ({ product }: { product: IProduct }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    return (
        <div className="border flex rounded-lg shadow-md transition-transform transform bg-white dark:bg-gray-800 overflow-hidden">
            <div className="flex-shrink-0 w-1/3 h-[100px]">
                <Image
                    width={100}
                    height={100}
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover transition duration-300"
                />
            </div>
            <div className="flex-grow p-2">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{product.price.toFixed(2)}</p>
                <div className="flex items-center justify-end">
                    <button
                        onClick={handleDecrement}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg transition duration-300 hover:bg-gray-300"
                    >
                        -
                    </button>
                    <span className="mx-2 text-lg font-semibold">{quantity}</span>
                    <button
                        onClick={handleIncrement}
                        className="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg transition duration-300 hover:bg-gray-300"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
