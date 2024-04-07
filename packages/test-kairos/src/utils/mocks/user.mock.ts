import { faker } from '@faker-js/faker'
import { IUserDto } from '@olympus/domain-ceos'
import { SecurityService } from '@olympus/lib-hera'
import { createId } from '@paralleldrive/cuid2'
import { pick } from '../pick'

type INewsKeys = keyof IUserDto
const security = new SecurityService()
export const UserMock = (
  { password, ...override } = {} as Partial<IUserDto>,
  pickKeys: INewsKeys[] = [],
): IUserDto => {
  password = password ?? faker.internet.password()
  const response = {
    id: createId(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: security.encrypt(password),
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
