import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Role extends BaseEntity {
  @Column({ comment: '角色名', unique: true })
  name: string;

  @Column({ comment: '角色描述' })
  description: string;

  @Column({ comment: '是否为超级管理员', default: false })
  administrator: boolean;

  @OneToMany(() => User, user => user.role)
  users: User[];
}
