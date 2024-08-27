import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import dayjs from 'dayjs';

const DateTransformer = {
  to: value => value,
  from: value => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
};

export class BaseEntity {
  @PrimaryGeneratedColumn({ comment: '自增键' })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建日期',
    transformer: DateTransformer,
  })
  createdDate: string;

  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新日期',
    transformer: DateTransformer,
  })
  updateDate: string;
}
