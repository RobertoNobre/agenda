import 'reflect-metadata';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';
import MockAppointmentsRepository from '../repositories/mocks/MockAppointmentsRepository';

let mockAppointmentsRepository: MockAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('LisrProviderMonthAvailability', () => {
  beforeEach(() => {
    mockAppointmentsRepository = new MockAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      mockAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await mockAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '1',
      date: new Date(2020, 4, 20, 8, 0, 8),
    });

    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 8),
      user_id: '1',
    });

    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 8),
      user_id: '1',
    });

    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 11, 0, 8),
      user_id: '1',
    });

    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 12, 0, 8),
      user_id: '1',
    });

    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 13, 0, 8),
      user_id: '1',
    });

    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 8),
      user_id: '1',
    });

    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 8),
      user_id: '1',
    });

    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 8),
      user_id: '1',
    });

    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 17, 0, 8),
      user_id: '1',
    });

    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 10, 0, 8),
      user_id: '1',
    });

    await mockAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 8),
      user_id: '1',
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
