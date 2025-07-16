import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Market {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  address?: string;
}