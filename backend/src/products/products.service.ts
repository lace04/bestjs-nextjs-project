import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      this.handlePrismaError(error, 'create');
    }
  }

  async findAll() {
    return await this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    const productFound = await this.prismaService.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!productFound) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return productFound;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    try {
      return await this.prismaService.product.update({
        where: {
          id: id,
        },
        data: updateProductDto,
      });
    } catch (error) {
      this.handlePrismaError(error, 'update', id);
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      return await this.prismaService.product.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      this.handlePrismaError(error, 'delete', id);
    }
  }

  // Método privado para manejar errores de Prisma
  private handlePrismaError(error: any, operation: string, id?: number) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException('Product with the same name already exists');
      }
      if (error.code === 'P2025') {
        throw new NotFoundException(`Product with ID ${id} not found during ${operation}`);
      }
    }
    throw error;
  }
}
