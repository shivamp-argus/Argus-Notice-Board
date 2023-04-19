import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { CreateNoticeDto, UpdateNoticeDto } from '../dtos/create-notice.dto';


@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) { }

  @Post(':id')
  create(@Body() createNoticeDto: CreateNoticeDto, @Param() id: string) {
    return this.noticeService.create(createNoticeDto, id);
  }

  @Get()
  findAll() {
    return this.noticeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticeDto: UpdateNoticeDto) {
    return this.noticeService.update(id, updateNoticeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticeService.remove(id);
  }
}
