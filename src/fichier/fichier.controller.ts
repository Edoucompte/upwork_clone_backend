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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseJson } from 'src/dto/response-json';
import { CreateFormationDto } from 'src/dto/formation/create-formation.dto';
import { UpdateFormationDto } from 'src/dto/formation/update-formation.dto';
import { ApiTags } from '@nestjs/swagger';
import { FichierService } from './fichier.service';
import { CreateFichierDto } from 'src/dto/fichier/create-fichier.dto';
import { UpdateFichierDto } from 'src/dto/fichier/update-fichier.dto';

@ApiTags('Fichiers')
@Controller('fichier')
export class FichierController {
  constructor(private readonly fichierService: FichierService) {}

  //controllers liste des fichiers
  @Get()
  @ApiOperation({ summary: 'Liste des Fichiers' })
  @ApiResponse({
    status: 200,
    description: 'Liste des fichiers',
  })
  async findAll(): Promise<ResponseJson> {
    try {
      const fichiers = await this.fichierService.findAll();

      return {
        code: 200,
        error: false,
        message: 'Liste des fichiers',
        data: fichiers,
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

  //controllers recuperer un fichier par son id,
  @Get('/:id')
  @ApiOperation({ summary: 'Trouver un fichier' })
  @ApiResponse({
    status: 200,
    description: 'fichier trouve',
  })
  async findBykey(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseJson> {
    try {
      const fichier = await this.fichierService.findBykey(id);

      return {
        code: 200,
        error: false,
        message: 'formation trouvé',
        data: fichier,
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
  //controllers  creation d'un fichier
  @Post('create')
  @ApiOperation({ summary: 'Créer un fichier' })
  @ApiResponse({
    status: 200,
    description: 'Etat de creation fichier',
  })
  async create(@Body() data: CreateFichierDto): Promise<ResponseJson> {
    try {
      const formation = await this.fichierService.create(data);

      return {
        code: 201,
        error: false,
        message: 'fichier créé avec succes',
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
  //controllers modification d'un fichier
  @Put(':id')
  @ApiOperation({ summary: 'Modifier un fichier' })
  @ApiResponse({
    status: 200,
    description: "Etat de modification d'un fichier",
  })
  async update(
    @Param('id', ParseIntPipe) id: number,

    @Body(new ValidationPipe())
    data: UpdateFichierDto,
  ): Promise<ResponseJson> {
    try {
      const response = await this.fichierService.update(id, data);

      return {
        code: 200,
        error: false,
        message: 'fichier modifie avec succes',
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
  //controllers  suppression d'un fichier
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un fichiers' })
  @ApiResponse({
    status: 200,
    description: 'Etat de suppression du fichier',
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseJson> {
    try {
      await this.fichierService.delete(id);

      return {
        code: 200,
        error: false,
        message: 'fichier supprimé avec succès',
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
