import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseJson } from 'src/dto/response-json';
import { Formation, Langue } from 'generated/prisma';
import { LangueService } from './langue.service';
import { CreateLangueDto } from 'src/dto/langue/create-langue.dto';
import { UpdateLangueDto } from 'src/dto/langue/update-langue.dto';

@ApiTags('Langues')
//@ApiBearerAuth()
@Controller('langue')
export class LangueController {
  constructor(private readonly langueService: LangueService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des Langues' })
  @ApiResponse({
    status: 200,
    description: 'Liste des Langues',
  })
  async findAll(): Promise<ResponseJson> {
    try {
      const langues: Langue[] = await this.langueService.findAll();

      return {
        code: 200,
        error: false,
        message: 'Liste des langues',
        data: langues,
      };
    } catch (err) {
      return {
        code: err.status,
        error: true,
        message: err.message,
        data: null,
      };
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Trouver une langue' })
  @ApiResponse({
    status: 200,
    description: 'Langue trouve',
  })
  async findBykey(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseJson> {
    try {
      //const userId = parseInt(id, 10);
      const langue: Formation | null = await this.langueService.findByKey(id);

      return {
        code: 200,
        error: false,
        message: 'langue trouvée',
        data: langue,
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

  @Post('create')
  @ApiOperation({ summary: 'Créer une langue' })
  @ApiResponse({
    status: 200,
    description: 'Etat de creation langue ',
  })
  async create(@Body() data: CreateLangueDto): Promise<ResponseJson> {
    try {
      const langue = await this.langueService.create(data);

      return {
        code: 201,
        error: false,
        message: 'Langue créée avec succes',
        data: langue,
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

  @Put(':id')
  @ApiOperation({ summary: 'Modifier une langue' })
  @ApiResponse({
    status: 200,
    description: 'Etat de modification de la langue',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,

    @Body()
    data: UpdateLangueDto,
  ): Promise<ResponseJson> {
    try {
      const response = await this.langueService.update(id, data);

      return {
        code: 200,
        error: false,
        message: 'Langue modifiee avec succes',
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

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une langue' })
  @ApiResponse({
    status: 200,
    description: 'Etat de suppression de la langue',
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseJson> {
    try {
      await this.langueService.delete(id);

      return {
        code: 200,
        error: false,
        message: 'Langue supprimée avec succès',
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
