import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn({ comment: '自增键' })
  id: number;

  @CreateDateColumn({ type: 'date', comment: '创建日期', select: false })
  createdDate: Date;

  @UpdateDateColumn({
    type: 'date',
    comment: '更新日期',
    // transformer: { from: () => '不给你看', to: () => new Date() },
  })
  updateDate: Date;
}
