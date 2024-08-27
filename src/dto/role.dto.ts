import { Rule, RuleType } from '@midwayjs/validate';

export class RoleDto {
  @Rule(RuleType.number().required())
  id: number;
}

export class AddRoleDto {
  @Rule(RuleType.string().required())
  name: string;
}

export class UpdateRoleDto extends RoleDto {
  @Rule(RuleType.string())
  name: string;
}
