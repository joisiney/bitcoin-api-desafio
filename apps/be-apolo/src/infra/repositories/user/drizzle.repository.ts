import { db } from '@/infra/database/drizzle/connection'
import { Injectable } from '@olympus/be-di-ilitia'
import { IUserDto, PaginationEntity, UserEntity } from '@olympus/domain-ceos'
import {
  Either,
  IOptional,
  IRequired,
  Left,
  NotFoundException,
  Right,
} from '@olympus/lib-hera'
import { count, eq } from 'drizzle-orm'
import { users, users as usersEntity } from '../../database/drizzle/schema'
import { IUserRepository } from './index.dto'

@Injectable({ name: 'USER_REPOSITORY' })
export class UserRepositoryTypeDrizzle implements IUserRepository.Implements {
  async findAll(
    props: IUserRepository.InputFindAll,
  ): Promise<Either<PaginationEntity<UserEntity>, NotFoundException>> {
    const paginationService = new PaginationEntity<UserEntity>({
      page: props.page,
      take: props.take,
    })
    const users = await db.query.users.findMany({
      limit: paginationService.pointer.take,
      offset: paginationService.pointer.skip,
    })
    if (!users?.length) {
      return new Left(new NotFoundException('Users not found'))
    }
    const [{ total }] = await db.select({ total: count() }).from(usersEntity)

    paginationService.data = users.map((user) => new UserEntity(user))
    paginationService.total = total
    return new Right(paginationService)
  }

  async findById(
    userId: string,
  ): Promise<Either<UserEntity, NotFoundException>> {
    const user = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, userId)
      },
    })
    if (!user) {
      return new Left(new NotFoundException('User not found'))
    }
    const userMapper = new UserEntity(user)
    return new Right(userMapper)
  }

  async findByEmail(
    email: string,
  ): Promise<Either<UserEntity, NotFoundException>> {
    const user = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.email, email)
      },
    })
    if (!user) {
      return new Left(new NotFoundException('User not found'))
    }
    const userMapper = new UserEntity(user)
    return new Right(userMapper)
  }

  async create(
    props: Omit<IOptional<Omit<IUserDto, 'updatedAt'>, 'id'>, 'createdAt'>,
  ): Promise<Either<boolean, NotFoundException>> {
    const hasUser = await this.findByEmail(props.email)

    if (hasUser.isSuccess) {
      return new Left(new NotFoundException('User already exists '))
    }

    const user = await db.insert(usersEntity).values({
      id: props.id,
      name: props.name,
      email: props.email,
      password: props.password,
    })

    if (!user) {
      return new Left(new NotFoundException('User not created'))
    }
    return new Right(true)
  }

  async updateById({
    id,
    ...props
  }: IRequired<
    Partial<Omit<IUserDto, 'password' | 'createdAt'>>,
    'id'
  >): Promise<Either<UserEntity, NotFoundException>> {
    const user = await this.findById(id)
    if (!user) {
      return new Left(new NotFoundException('User not found'))
    }
    await db
      .update(usersEntity)
      .set({
        name: props.name,
        email: props.email,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
    const userMapper = new UserEntity({ ...user, ...props } as IUserDto)
    return new Right(userMapper)
  }

  async deleteById(id: string): Promise<Either<boolean, NotFoundException>> {
    const user = await this.findById(id)
    if (!user) {
      return new Left(new NotFoundException('User not found'))
    }
    await db.delete(usersEntity).where(eq(users.id, id))
    return new Right(true)
  }
}
