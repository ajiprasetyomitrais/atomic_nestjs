import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
class ProductEntity {
  //primary or unique row in table
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column()
  public price: number;
}

export default ProductEntity;
