import { ApiProperty } from '@midwayjs/swagger';
import { OmitDto, Rule, RuleType } from '@midwayjs/validate';

export class PhotoMetadataDto {
  @Rule(RuleType.number().required())
  @ApiProperty({ description: '图片元数据id', example: 1 })
  id: number;

  @Rule(RuleType.number().required())
  @ApiProperty({ description: '图片高度' })
  height: number;

  @Rule(RuleType.number().required())
  @ApiProperty({ description: '图片宽度' })
  width: number;

  @Rule(RuleType.string().required())
  @ApiProperty({ description: '图片方向' })
  orientation: string;

  @Rule(RuleType.boolean().default(false))
  @ApiProperty({ description: '是否压缩' })
  compressed: boolean;

  @Rule(RuleType.string().required())
  @ApiProperty({ description: '图片描述' })
  comment: string;
}

export class NewPhotoMetadataDto extends OmitDto(PhotoMetadataDto, ['id']) {}
