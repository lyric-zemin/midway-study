import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({ comment: '自增键' })
  id: number;

  @CreateDateColumn({ comment: '创建日期' })
  createTime: Date;

  @UpdateDateColumn({ comment: '更新日期' })
  updateTime: Date;

  @DeleteDateColumn({ select: false, comment: '软删除日期' })
  deleteTime: Date;
}
