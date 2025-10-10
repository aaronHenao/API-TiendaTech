import { Expose, Type } from "class-transformer";

export class UserResponseDto{

    @Expose()
    @Type(() => Number)
    id: number; 

    @Expose()
    name: string;

    @Expose()
    email: string;

}