import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ comment: '角色名', unique: true })
  name: string;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
