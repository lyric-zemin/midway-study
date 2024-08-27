import { getSchema, PickDto, Rule, RuleType } from '@midwayjs/validate';
import { RoleDto } from './role.dto';

export class AddUserDto {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required().max(10))
  account: string;

  @Rule(RuleType.string().required().max(60))
  password: string;

  @Rule(getSchema(RoleDto).required())
  role: RoleDto;
}

export class UpdateUserDto extends AddUserDto {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string())
  name: string;

  @Rule(RuleType.string().max(10))
  account: string;

  @Rule(RuleType.string().max(60))
  password: string;

  @Rule(getSchema(RoleDto))
  role: RoleDto;
}

export class UserDto extends PickDto(AddUserDto, ['account', 'password']) {}
