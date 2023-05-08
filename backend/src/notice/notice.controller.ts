import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto, NoticeRequestDto, NoticeResponseDto, UpdateNoticeDto } from '../dtos/notice.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Roles } from 'src/employees/auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import User from 'src/employees/decorators/employees.decorator';
import { JWTPayload } from 'src/dtos/auth.dto';


@Controller('notice')
@Serialize(NoticeResponseDto)
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) { }

  @Roles(Role.HR, Role.SUPERADMIN)
  @Post()
  create(@Body() createNoticeDto: NoticeRequestDto, @User() user: JWTPayload) {
    if (!user) throw new HttpException('You are not authenticated', 400)
    const requestData: CreateNoticeDto = { ...createNoticeDto, issuer_id: user.id }
    return this.noticeService.create(requestData);
  }

  @Roles(Role.SUPERADMIN)
  @Get('/superadmin')
  viewAllBySuperadmin() {
    return this.noticeService.viewAllBySuperadmin()
  }

  @Roles(Role.HR)
  @Get('/:status')
  findAll(@Param('status') status: string, @User() user: JWTPayload) {
    if (!user) throw new HttpException('You are not authenticated', 400)
    const statusPattern = /^(active|inactive)$/
    if (!statusPattern.test(status)) throw new HttpException('URL not valid', 400)
    return this.noticeService.findAll(user.id, status);
  }



  @Roles(Role.HR, Role.SUPERADMIN)
  @Get(':id')
  findOne(@Param('id') id: string, @User() user: JWTPayload) {
    if (!user) throw new HttpException('You are not authenticated', 400)
    return this.noticeService.findOne(id, user.id);
  }

  @Roles(Role.HR, Role.SUPERADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto, @User() user: JWTPayload) {
    if (!user) throw new HttpException('You are not authenticated', 400)
    return this.noticeService.update(id, updateNoticeDto, user.id);
  }

  @Roles(Role.HR, Role.SUPERADMIN)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: JWTPayload) {
    if (!user) throw new HttpException('You are not authenticated', 400)
    return this.noticeService.remove(id, user.id);
  }

  @Roles(Role.SUPERADMIN)
  @Patch('publish/:id')
  publishNotice(@Param('id') id: string, @User() user: JWTPayload) {
    if (!user) throw new HttpException('You are not authorized', 400)
    return this.noticeService.publishNotice(id)
  }
}
