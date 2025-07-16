import { PismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymService } from '../create-gym'

export function makeCreateGymService() {
  const gymsRepository = new PismaGymsRepository()
  const createGymService = new CreateGymService(gymsRepository)

  return createGymService
}
