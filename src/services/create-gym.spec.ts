import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, it, describe, beforeEach } from 'vitest'
import { CreateGymService } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let createGymService: CreateGymService

describe('Register Service', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    createGymService = new CreateGymService(gymsRepository)
  })

  it('should be able to register', async () => {
    const { gym } = await createGymService.execute({
      title: 'Best gym ever',
      description: 'Workout with us',
      phone: '',
      latitude: -14.8865024,
      longitude: -40.8485888,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
