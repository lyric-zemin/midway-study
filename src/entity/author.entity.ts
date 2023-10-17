import { Entity } from 'typeorm';
import { Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Photo } from './photo.entity';

// 作者
@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Photo, photo => photo.author) // note: we will create author property in the Photo class below
  photos: Photo[];
}
