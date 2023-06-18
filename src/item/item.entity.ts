import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Author } from '../author/author.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;


  @CreateDateColumn({ type: 'date' })
  createAt: Date;

  @UpdateDateColumn({ type: 'date' })
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.items, { cascade: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToMany(() => Author, (author) => author.items)
  @JoinTable()
  authors: Author[];

  @ManyToMany(() => Category, (category) => category.items)
  @JoinTable()
  categories: Category[];
}
