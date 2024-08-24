import { ApiProperty } from '@midwayjs/swagger';
import { OmitDto, Rule, RuleType } from '@midwayjs/validate';

export class AlbumDto {
  @Rule(RuleType.number().required())
  @ApiProperty({ description: '相册id' })
  id: number;

  @Rule(RuleType.string().required())
  @ApiProperty({ description: '相册名称' })
  name: string;
}

export class NewAlbumDto extends OmitDto(AlbumDto, ['id']) {}
