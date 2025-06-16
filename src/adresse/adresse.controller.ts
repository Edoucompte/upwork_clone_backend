import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, ValidationPipe } from '@nestjs/common';
import { AdresseService } from './adresse.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseJson } from 'src/dto/response-json';
import { CreateAdresseDto } from 'src/dto/adresse/create-adresse.dto';
import { UpdateAdresseDto } from 'src/dto/adresse/update-adresse.dto';
@ApiTags('Adresses')
@Controller('adresse')
export class AdresseController {


     constructor(private readonly adresseService: AdresseService) {}
        
        //controllers liste des  Adresses 
          @Get()
          @ApiOperation({ summary: 'Liste des adresses' })
          @ApiResponse({
            status: 200,
            description: 'Liste des  adresses',
          })
          async findAll(): Promise<ResponseJson> {
            try {
              const comptes = await this.adresseService.findAll();
        
              return {
                code: 200,
                error: false,
                message: 'Liste des adresses',
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
    
    
          
        
       
        //controllers recuperer un adresse par son id,
          @Get('/:id')
          @ApiOperation({ summary: 'Trouver un  adresse' })
          @ApiResponse({
            status: 200,
            description: 'Adresse trouve',
          })
          async findBykey(
            @Param('id', ParseIntPipe) id: number,
          ): Promise<ResponseJson> {
            try {
              //const userId = parseInt(id, 10);
              const compte = await this.adresseService.findBykey(id);
        
              return {
                code: 200,
                error: false,
                message: 'Adresse trouvé',
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
          @ApiOperation({ summary: 'Créer un Adresse' })
          @ApiResponse({
            status: 200,
            description: 'Etat de creation  Adresse ',
          })
          async create(
          
            @Body() data: CreateAdresseDto,
          ): Promise<ResponseJson> {
            try {
              const compte = await this.adresseService.create(data);
        
              return {
                code: 201,
                error: false,
                message: 'Adresse créé avec succes',
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
          @ApiOperation({ summary: 'Modifier un adresse' })
          @ApiResponse({
            status: 200,
            description: "Etat de modification d'adresse",
          })
          async update(
            @Param('id', ParseIntPipe) id: number,
        
            @Body(new ValidationPipe())
            data: UpdateAdresseDto,
            
          ): Promise<ResponseJson> {
            try {
              const response = await this.adresseService.update(id,data);
        
              return {
                code: 200,
                error: false,
                message: 'Adresse modifie avec succes',
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
          @ApiOperation({ summary: 'Supprimer un adresse' })
          @ApiResponse({
            status: 200,
            description: "Etat de suppression de l'adresse",
          })
          async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseJson> {
            try {
              await this.adresseService.delete(id);
        
              return {
                code: 200,
                error: false,
                message: 'adresse supprimé avec succès',
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
