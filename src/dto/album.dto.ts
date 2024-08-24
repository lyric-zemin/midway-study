import { OmitDto, Rule, RuleType } from '@midwayjs/validate';

export class AlbumDto {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  name: string;
}

export class NewAlbumDto extends OmitDto(AlbumDto, ['id']) {}
