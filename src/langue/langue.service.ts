import { Injectable, NotFoundException } from '@nestjs/common';
import { Langue } from 'generated/prisma';
import { CreateLangueDto } from 'src/dto/langue/create-langue.dto';
import { UpdateLangueDto } from 'src/dto/langue/update-langue.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LangueService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Langue[]> {
    return await this.prisma.langue.findMany();
  }

  async findByKey(id: number): Promise<Langue | null> {
    return await this.prisma.langue.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateLangueDto): Promise<Langue> {
    //const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.langue.create({
      data: data,
    });
  }

  async update(id: number, data: UpdateLangueDto): Promise<Langue> {
    const existing = await this.prisma.langue.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Langue avec l'id ${id} non trouvée`);
    }
    const { nom, niveau, compte_id } = data;

    // verifiez si parametre non vide et valide
    const updatedData = {};
    if (nom && nom.length > 2) {
      updatedData['nom'] = nom;
    }

    if (niveau && niveau.length > 2) {
      updatedData['niveau'] = niveau;
    }

    // chercher le compte ici pour verifier
    //const compte = await
    if (compte_id && true) {
      updatedData['compte_id'] = compte_id;
    }

    return this.prisma.langue.update({
      where: { id },
      data: updatedData,
    });
  }

  async delete(id: number): Promise<any> {
    const existing = await this.prisma.langue.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Langue avec l'id ${id} non trouvée`);
    }

    await this.prisma.langue.delete({
      where: { id },
    });

    return;
  }
}
