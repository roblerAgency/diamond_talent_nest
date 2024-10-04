import { Injectable } from '@nestjs/common';

// Commons
import { ErrorManager, reqUser, seleccionUserEmail } from 'src/commons';

// Dto
import { UserSelectionDto } from './dto';

// Services
import { UsersService } from '../users/users.service';

// Entities
import { User } from '../users/entities/user.entity';

@Injectable()
export class SendEmailsService {
  constructor(private userService: UsersService) {}

  async getEmailUserSeleccion({
    body,
    user,
  }: {
    body: UserSelectionDto;
    user: reqUser;
  }) {
		try {
			const userFound: User = await this.userService.getUserId({ id: user.sub })
			seleccionUserEmail({ data: body, user: userFound })
			return 'Mail sent successfully'
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
	}
}
