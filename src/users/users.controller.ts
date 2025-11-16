// ...existing code...
import { Body, Controller, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  findAll() {
    return this.usersService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('Controller recebeu:', createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  async replace(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    console.log('Substituindo ID:', id);
    console.log('Body recebido:', updateUserDto);
    return this.usersService.updateUser(+id, updateUserDto);
  }
}
// ...existing code...
