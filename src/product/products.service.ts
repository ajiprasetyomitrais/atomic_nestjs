import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, UpdateResult } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import ProductEntity from './product.entity';

import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  private products: Product[] = [];

  async insertProduct(product: CreateProductDto) {
    const newProduct = await this.productRepository.create(product);
    await this.productRepository.save(newProduct);
    return newProduct;
  }

  getProducts() {
    return this.productRepository.find();
  }

  async getSingleProduct(productId: number): Promise<ProductEntity> {
    const selectedProduct: ProductEntity = await this.productRepository.findOne(
      productId,
    );
    if (!selectedProduct)
      throw new NotFoundException(`there is no user with ID ${productId}`);
    return selectedProduct;
  }

  async updateProduct(
    productId: number,
    updateProduct: UpdateProductDto,
  ): Promise<UpdateResult> {
    return await this.productRepository.update(productId, updateProduct);
  }

  async deleteProduct(productId: number): Promise<void> {
    await this.productRepository.delete(productId);
  }
}
