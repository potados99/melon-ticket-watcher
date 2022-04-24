type ObjectType<T> = {
  new (): T;
};

export default abstract class BaseModel {
  static create<T>(this: ObjectType<T>, properties: Partial<T>): T {
    return Object.assign(new this(), properties);
  };
}
