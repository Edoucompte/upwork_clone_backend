import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { User } from 'generated/prisma';
import { LoginUserDto } from '../dtoclass';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des utilisateurs' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Trouver un utilisateur' })
  async findBykey(@Param('id') id: string): Promise<User> {
    const userId = parseInt(id, 10);
    return this.userService.findBykey(userId);
  }

  @Post('create')
  @ApiOperation({ summary: 'Créer un utilisateur' })
  async create(@Body(new ValidationPipe()) data: { prenom: string; nom: string; email: string; password: string; pays: string }): Promise<User> {
    return this.userService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifier un utilisateur' })
  async update(
    @Param('id') id: string,
    
    @Body() data: { prenom: string; nom: string; email: string; password: string; pays: string },
  ): Promise<User> {
    const userId = parseInt(id, 10);
    return this.userService.update(userId, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  async delete(@Param('id') id: string): Promise<any> {
    const userId = parseInt(id, 10);
    return this.userService.delete(userId);
  }

  @Post('login')
@ApiOperation({ summary: 'Connexion utilisateur' })
async login(@Body(new ValidationPipe()) data: LoginUserDto): Promise<any> {
  return this.userService.login(data);
}


}
