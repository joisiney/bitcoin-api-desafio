import { faker } from '@faker-js/faker'
import { IUserDto } from '@olympus/domain-ceos'
import { createId } from '@paralleldrive/cuid2'
import { pick } from '../pick'

type INewsKeys = keyof IUserDto
export const UserMock = (
  override = {} as Partial<IUserDto>,
  pickKeys: INewsKeys[] = [],
): IUserDto => {
  const response = {
    id: createId(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...override,
  }
  if (pickKeys.length > 0) {
    return pick<IUserDto>(pickKeys, response) as IUserDto
  }
  return response
}
export const UserMockList = (length = 10, pickKeys: INewsKeys[] = []) => {
  return Array.from({ length }, () => UserMock({}, pickKeys))
}
