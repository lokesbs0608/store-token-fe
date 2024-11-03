interface IProduct {
    _id: Key | null | undefined;
    name: string;
    description: string;
    category: mongoose.Types.ObjectId;
    brand?: string;
    sku: string;
    price: number;
    discount: number;
    stock: number;
    images: {
        url: string;
        altText?: string;
        isPrimary?: boolean;
    }[];
    specifications: {
        color?: string;
        size?: string;
        weight?: number;
        dimensions?: {
            length?: number;
            width?: number;
            height?: number;
        };
        material?: string;
        other?: Map<string, string>;
    };
    ratings: {
        user: mongoose.Types.ObjectId;
        rating: number;
        review?: string;
        date: Date;
    }[];
    averageRating: number;
    tags: string[];
    status: 'active' | 'inactive' | 'archived';
    created_at: Date;
    updated_at: Date;
    discountedPrice?: number;
    store_id: mongoose.Types.ObjectId;
}
