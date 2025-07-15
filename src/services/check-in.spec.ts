import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInService } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from 'generated/prisma/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'
import { MaxCheckInsError } from './errors/max-check-ins-error'

let checkInRepository: InMemoryCheckInsRepository
let checkInService: CheckInService
let gymsRepository: InMemoryGymsRepository

describe('Check-in Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInService = new CheckInService(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Best gym ever',
      description: 'Workout with us',
      phone: '',
      latitude: -14.8865024,
      longitude: -40.8485888,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2025, 7, 8, 0, 0))

    const { checkIn } = await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -14.8865024,
      userLongitude: -40.8485888,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 6, 8, 0, 0))

    await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -14.8865024,
      userLongitude: -40.8485888,
    })

    await expect(() =>
      checkInService.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -14.8865024,
        userLongitude: -40.8485888,
      }),
    ).rejects.toBeInstanceOf(MaxCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2025, 6, 8, 0, 0))

    await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -14.8865024,
      userLongitude: -40.8485888,
    })

    vi.setSystemTime(new Date(2025, 6, 9, 0, 0))

    const { checkIn } = await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -14.8865024,
      userLongitude: -40.8485888,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Best gym ever 2',
      description: 'Workout with us 2',
      phone: '',
      latitude: new Decimal(-14.8037855),
      longitude: new Decimal(-40.8261012),
    })

    await expect(() =>
      checkInService.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: -14.8865024,
        userLongitude: -40.8485888,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
