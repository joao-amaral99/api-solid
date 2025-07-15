import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsService } from './get-user-metrics'

let checkInRepository: InMemoryCheckInsRepository
let getUserMetricsService: GetUserMetricsService

describe('Get Metrics User Service', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository()
    getUserMetricsService = new GetUserMetricsService(checkInRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const { checkInsCount } = await getUserMetricsService.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
