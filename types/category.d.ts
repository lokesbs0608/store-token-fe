interface ICategory {
    name: string;
    description?: string;
    parentCategory?: mongoose.Types.ObjectId;
    created_at: Date;
    updated_at: Date;
    store_id: mongoose.Types.ObjectId
    _id: mongoose.Types.ObjectId
}