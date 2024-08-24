import { ApiProperty } from '@midwayjs/swagger';
import { OmitDto, Rule, RuleType } from '@midwayjs/validate';

export class AuthorDto {
  @Rule(RuleType.number().required())
  @ApiProperty({ description: '作者id' })
  id: number;

  @Rule(RuleType.string().required())
  @ApiProperty({ description: '作者名称' })
  name: string;
}

export class NewAuthorDto extends OmitDto(AuthorDto, ['id']) {}
