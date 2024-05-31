import mongoose from "mongoose";

export interface Product {
    _id?: mongoose.Types.ObjectId;
    name: string;
    description: string;
    priceConfiguration: string;
    tenantId: string;
    categoryId: string;
    attributes: string;
    image: string;
}

export interface Filter {
    tenantId?: string;
    categoryId?: mongoose.Types.ObjectId;
    isPublish?: boolean;
}

export interface PaginateQuery {
    page: number;
    limit: number;
}
