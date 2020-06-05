import { Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken';
import { CONST } from 'src/shared/const';

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

    @Column('tinytext', {array: true, default: [CONST.ROLE_USER]})
    roles: string[]

    @BeforeInsert()
    async beforeInsert() {
        if (!this.roles) {
            this.roles = [CONST.ROLE_USER]
        }
        this.password = await bcrypt.hash(this.password, 10)
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password)
    }

    toResponseObject(showToken = true): UserResponse {
        const {id, username, token, created_at, roles} = this
        const responseObject: UserResponse = { id, username, created_at, roles }

        if (showToken) {    
            responseObject.token = token
        }
        return responseObject
    }

    private get token() {
        const {id, username, roles} = this
        return jwt.sign({
            id, username, roles
        }, process.env.JWT_SECRET, {expiresIn: '1h'})
    }
}