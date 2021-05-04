import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./Posts";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  _id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => [Posts], { nullable: true })
  @OneToMany(() => Posts, post => post.by)
  posts?: Posts[];
}