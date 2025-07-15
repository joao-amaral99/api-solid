import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsService } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let searchGymsService: SearchGymsService

describe('Search Gyms Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    searchGymsService = new SearchGymsService(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Alpha',
      description: 'Workout with Alpha',
      phone: '',
      latitude: -14.8865024,
      longitude: -40.8485888,
    })

    await gymsRepository.create({
      title: 'Beta',
      description: 'Workout with Beta',
      phone: '',
      latitude: -14.8865024,
      longitude: -40.8485888,
    })

    const { gyms } = await searchGymsService.execute({
      query: 'Beta',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Beta' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Beta ${i}`,
        description: 'Workout with Beta',
        phone: '',
        latitude: -14.8865024,
        longitude: -40.8485888,
      })
    }

    const { gyms } = await searchGymsService.execute({
      query: 'Beta',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Beta 21' }),
      expect.objectContaining({ title: 'Beta 22' }),
    ])
  })
})
