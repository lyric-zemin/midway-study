import { OmitDto, Rule, RuleType } from '@midwayjs/validate';

export class AuthorDto {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  name: string;
}

export class NewAuthorDto extends OmitDto(AuthorDto, ['id']) {}
