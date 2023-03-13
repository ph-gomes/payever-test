export abstract class MockModel<T> {
  protected abstract entity: T;

  async findOne(): Promise<T> {
    return this.entity;
  }

  async create(): Promise<T> {
    return this.entity;
  }

  async deleteMany(): Promise<{ deletedCount: 1 }> {
    return { deletedCount: 1 };
  }
}
