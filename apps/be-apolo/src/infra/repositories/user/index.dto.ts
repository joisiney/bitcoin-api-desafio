import { IUserDto, PaginationEntity, UserEntity } from '@olympus/domain-ceos'
import {
  Either,
  IOptional,
  IRequired,
  NotFoundException,
} from '@olympus/lib-hera'

export namespace IUserRepository {
  export interface InputFindAll {
    page: number
    take: number
  }
  export interface Implements {
    findAll(
      props: IUserRepository.InputFindAll,
    ): Promise<Either<PaginationEntity<UserEntity>, NotFoundException>>
    findById(id: string): Promise<Either<UserEntity, NotFoundException>>
    findByEmail(email: string): Promise<Either<UserEntity, NotFoundException>>
    create(
      props: Omit<IOptional<Omit<IUserDto, 'updatedAt'>, 'id'>, 'createdAt'>,
    ): Promise<Either<boolean, NotFoundException>>
    updateById(
      props: IRequired<Partial<Omit<IUserDto, 'password' | 'createdAt'>>, 'id'>,
    ): Promise<Either<UserEntity, NotFoundException>>
    deleteById(id: string): Promise<Either<boolean, NotFoundException>>
  }
}
