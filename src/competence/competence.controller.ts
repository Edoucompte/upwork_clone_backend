import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseJson } from 'src/dto/response-json';
import { CompetenceService } from './competence.service';
import { UpdateCompetenceDto } from 'src/dto/competence/update-competence.dto';
import { CreateCompetenceDto } from 'src/dto/competence/create-competence.dto';
@ApiTags('Competences')
@Controller('competence')
export class CompetenceController {

    constructor(private readonly competenceService: CompetenceService) {}
                    
                    //controllers liste des  Competences
                      @Get()
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
                          const competence= await this.competenceService.findBykey(id);
                    
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
                      @ApiOperation({ summary: 'Créer une competence' })
                      @ApiResponse({
                        status: 200,
                        description: 'Etat de creation  competence ',
                      })
                      async create(
                      
                        @Body() data: CreateCompetenceDto,
                      ): Promise<ResponseJson> {
                        try {
                          const competence= await this.competenceService.create(data);
                    
                          return {
                            code: 201,
                            error: false,
                            message: 'competence créé avec succes',
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
                    //controllers modification d'une competence
                      @Put(':id')
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
                          const response = await this.competenceService.update(id,data);
                    
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
                      @ApiOperation({ summary: 'Supprimer une competence' })
                      @ApiResponse({
                        status: 200,
                        description: "Etat de suppression de la competence",
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
