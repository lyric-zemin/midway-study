// src/dto/user.ts
import { OmitDto, Rule, RuleType, getSchema } from '@midwayjs/validate';
import { PhotoMetadataDto, NewPhotoMetadataDto } from './photoMetaData';
import { AuthorDto, NewAuthorDto } from './author';
import { AlbumDto, NewAlbumDto } from './album';
import { ApiProperty } from '@midwayjs/swagger';

export class PhotoDTO {
  @Rule(RuleType.number().required())
  @ApiProperty({ description: '图片id' })
  id: number;

  @Rule(RuleType.string().required().max(100))
  @ApiProperty({ description: '图片名' })
  name: string;

  @Rule(RuleType.string().default('暂无描述'))
  @ApiProperty({ description: '图片描述' })
  description: string;

  @Rule(RuleType.string().required())
  @ApiProperty({ description: '图片路径' })
  filename: string;

  @Rule(RuleType.number().default(0))
  @ApiProperty({ description: '图片浏览次数' })
  views: number;

  @Rule(RuleType.boolean().default(false))
  @ApiProperty({ description: '图片是否公开' })
  isPublished: boolean;

  @Rule(getSchema(PhotoMetadataDto).required())
  @ApiProperty({ type: PhotoMetadataDto })
  metaData: PhotoMetadataDto;

  @Rule(getSchema(AuthorDto).required())
  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;

  @Rule(RuleType.array().items(getSchema(AlbumDto)).required())
  @ApiProperty({ type: 'array', items: { type: AlbumDto } })
  albums: AlbumDto[];
}

export class NewPhotoDto extends OmitDto(PhotoDTO, [
  'id',
  'metaData',
  'author',
  'albums',
]) {
  @Rule(getSchema(NewPhotoMetadataDto).required())
  @ApiProperty({ type: NewPhotoMetadataDto })
  metaData: NewPhotoMetadataDto;

  @Rule(getSchema(NewAuthorDto).required())
  @ApiProperty({ type: NewAuthorDto })
  author: NewAuthorDto;

  @Rule(RuleType.array().items(getSchema(NewAlbumDto)).required())
  @ApiProperty({ type: NewAlbumDto })
  albums: NewAlbumDto[];
}
