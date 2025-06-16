import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { FormationService } from './formation.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseJson } from 'src/dto/response-json';
import { CreateFormationDto } from 'src/dto/formation/create-formation.dto';
import { UpdateFormationDto } from 'src/dto/formation/update-formation.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Formations')
@Controller('formation')
export class FormationController {

     constructor(private readonly formationService: FormationService) {}
                
                //controllers liste des  formation
                  @Get()
                  @ApiOperation({ summary: 'Liste des Formations' })
                  @ApiResponse({
                    status: 200,
                    description: 'Liste des  formations',
                  })
                  async findAll(): Promise<ResponseJson> {
                    try {
                      const formations = await this.formationService.findAll();
                
                      return {
                        code: 200,
                        error: false,
                        message: 'Liste des formations',
                        data: formations,
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
            
            
                  
                
               
                //controllers recuperer une formation par son id,
                  @Get('/:id')
                  @ApiOperation({ summary: 'Trouver une formation' })
                  @ApiResponse({
                    status: 200,
                    description: 'formation trouve',
                  })
                  async findBykey(
                    @Param('id', ParseIntPipe) id: number,
                  ): Promise<ResponseJson> {
                    try {
                      //const userId = parseInt(id, 10);
                      const formation= await this.formationService.findBykey(id);
                
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
                //controllers  creation d'une formation
                  @Post('create')
                  @ApiOperation({ summary: 'Créer une formation' })
                  @ApiResponse({
                    status: 200,
                    description: 'Etat de creation  formation ',
                  })
                  async create(
                  
                    @Body() data: CreateFormationDto,
                  ): Promise<ResponseJson> {
                    try {
                      const formation= await this.formationService.create(data);
                
                      return {
                        code: 201,
                        error: false,
                        message: 'Langue créé avec succes',
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
                //controllers modification d'une formation
                  @Put(':id')
                  @ApiOperation({ summary: 'Modifier une formation' })
                  @ApiResponse({
                    status: 200,
                    description: "Etat de modification d'une formation",
                  })
                  async update(
                    @Param('id', ParseIntPipe) id: number,
                
                    @Body(new ValidationPipe())
                    data: UpdateFormationDto,
                    
                  ): Promise<ResponseJson> {
                    try {
                      const response = await this.formationService.update(id,data);
                
                      return {
                        code: 200,
                        error: false,
                        message: 'formation modifie avec succes',
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
                //controllers  suppression d'une formation
                  @Delete(':id')
                  @ApiOperation({ summary: 'Supprimer une formation' })
                  @ApiResponse({
                    status: 200,
                    description: "Etat de suppression de la formation",
                  })
                  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseJson> {
                    try {
                      await this.formationService.delete(id);
                
                      return {
                        code: 200,
                        error: false,
                        message: 'formation supprimé avec succès',
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
