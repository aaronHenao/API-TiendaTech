import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Rol{
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER'
}
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100})
    name: string;

    @Column({type: 'varchar', length:100, unique: true})
    email: string;

    @Column({type: 'varchar', length: 100})
    password: string;

    @Column({type: 'enum', enum: Rol, default: Rol.CUSTOMER})
    rol: Rol;
}