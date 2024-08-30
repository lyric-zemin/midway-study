import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

/**
 * 数据实体
 */
@Entity()
export class Cool extends BaseEntity {
  @Index()
  @Column({
    type: 'varchar',
    length: 7,
    asExpression: "DATE_FORMAT(createTime, '%Y-%m')",
    generatedType: 'VIRTUAL',
    comment: '月份',
  })
  month: string;

  @Index()
  @Column({
    type: 'varchar',
    length: 4,
    asExpression: "DATE_FORMAT(createTime, '%Y')",
    generatedType: 'VIRTUAL',
    comment: '年份',
  })
  year: string;

  @Index()
  @Column({
    type: 'varchar',
    length: 10,
    asExpression: "DATE_FORMAT(createTime, '%Y-%m-%d')",
    generatedType: 'VIRTUAL',
    comment: '日期',
  })
  date: string;

  @Column({ comment: '退款', type: 'json', nullable: true })
  refund: {
    // 退款单号
    orderNum: string;
    // 金额
    amount: number;
    // 实际退款金额
    realAmount: number;
    // 状态 0-申请中 1-已退款 2-拒绝
    status: number;
    // 申请时间
    applyTime: Date;
    // 退款时间
    time: Date;
    // 退款原因
    reason: string;
    // 拒绝原因
    refuseReason: string;
  };

  // 将退款状态提取出来，方便查询
  @Index()
  @Column({
    asExpression: "JSON_EXTRACT(refund, '$.status')",
    generatedType: 'VIRTUAL',
    comment: '退款状态',
    nullable: true,
  })
  refundStatus: number;
}
