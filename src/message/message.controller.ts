import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Delete, 
  Param 
} from '@nestjs/common';

import { MessageService } from './message.service';
import { CreateMessageDto } from './dtos/create-message.dto';
import { ReturnMessageDto } from './dtos/return-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(
    @Body() createMessageDto: CreateMessageDto
  ): Promise<CreateMessageDto> {
    return this.messageService.create(createMessageDto);
  };

  @Get()
  findAll(): Promise<ReturnMessageDto[]> {
    return this.messageService.findAll();
  };

  @Delete(':id')
  async deleteMessage(
    @Param('id') id: number
  ): Promise<void> {
    return this.messageService.deleteMessage(id);
  };
};