import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  HttpCode,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cats')
@ApiTags('cats')
@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  @Version('1')
  findAll() {
    return this.catsService.findAll();
  }

  @Get()
  @Version('2')
  @HttpCode(501)
  findAllV2() {}

  @Get(':id')
  @ApiResponse({ status: 404, description: 'Cat not found' })
  findOne(@Param('id') id: string) {
    const cat = this.catsService.findOne(id);

    if (!cat) {
      throw new NotFoundException('Cat not found');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(id);
  }
}
