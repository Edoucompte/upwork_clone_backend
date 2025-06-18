import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseJson } from 'src/dto/response-json';
import { CreateLangueDto } from 'src/dto/langue/create-langue.dto';
import { UpdateLangueDto } from 'src/dto/langue/update-langue.dto';
import { PortfolioService } from './portfolio.service';
@ApiTags('Portfolio')
@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  //controllers liste des Portfolios
  @Get()
  @ApiOperation({ summary: 'Liste des Portfolios' })
  @ApiResponse({
    status: 200,
    description: 'Liste des Portfolios',
  })
  async findAll(): Promise<ResponseJson> {
    try {
      const portfolios = await this.portfolioService.findAll();

      return {
        code: 200,
        error: false,
        message: 'Liste des portfolios',
        data: portfolios,
      };
    } catch (err) {
      return {
        code: 400,
        error: true,
        message: err.message,
        data: null,
      };
    }
  }

  //controllers recuperer un portfolio par son id,
  @Get('/:id')
  @ApiOperation({ summary: 'Trouver un portfolio' })
  @ApiResponse({
    status: 200,
    description: 'Portfolio trouve',
  })
  async findBykey(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseJson> {
    try {
      //const userId = parseInt(id, 10);
      const portfolio = await this.portfolioService.findBykey(id);

      return {
        code: 200,
        error: false,
        message: 'Portfolio trouvé',
        data: portfolio,
      };
    } catch (err) {
      return {
        code: err.status | 400,
        error: true,
        message: err.message,
        data: null,
      };
    }
  }
  //controllers  creation d'une portfolio
  @Post('create')
  @ApiOperation({ summary: 'Créer une portfolio' })
  @ApiResponse({
    status: 200,
    description: 'Etat de creation portfolio ',
  })
  async create(@Body() data: CreateLangueDto): Promise<ResponseJson> {
    try {
      const portfolio = await this.portfolioService.create(data);

      return {
        code: 201,
        error: false,
        message: 'portfolio créé avec succes',
        data: portfolio,
      };
    } catch (err) {
      return {
        code: err.status | 400,
        error: true,
        message: err.message,
        data: null,
      };
    }
  }
  //controllers modification d'un portfolio
  @Put(':id')
  @ApiOperation({ summary: 'Modifier un portfolio' })
  @ApiResponse({
    status: 200,
    description: "Etat de modification d'un portfolio",
  })
  async update(
    @Param('id', ParseIntPipe) id: number,

    @Body(new ValidationPipe())
    data: UpdateLangueDto,
  ): Promise<ResponseJson> {
    try {
      const response = await this.portfolioService.update(id, data);

      return {
        code: 200,
        error: false,
        message: 'portfolio modifie avec succes',
        data: response,
      };
    } catch (err) {
      return {
        code: err.status | 400,
        error: true,
        message: err.message,
        data: null,
      };
    }
  }
  //controllers  suppression d'un portfolio
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un portfolio' })
  @ApiResponse({
    status: 200,
    description: 'Etat de suppression du portfolio',
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseJson> {
    try {
      await this.portfolioService.delete(id);

      return {
        code: 200,
        error: false,
        message: 'portfolio supprimé avec succès',
        data: null,
      };
    } catch (err) {
      return {
        code: err.status | 400,
        error: true,
        message: err.message,
        data: null,
      };
    }
  }
}
