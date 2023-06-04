import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

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
}