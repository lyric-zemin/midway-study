import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({ comment: '自增键' })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建日期',
  })
  createdDate: string;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新日期',
  })
  updateDate: string;
}
