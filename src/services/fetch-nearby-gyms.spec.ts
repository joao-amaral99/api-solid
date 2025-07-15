import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsService } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let fetchNearbyGymsService: FetchNearbyGymsService

describe('Fetch Nearby Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    fetchNearbyGymsService = new FetchNearbyGymsService(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'Workout with Alpha',
      phone: '',
      latitude: -14.8865024,
      longitude: -40.8485888,
    })

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'Workout with Beta',
      phone: '',
      latitude: -14.6685464,
      longitude: -40.5027978,
    })

    const { gyms } = await fetchNearbyGymsService.execute({
      userLatitude: -14.8865024,
      userLongitude: -40.8485888,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
