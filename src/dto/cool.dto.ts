import { getSchema, Rule, RuleType } from '@midwayjs/validate';

class Refund {
  // 退款单号
  @Rule(RuleType.string().required())
  orderNum: string;
  // 金额
  @Rule(RuleType.number().required())
  amount: number;
  // 实际退款金额
  @Rule(RuleType.number().required())
  realAmount: number;
  // 状态 0-申请中 1-已退款 2-拒绝
  @Rule(RuleType.valid(0, 1, 2).required())
  status: number;
  // 申请时间
  @Rule(RuleType.date().required())
  applyTime: Date;
  // 退款时间
  @Rule(RuleType.date().required())
  time: Date;
  // 退款原因
  @Rule(RuleType.string().required())
  reason: string;
  // 拒绝原因
  @Rule(RuleType.string().required())
  refuseReason: string;
}

export class CoolDto {
  @Rule(RuleType.number())
  id: number;

  @Rule(getSchema(Refund).required())
  refund: Refund;
}
