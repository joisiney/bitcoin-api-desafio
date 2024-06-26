import { type IOptional } from '@olympus/lib-hera'
import { IUserDto } from '../dto/user.dto'

export class UserEntity {
  protected data: IUserDto
  constructor(_data: IOptional<IUserDto, 'id' | 'createdAt' | 'updatedAt'>) {
    this.data = {
      ..._data,
      createdAt: _data.createdAt || new Date(),
    } as IUserDto
  }

  get id() {
    return this.data.id
  }
  get password() {
    return this.data.password
  }

  get db() {
    return this.data
  }

  toJSON() {
    const { password, ...data } = this.data
    return data
  }
}
