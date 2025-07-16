import { CheckInService } from '../check-in'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { PismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'

export function makeCheckInService() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PismaGymsRepository()
  const checkInsService = new CheckInService(checkInsRepository, gymsRepository)

  return checkInsService
}
