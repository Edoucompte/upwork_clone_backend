import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { User } from 'generated/prisma';
import { LoginUserDto } from '../dtoclass';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

//controllers liste des utilisateurs
  @Get()
  @ApiOperation({ summary: 'Liste des utilisateurs' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
//controllers recuperer un itulisateur pas son id,
  @Get('/:id')
  @ApiOperation({ summary: 'Trouver un utilisateur' })
  async findBykey(@Param('id') id: string): Promise<User> {
    const userId = parseInt(id, 10);
    return this.userService.findBykey(userId);
  }
//controllers  enregistrement d'un utilisateur
  @Post('create')
  @ApiOperation({ summary: 'Créer un utilisateur' })
  async create(@Body(new ValidationPipe()) data: { prenom: string; nom: string; email: string; password: string; pays: string }): Promise<User> {
    return this.userService.create(data);
  }
//controllers modification d'un utilisateur
  @Put(':id')
  @ApiOperation({ summary: 'Modifier un utilisateur' })
  async update(
    @Param('id') id: string,
    
    @Body() data: { prenom: string; nom: string; email: string; password: string; pays: string },
  ): Promise<User> {
    const userId = parseInt(id, 10);
    return this.userService.update(userId, data);
  }
//controllers  suppression d'un utilisateur
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  async delete(@Param('id') id: string): Promise<any> {
    const userId = parseInt(id, 10);
    return this.userService.delete(userId);
  }
//controllers connexion d'un utilisateur
  @Post('login')
@ApiOperation({ summary: 'Connexion utilisateur' })
async login(@Body(new ValidationPipe()) data: LoginUserDto): Promise<any> {
  return this.userService.login(data);
}


}
