import {
  Controller,
  Post,
  Res,
  HttpStatus,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
  Put,
  Query
} from "@nestjs/common";
import { ProductService } from "./product.service";

import { CreateProductDTO } from "./dto/product.dto";

@Controller("product")
export class ProductController {
  constructor(private productService: ProductService) {}

  // Add Product: /product/create
  @Post("/create")
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: "Product Successfully Created",
      product
    });
  }

  // Get Products /product
  // @Get('/list')
  @Get("/")
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json(products);
  }
  @Get("/:productID")
  async getProduct(@Res() res, @Param("productID") productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException("Product does not exist!");
    return res.status(HttpStatus.OK).json(product);
  }

  // Delete Product: /delete?productID=2basj32iu32bkjskqwa
  @Delete("/:productID")
  async deleteProduct(@Res() res, @Param("productID") productID) {
    const productDeleted = await this.productService.deleteProduct(productID);
    if (!productDeleted) throw new NotFoundException("Product does not exist!");
    return res.status(HttpStatus.OK).json({
      message: "Product Deleted Successfully",
      productDeleted
    });
  }
  // Update Product: /update?productID=5asq32jdaiq3732897
  @Put('/update')
  async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID) {
      const updatedProduct = await this.productService.updateProduct(productID, createProductDTO);
      if (!updatedProduct) throw new NotFoundException('Product does not exist!');
      return res.status(HttpStatus.OK).json({
          message: 'Product Updated Successfully',
          updatedProduct 
      });
  }

}
