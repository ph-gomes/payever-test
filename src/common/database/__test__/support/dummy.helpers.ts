import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { EntityRepository } from '../../entity.repository';
import { MockModel } from './model.mock';

export const dummyFactory = () => ({ test: 'test', _id: 'test-id' });

export class Dummy {
  test: string;
}

export type DummyDocument = Dummy & Document;

export class DummyModel extends MockModel<Dummy> {
  protected entity = dummyFactory();
}

@Injectable()
export class DummyRepository extends EntityRepository<DummyDocument> {
  constructor(@InjectModel(Dummy.name) model: Model<DummyDocument>) {
    super(model);
  }
}
