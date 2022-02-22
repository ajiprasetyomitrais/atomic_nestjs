import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Request,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // add new product
  @Post()
  addProduct(@Body() createProductDto: CreateProductDto) {
    const newProduct = this.productService.insertProduct(createProductDto);
    return newProduct;
  }

  // gett all products
  @Get()
  getAllProducts() {
    return this.productService.getProducts();
  }

  //get product by id
  @Get(':id')
  getProduct(@Param('id') prodId: number) {
    return this.productService.getSingleProduct(prodId);
  }

  //update product by id
  @Patch(':id')
  updateProduct(
    @Param('id') prodId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(prodId, updateProductDto);
  }

  //delete product
  @Delete()
  deleteProduct(@Request() req): Promise<void> {
    return this.productService.deleteProduct(req.body.id);
  }
}
