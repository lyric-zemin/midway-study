import { OmitDto, Rule, RuleType } from '@midwayjs/validate';

export class PhotoMetadataDto {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.number().required())
  height: number;

  @Rule(RuleType.number().required())
  width: number;

  @Rule(RuleType.string().required())
  orientation: string;

  @Rule(RuleType.boolean().default(false))
  compressed: boolean;

  @Rule(RuleType.string().required())
  comment: string;
}

export class NewPhotoMetadataDto extends OmitDto(PhotoMetadataDto, ['id']) { }
