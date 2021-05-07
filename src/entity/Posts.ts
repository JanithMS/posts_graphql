import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";

@ObjectType()
@Entity()
export class Post extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  _id: number;
  
  @Field()
  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.posts)
  by: User;

}