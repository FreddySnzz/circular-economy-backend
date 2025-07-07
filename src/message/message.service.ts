import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Repository } from 'typeorm';

import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dtos/create-message.dto';
import { ReturnMessageDto } from './dtos/return-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
    private mailerService: MailerService,
  ) {}

  async create(
    data: CreateMessageDto
  ): Promise<CreateMessageDto> {
    const message = this.messageRepository.create(data);
    await this.messageRepository.save(message);

    await this.mailerService.sendMail({
      to: data.email,
      subject: 'Economia Circular - Confirmação de Mensagem',
      html: `
      <!DOCTYPE html>
      <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <title>Economia Circular - Confirmação de Mensagem</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0fdf4;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }
            h1 {
              color: #166534;
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              font-size: 16px;
              line-height: 1.5;
            }
            .footer {
              margin-top: 30px;
              font-size: 12px;
              color: #666;
              text-align: center;
            }
            .highlight {
              background-color: #dcfce7;
              padding: 10px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .logo {
              display: block;
              margin: 0 auto 20px;
              width: 100px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img
              src="https://cdn-icons-png.flaticon.com/128/8656/8656531.png"
              alt="Economia Circular"
              class="logo"
            />

            <h1>Obrigado pela sua mensagem!</h1>

            <p>Olá <strong>${message.name}</strong>,</p>

            <p>
              Recebemos sua mensagem e ficamos muito felizes pelo seu interesse em contribuir
              para a Economia Circular. Aqui está o conteúdo que você enviou:
            </p>

            <div class="highlight">
              <p><strong>Mensagem:</strong></p>
              <p>${message.message}</p>
            </div>

            <p>
              Em breve entraremos em contato se necessário. Obrigado por participar de
              um futuro mais sustentável!
            </p>

            <div class="footer">
              &copy; 2025 Economia Circular | Este é um e-mail automático.
            </div>
          </div>
        </body>
      </html>`,
    });

    return message;
  };

  async deleteMessage(
    id: number
  ): Promise<void> {
    const message = await this.messageRepository.findOneBy({ id });

    if (!message) {
      throw new NotFoundException('Message not found');
    };

    await this.messageRepository.delete(id);
  };

  findAll(): Promise<ReturnMessageDto[]> {
    return this.messageRepository.find({ order: { createdAt: 'DESC' } });
  };
};
