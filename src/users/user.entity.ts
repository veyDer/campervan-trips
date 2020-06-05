import { Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt'

import * as jwt from 'jsonwebtoken';
import { UserResponse } from "./user.dto";

@Entity('users')
export class UserEntity {
    @ObjectIdColumn()
    id: ObjectID

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column({
        type: 'text',
        unique: true
    })
    username: string

    @Column('tinytext')
    password: string

    @Column('tinytext')
    firstName: string

    @Column('tinytext')
    lastName: string

    @Column({default: true})
    isActive: boolean

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password)
    }

    toResponseObject(showToken = true): UserResponse {
        const {id, username, token, created_at} = this
        const responseObject: UserResponse = { id, username, created_at }

        if (showToken) {    
            responseObject.token = token
        }
        return responseObject
    }

    private get token() {
        const {id, username} = this
        return jwt.sign({
            id, username
        }, process.env.JWT_SECRET, {expiresIn: '60s'})
    }
}