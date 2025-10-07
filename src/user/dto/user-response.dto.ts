export class UserResponseDto{
    name: string;
    email: string;

    constructor(user: any){
        this.name = user.name;
        this.email = user.email
    }
}