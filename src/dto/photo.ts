// src/dto/user.ts
import { OmitDto, Rule, RuleType } from '@midwayjs/validate';

export class PhotoDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required().max(100))
  name: string;

  @Rule(RuleType.string().default('暂无描述'))
  description: string;

  @Rule(RuleType.string().required())
  filename: string;

  @Rule(RuleType.number().default(0))
  views: number;

  @Rule(RuleType.boolean().default(false))
  isPublished: boolean;
}

export class NewPhotoDto extends OmitDto(PhotoDTO, ['id']) { }
