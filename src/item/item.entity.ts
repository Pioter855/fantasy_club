import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  author: string;
  @Column()
  title: string;
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
  @Column()
  category: string;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  updateAt: Date;
}
