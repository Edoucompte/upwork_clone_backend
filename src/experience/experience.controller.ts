import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from '../dto/experience/create-experience.dto';
import { UpdateExperienceDto } from '../dto/experience/update-experience.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Expériences') // Nom du groupe Swagger
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle expérience' })
  @ApiResponse({ status: 201, description: 'Expérience créée avec succès.' })
  create(@Body() dto: CreateExperienceDto) {
    return this.experienceService.create(dto);
  }

  @Get('compte/:compte_id')
  @ApiOperation({ summary: 'Lister les expériences d’un compte' })
  @ApiResponse({ status: 200, description: 'Liste des expériences pour un compte' })
  findAllByCompte(@Param('compte_id') compte_id: string) {
    return this.experienceService.findAllByCompte(Number(compte_id));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une expérience par ID' })
  @ApiResponse({ status: 200, description: 'Détails d’une expérience' })
  findOne(@Param('id') id: string) {
    return this.experienceService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une expérience' })
  @ApiResponse({ status: 200, description: 'Expérience mise à jour' })
  update(@Param('id') id: string, @Body() dto: UpdateExperienceDto) {
    return this.experienceService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une expérience' })
  @ApiResponse({ status: 200, description: 'Expérience supprimée' })
  remove(@Param('id') id: string) {
    return this.experienceService.remove(+id);
  }
}

