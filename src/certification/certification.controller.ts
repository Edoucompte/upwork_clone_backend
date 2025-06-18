import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseJson } from 'src/dto/response-json';
import { CertificationService } from './certification.service';
import { CreateCertificationDto } from 'src/dto/certification/create-certification.dto';
import { UpdateCertificationDto } from 'src/dto/certification/update-certification.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUtils } from 'utils/fileUtils';

@Controller('certification')
export class CertificationController {
  constructor(private readonly certificationService: CertificationService) {}

  //controllers liste des certifications
  @Get()
  @ApiOperation({ summary: 'Liste des certifications' })
  @ApiResponse({
    status: 200,
    description: 'Liste des certifications',
  })
  async findAll(): Promise<ResponseJson> {
    try {
      const certifications = await this.certificationService.findAll();

      return {
        code: 200,
        error: false,
        message: 'Liste des certifications',
        data: certifications,
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

  //controllers recuperer une certification par son id,
  @Get('/:id')
  @ApiOperation({ summary: 'Trouver une certification' })
  @ApiResponse({
    status: 200,
    description: 'certification trouve',
  })
  async findBykey(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseJson> {
    try {
      //const userId = parseInt(id, 10);
      const certification = await this.certificationService.findBykey(id);

      return {
        code: 200,
        error: false,
        message: 'certification trouvé',
        data: certification,
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
  //controllers  creation d'une certification
  @Post('create')
  @ApiOperation({ summary: 'Créer une certification' })
  @ApiResponse({
    status: 200,
    description: 'Etat de creation certification ',
  })
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: './uploads', // Specify the destination folder
        filename: FileUtils.filenameCreate, // genere nom de fichier
      }),
      fileFilter: FileUtils.fileFilterMaker, // creer un filtre des fichier
      limits: {
        fileSize: 1024 * 1024 * 5, // Limit file size to 5MB (optional)
      },
    }),
  )
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: CreateCertificationDto,
  ): Promise<ResponseJson> {
    try {
      const certification = await this.certificationService.create(data, files);

      return {
        code: 201,
        error: false,
        message: 'Certification créé avec succes',
        data: certification,
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

  //controllers modification d'une certifications
  @Put(':id')
  @ApiOperation({ summary: 'Modifier une certification' })
  @ApiResponse({
    status: 200,
    description: "Etat de modification d'une certification",
  })
  async update(
    @Param('id', ParseIntPipe) id: number,

    @Body(new ValidationPipe())
    data: UpdateCertificationDto,
  ): Promise<ResponseJson> {
    try {
      const response = await this.certificationService.update(id, data);

      return {
        code: 200,
        error: false,
        message: 'certification modifie avec succes',
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
  //controllers  suppression d'une certification
  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une certification' })
  @ApiResponse({
    status: 200,
    description: 'Etat de suppression de la certification',
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<ResponseJson> {
    try {
      await this.certificationService.delete(id);

      return {
        code: 200,
        error: false,
        message: 'certification supprimée avec succès',
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
