import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { LangueService } from './langue.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseJson } from 'src/dto/response-json';
import { CreateLangueDto } from 'src/dto/langue/create-langue.dto';
import { UpdateLangueDto } from 'src/dto/langue/update-langue.dto';
@ApiTags('Langues')
@Controller('langue')
export class LangueController {

    constructor(private readonly langueService: LangueService) {}
            
            //controllers liste des  langues
              @Get()
              @ApiOperation({ summary: 'Liste des langues' })
              @ApiResponse({
                status: 200,
                description: 'Liste des  langues',
              })
              async findAll(): Promise<ResponseJson> {
                try {
                  const langues = await this.langueService.findAll();
            
                  return {
                    code: 200,
                    error: false,
                    message: 'Liste des langues',
                    data: langues,
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
        
        
              
            
           
            //controllers recuperer une langue par son id,
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
                  const compte = await this.langueService.findBykey(id);
            
                  return {
                    code: 200,
                    error: false,
                    message: 'Langue trouvé',
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
            //controllers  creation d'une langue
              @Post('create')
              @ApiOperation({ summary: 'Créer une langue' })
              @ApiResponse({
                status: 200,
                description: 'Etat de creation  langue ',
              })
              async create(
              
                @Body() data: CreateLangueDto,
              ): Promise<ResponseJson> {
                try {
                  const compte = await this.langueService.create(data);
            
                  return {
                    code: 201,
                    error: false,
                    message: 'Langue créé avec succes',
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
            //controllers modification d'une langue
              @Put(':id')
              @ApiOperation({ summary: 'Modifier une langue' })
              @ApiResponse({
                status: 200,
                description: "Etat de modification d'une langue",
              })
              async update(
                @Param('id', ParseIntPipe) id: number,
            
                @Body(new ValidationPipe())
                data: UpdateLangueDto,
                
              ): Promise<ResponseJson> {
                try {
                  const response = await this.langueService.update(id,data);
            
                  return {
                    code: 200,
                    error: false,
                    message: 'Langue modifie avec succes',
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
              @ApiOperation({ summary: 'Supprimer une langue' })
              @ApiResponse({
                status: 200,
                description: "Etat de suppression de la langue",
              })
              async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseJson> {
                try {
                  await this.langueService.delete(id);
            
                  return {
                    code: 200,
                    error: false,
                    message: 'langue supprimé avec succès',
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
