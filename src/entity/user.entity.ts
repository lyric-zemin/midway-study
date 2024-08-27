import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ comment: '用户名' })
  name: string;

  @Column({ comment: '账号', unique: true })
  account: string;

  @Column({ comment: '密码' })
  password: string;

  @ManyToOne(() => Role, role => role.users)
  role: Role;
}
