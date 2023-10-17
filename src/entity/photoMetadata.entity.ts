import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Photo } from './photo.entity';

// 图片元信息
@Entity()
export class PhotoMetadata extends BaseEntity {
  @Column('int')
  height: number;

  @Column('int')
  width: number;

  @Column()
  orientation: string;

  @Column()
  compressed: boolean;

  @Column()
  comment: string;

  @OneToOne(() => Photo, photo => photo.metaData)
  @JoinColumn()
  photo: Photo;
}
