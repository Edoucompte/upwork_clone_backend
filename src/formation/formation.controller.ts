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
import { FormationService } from './formation.service';
import { ResponseJson } from 'src/dto/response-json';
import { Formation } from 'generated/prisma';
import { CreateFormationDto } from 'src/dto/formation/create-formation.dto';
import { UpdateFormationDto } from 'src/dto/formation/update-formation.dto';

@ApiTags('Formations')
//@ApiBearerAuth()
@Controller('formation')
export class FormationController {
  constructor(private readonly formationService: FormationService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des formations' })
  @ApiResponse({
    status: 200,
    description: 'Liste des formations',
  })
  async findAll(): Promise<ResponseJson> {
    try {
      const formations: Formation[] = await this.formationService.findAll();

      return {
        code: 200,
        error: false,
        message: 'Liste des utilisateurs',
        data: formations,
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
  @ApiOperation({ summary: 'Trouver une formation' })
  @ApiResponse({
    status: 200,
    description: 'Formation trouve',
  })
  async findBykey(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseJson> {
    try {
      //const userId = parseInt(id, 10);
      const formation: Formation | null =
        await this.formationService.findByKey(id);

      return {
        code: 200,
        error: false,
        message: 'formation trouvé',
        data: formation,
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
  @ApiOperation({ summary: 'Créer une formation' })
  @ApiResponse({
    status: 200,
    description: 'Etat de creation formation ',
  })
  async create(@Body() data: CreateFormationDto): Promise<ResponseJson> {
    try {
      const formation = await this.formationService.create(data);

      return {
        code: 201,
        error: false,
        message: 'Formation créée avec succes',
        data: formation,
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
  @ApiOperation({ summary: 'Modifier une Formation' })
  @ApiResponse({
    status: 200,
    description: 'Etat de modification de la Formation',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,

    @Body()
    data: UpdateFormationDto,
  ): Promise<ResponseJson> {
    try {
      const response = await this.formationService.update(id, data);

      return {
        code: 200,
        error: false,
        message: 'Formation modifiee avec succes',
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
  @ApiOperation({ summary: 'Supprimer une Formation' })
  @ApiResponse({
    status: 200,
    description: 'Etat de suppression de la Formation',
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseJson> {
    try {
      await this.formationService.delete(id);

      return {
        code: 200,
        error: false,
        message: 'Formation supprimé avec succès',
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
