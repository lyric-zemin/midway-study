// src/dto/user.ts
import { OmitDto, Rule, RuleType, getSchema } from '@midwayjs/validate';
import { PhotoMetadataDto, NewPhotoMetadataDto } from './photoMetaData.dto';
import { AuthorDto, NewAuthorDto } from './author.dto';
import { AlbumDto, NewAlbumDto } from './album.dto';

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

  @Rule(getSchema(PhotoMetadataDto).required())
  metaData: PhotoMetadataDto;

  @Rule(getSchema(AuthorDto).required())
  author: AuthorDto;

  @Rule(RuleType.array().items(getSchema(AlbumDto)).required())
  albums: AlbumDto[];
}

export class NewPhotoDto extends OmitDto(PhotoDTO, [
  'id',
  'metaData',
  'author',
  'albums',
]) {
  @Rule(getSchema(NewPhotoMetadataDto).required())
  metaData: NewPhotoMetadataDto;

  @Rule(getSchema(NewAuthorDto).required())
  author: NewAuthorDto;

  @Rule(RuleType.array().items(getSchema(NewAlbumDto)).required())
  albums: NewAlbumDto[];
}
