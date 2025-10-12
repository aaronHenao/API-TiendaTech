import { Expose } from "class-transformer";

export class ReviewResponseDto{

    @Expose()
    id: number;

    @Expose()
    productId: number;

    @Expose()
    comment: string;
    
}