import { Body, Controller, Post, Req } from '@nestjs/common';

// Services
import { SendEmailsService } from './sendEmails.service';

// Commons
import { reqUser } from 'src/commons';

// Dtos
import { UserSelectionDto } from './dto';

@Controller('sendEmails')
export class SendEmailsController {
    constructor(private readonly sendEmailsServices: SendEmailsService) {}

    @Post()
    getEmailUserSeleccion(@Body() body: UserSelectionDto, @Req() requestUser) {
        const user: reqUser = requestUser;
        this.sendEmailsServices.getEmailUserSeleccion({ body, user })
    }
}
