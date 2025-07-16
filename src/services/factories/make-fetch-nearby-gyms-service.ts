import { PismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyGymsService } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsService() {
  const gymsRepository = new PismaGymsRepository()
  const fetchNearbyGymsService = new FetchNearbyGymsService(gymsRepository)

  return fetchNearbyGymsService
}
