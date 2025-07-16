import { PismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymsService } from '../search-gyms'

export function makeSearchGymsService() {
  const gymsRepository = new PismaGymsRepository()
  const searchGymsService = new SearchGymsService(gymsRepository)

  return searchGymsService
}
