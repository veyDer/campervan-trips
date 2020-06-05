import { Entity, ObjectIdColumn, ObjectID, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('trips')
export class TripEntity {
    @ObjectIdColumn()
    id: ObjectID

    @CreateDateColumn({type: 'timestamp'})
    created_at: Date

    @UpdateDateColumn({type: 'timestamp', nullable: true})
    updated_at?: Date

    @Column('text')
    name: string

    @Column('text')
    description: string
}