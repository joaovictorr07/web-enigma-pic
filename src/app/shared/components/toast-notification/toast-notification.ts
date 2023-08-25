import { MessageTypeEnum } from './enum/alert-type.enum';

export class ToastNotificationModel {
  constructor(
    public readonly alertType: MessageTypeEnum,
    public readonly message: string
  ) {}
}
