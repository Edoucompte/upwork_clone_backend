import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseJson } from 'src/dto/response-json';
import { CompetenceService } from './competence.service';
import { UpdateCompetenceDto } from 'src/dto/competence/update-competence.dto';
import { CreateCompetenceDto } from 'src/dto/competence/create-competence.dto';
import { CreateCompetencesDto } from 'src/dto/competence/create-competences.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/jwt.strategy';
@ApiTags('Competences')
@Controller('competence')
export class CompetenceController {
  constructor(private readonly competenceService: CompetenceService) {}

  //controllers liste des  Competences
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Liste des Competences' })
  @ApiResponse({
    status: 200,
    description: 'Liste des  competences',
  })
  async findAll(): Promise<ResponseJson> {
    try {
      const competences = await this.competenceService.findAll();

      return {
        code: 200,
        error: false,
        message: 'Liste des formations',
        data: competences,
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

  //controllers recuperer une competence par son id,
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Trouver une competence' })
  @ApiResponse({
    status: 200,
    description: 'competence trouve',
  })
  async findBykey(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseJson> {
    try {
      //const userId = parseInt(id, 10);
      const competence = await this.competenceService.findBykey(id);

      return {
        code: 200,
        error: false,
        message: 'competence trouvé',
        data: competence,
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

  //controllers  creation d'une competence
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Créer une competence' })
  @ApiResponse({
    status: 200,
    description: 'Etat de creation  competence ',
  })
  async create(@Body() data: CreateCompetenceDto): Promise<ResponseJson> {
    try {
      const competence = await this.competenceService.create(data);

      return {
        code: 201,
        error: false,
        message: 'competence créée avec succes',
        data: competence,
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

  //controllers  creation d'une competence
  @Post('createAll')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Créer plusieurs competences' })
  @ApiResponse({
    status: 200,
    description: 'Etat de creation de competences ',
  })
  async createAll(
    @Req() request: RequestWithUser,
    @Body() data: CreateCompetencesDto,
  ): Promise<ResponseJson> {
    try {
      const competences = await this.competenceService.createAll(data, request);

      return {
        code: 201,
        error: false,
        message: 'competences créées avec succes',
        data: competences,
      };
    } catch (err) {
      console.log(err);
      return {
        code: err.status | 400,
        error: true,
        message: err.message,
        data: null,
      };
    }
  }

  //controllers modification d'une competence
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Modifier une competence' })
  @ApiResponse({
    status: 200,
    description: "Etat de modification d'une competence",
  })
  async update(
    @Param('id', ParseIntPipe) id: number,

    @Body(new ValidationPipe())
    data: UpdateCompetenceDto,
  ): Promise<ResponseJson> {
    try {
      const response = await this.competenceService.update(id, data);

      return {
        code: 200,
        error: false,
        message: 'competence modifie avec succes',
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
  //controllers  suppression d'une competence
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Supprimer une competence' })
  @ApiResponse({
    status: 200,
    description: 'Etat de suppression de la competence',
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseJson> {
    try {
      await this.competenceService.delete(id);

      return {
        code: 200,
        error: false,
        message: 'competence supprimé avec succès',
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
