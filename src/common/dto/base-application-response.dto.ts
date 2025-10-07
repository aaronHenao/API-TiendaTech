export class BaseApplicationResponse<T>{
    statusCode: number;
    message: string;
    data: T;
}