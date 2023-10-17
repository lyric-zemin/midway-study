// entity/photo.entity.ts
import { Entity, Column, OneToOne, ManyToOne, ManyToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PhotoMetadata } from './photoMetadata.entity';
import { Author } from './author.entity';
import { Album } from './album.entity';

// 图片
@Entity()
export class Photo extends BaseEntity {
  @Column({ length: 100, comment: '图片名' })
  name: string;

  @Column('text')
  description: string;

  @Column()
  filename: string;

  @Column({ type: 'double', update: false })
  views: number;

  @Column()
  isPublished: boolean;

  @OneToOne(() => PhotoMetadata, photoMetadata => photoMetadata.photo, {
    cascade: true,
  })
  metaData: PhotoMetadata;

  // 在多对一/一对多关系中，所有者方始终是多对一
  @ManyToOne(() => Author, author => author.photos, {
    cascade: true,
  })
  author: Author;

  @ManyToMany(() => Album, album => album.photos, {
    cascade: true,
  })
  albums: Album[];
}
