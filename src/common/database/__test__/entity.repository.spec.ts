import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import {
  Dummy,
  DummyDocument,
  dummyFactory,
  DummyModel,
  DummyRepository,
} from './support/dummy.helpers';

describe('EntityRepository', () => {
  let repository: DummyRepository;
  let dummyModel: DummyModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DummyRepository,
        {
          provide: getModelToken(Dummy.name),
          useClass: DummyModel,
        },
      ],
    }).compile();

    repository = module.get<DummyRepository>(DummyRepository);
    dummyModel = module.get<DummyModel>(getModelToken(Dummy.name));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findOne', () => {
    describe('when findOne is called', () => {
      let found: Dummy | null;
      let spy: jest.SpyInstance;
      const entityFilterQuery: FilterQuery<DummyDocument> = {
        _id: 'test-id',
      };

      beforeEach(async () => {
        spy = jest.spyOn(dummyModel, 'findOne');
        found = await repository.findOne(entityFilterQuery);
      });

      test('then it should call the model', () => {
        expect(spy).toBeCalledTimes(1);
      });

      test('then it should call the model with the correct params', () => {
        expect(spy.mock.calls[0][0]).toEqual(entityFilterQuery);
      });

      test('then it should return the dummy object', () => {
        expect(found).toEqual(dummyFactory());
      });
    });

    describe('when findOne is with an invalid value', () => {
      let found: Dummy | null;
      let response: Promise<DummyDocument>;
      let spy: jest.SpyInstance;
      const entityFilterQuery: FilterQuery<DummyDocument> = {
        _id: 'invalid-test-id',
      };

      beforeEach(async () => {
        spy = jest.spyOn(dummyModel, 'findOne');
        spy.mockRejectedValueOnce(new Error('Invalid id'));
        response = repository.findOne(entityFilterQuery);
        found = await response;
      });

      test('then it should call the model', () => {
        expect(spy).toBeCalledTimes(1);
      });

      test('then it should call the model with the correct params', () => {
        expect(spy.mock.calls[0][0]).toEqual(entityFilterQuery);
      });

      test('then it should not throw an erro and return null', () => {
        expect(response).resolves.not.toThrow();
        expect(found).toEqual(null);
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let created: Dummy;
      let spy: jest.SpyInstance;

      beforeEach(async () => {
        spy = jest.spyOn(DummyModel.prototype, 'create');
        created = await repository.create(dummyFactory());
      });

      test('then it should call the model', () => {
        expect(spy).toBeCalledTimes(1);
      });

      test('then it should call the model with the correct params', () => {
        expect(spy.mock.calls[0][0]).toEqual(dummyFactory());
      });

      test('then it should return the dummy object', () => {
        expect(created).toEqual(dummyFactory());
      });
    });
  });

  describe('deleteMany', () => {
    describe('when deleteMany is called', () => {
      let response: boolean;
      let spy: jest.SpyInstance;
      const entityFilterQuery: FilterQuery<DummyDocument> = {
        _id: 'test-id',
      };

      beforeEach(async () => {
        spy = jest.spyOn(dummyModel, 'deleteMany');
        response = await repository.delete(entityFilterQuery);
      });

      test('then it should call the model', () => {
        expect(spy).toBeCalledTimes(1);
      });

      test('then it should call the model with the correct params', () => {
        expect(spy.mock.calls[0][0]).toEqual(entityFilterQuery);
      });

      test('then it should return the dummy object', () => {
        expect(response).toEqual(true);
      });
    });
  });
});
