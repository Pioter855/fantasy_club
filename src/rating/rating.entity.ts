import { Item } from '../item/item.entity';
import { User } from '../user/user.entity';
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Check('value >= 1 AND value <= 5')
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  value: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: Date;

  @ManyToOne(() => Item, (item) => item.ratings, { onDelete: 'CASCADE' })
  items: Item;

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;
}
