import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
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
import { Users } from 'generated/prisma';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { ResponseJson } from 'src/dto/response-json';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { OutputUser } from 'src/dto/user/output-user.dto';

@ApiTags('Utilisateurs')
//@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des utilisateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs',
  })
  async findAll(): Promise<ResponseJson> {
    try {
      const users: OutputUser[] = await this.userService.findAll();

      return {
        code: 200,
        error: false,
        message: 'Liste des utilisateurs',
        data: users,
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

  @Get('/:id')
  @ApiOperation({ summary: 'Trouver un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur trouve',
  })
  async findBykey(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseJson> {
    try {
      //const userId = parseInt(id, 10);
      const user: OutputUser | null = await this.userService.findBykey(id);

      return {
        code: 200,
        error: false,
        message: 'Utilisateur trouvé',
        data: user,
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
  @ApiOperation({ summary: 'Créer un utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Etat de creation Utilisateur ',
  })
  async create(
    /*@Body(new ValidationPipe())
    data: {
      prenom: string;
      nom: string;
      email: string;
      password: string;
      pays: string;
    },*/
    @Body() data: CreateUserDto,
  ): Promise<ResponseJson> {
    try {
      const user = await this.userService.create(data);

      return {
        code: 201,
        error: false,
        message: 'Utilisateur créé avec succes',
        data: user,
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
  @ApiOperation({ summary: 'Modifier un utilisateur' })
  @ApiResponse({
    status: 200,
    description: "Etat de modification de l'utlisateur",
  })
  async update(
    @Param('id', ParseIntPipe) id: number,

    @Body(new ValidationPipe())
    data: UpdateUserDto,
    /*data: {
      prenom: string;
      nom: string;
      email: string;
      //password: string; //pas le mot de passe directement
      pays: string;
    }*/
  ): Promise<ResponseJson> {
    try {
      const response = await this.userService.update(id, data);

      return {
        code: 200,
        error: false,
        message: 'Utilisateur modifie avec succes',
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
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  @ApiResponse({
    status: 200,
    description: "Etat de suppression de l'utlisateur",
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseJson> {
    try {
      await this.userService.delete(id);

      return {
        code: 200,
        error: false,
        message: 'Utilisateur supprimé avec succès',
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
