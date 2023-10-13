// entity/photo.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

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
}
