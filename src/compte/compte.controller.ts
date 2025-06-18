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
import { CompteService } from './compte.service';
import { ResponseJson } from 'src/dto/response-json';
import { CreateCompteDto } from 'src/dto/compte/create-compte.dto';
import { UpdateCompteDto } from 'src/dto/compte/update-compte.dto';
import { Compte } from 'generated/prisma';

@ApiTags('Comptes')
//@ApiBearerAuth()

@Controller('compte')
export class CompteController {
  constructor(private readonly compteService: CompteService) {}

  //controllers liste des  comptes
  @Get()
  @ApiOperation({ summary: 'Liste des comptes' })
  @ApiResponse({
    status: 200,
    description: 'Liste des comptes',
  })
  async findAll(): Promise<ResponseJson> {
    try {
      const comptes = await this.compteService.findAll();

      return {
        code: 200,
        error: false,
        message: 'Liste des comptes',
        data: comptes,
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

  //controllers liste des  comptes  par role
  @Get('role/:role')
  @ApiOperation({ summary: 'Lister les comptes par rôle' })
  @ApiResponse({ status: 200, description: 'Comptes récupérés avec succès.' })
  @ApiResponse({
    status: 404,
    description: 'Aucun compte trouvé avec ce rôle.',
  })
  async findByRole(@Param('role') role: string): Promise<Compte[]> {
    return this.compteService.findByRole(role);
  }

  //controllers recuperer un compte par son id,
  @Get('/:id')
  @ApiOperation({ summary: 'Trouver un  comptes' })
  @ApiResponse({
    status: 200,
    description: 'Compte trouve',
  })
  async findBykey(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseJson> {
    try {
      //const userId = parseInt(id, 10);
      const compte = await this.compteService.findBykey(id);

      return {
        code: 200,
        error: false,
        message: 'Compte trouvé',
        data: compte,
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
  //controllers  creation d'un compte
  @Post('create')
  @ApiOperation({ summary: 'Créer un compte' })
  @ApiResponse({
    status: 200,
    description: 'Etat de creation compte ',
  })
  async create(@Body() data: CreateCompteDto): Promise<ResponseJson> {
    try {
      const compte = await this.compteService.create(data);

      return {
        code: 201,
        error: false,
        message: 'Utilisateur créé avec succes',
        data: compte,
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
  //controllers modification d'un compte
  @Put(':id')
  @ApiOperation({ summary: 'Modifier un Compte' })
  @ApiResponse({
    status: 200,
    description: 'Etat de modification du compte',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,

    @Body(new ValidationPipe())
    data: UpdateCompteDto,
  ): Promise<ResponseJson> {
    try {
      const response = await this.compteService.update(id, data);

      return {
        code: 200,
        error: false,
        message: 'Compte modifie avec succes',
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
  //controllers  suppression d'un utilisateur
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un compte' })
  @ApiResponse({
    status: 200,
    description: 'Etat de suppression du compte',
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseJson> {
    try {
      await this.compteService.delete(id);

      return {
        code: 200,
        error: false,
        message: 'Comptes supprimé avec succès',
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
