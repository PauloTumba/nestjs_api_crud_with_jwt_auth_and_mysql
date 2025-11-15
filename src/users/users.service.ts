import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  //      @Inject()
  //   private readonly prismaService: PrismaService;
  constructor(private readonly prisma: PrismaService) {}

  //   async createUser(data: CreateUserDto) {
  //     return console.log('service ' + data.name);
  // eslint-disable-next-line prettier/prettier
  //     return this.prisma.user.create({ data });
  //   }
  // users.service.ts

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser2(data: CreateUserDto) {
    console.log('service recebeuee:', data); // DEBUG
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
    return this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

 async createUser(data: CreateUserDto) {
  console.log('service recebeu:', data);

  // Verifica se já existe usuário com o mesmo username
  const existingUser = await this.prisma.user.findUnique({
    where: { username: data.username },
  });

  if (existingUser) {
    return {
      success: false,
      message: 'Username já cadastrado',
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await this.prisma.user.create({
    data: { ...data, password: hashedPassword },
  });

  return {
    success: true,
    message: 'Usuário criado com sucesso',
    user: {
      id: newUser.id,
      username: newUser.username,
      createdAt: newUser.createdAt,
    },
  };
}



  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    // return console.log('teste' + id);
    return this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }

  async findOne(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const updateData: any = { ...data };
    if (data.password) {
      const saltOrRounds = 10;
      updateData.password = await bcrypt.hash(data.password, saltOrRounds);
    }

    // return console.log('Atualizando usuário ID:', id, 'com dados:', updateData);
    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }
}
