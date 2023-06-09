import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Item } from '../item/item.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type:'varchar', length:100})
  email: string

  @Column({type:'varchar', length: 100})
  username: string

  @Column({select:false, type:'varchar', length: 100})
  password: string

  @CreateDateColumn({type:'timestamp'})
  createAt: Date

  @UpdateDateColumn({type:'timestamp'})
  updateAt: Date

  @OneToMany(() => Item, (item) => item.user)
  items: Item[]
}