export class Model<T> {
  public copy(props: Partial<T>): this {
    if (JSON.stringify(this) === JSON.stringify(props)) {
      return this;
    }

    const copy = Object.create(this.constructor.prototype);
    Object.assign(copy, this, props);

    return copy;
  }

  public set<K extends ExcludeModelOwnProperties<T>>(property: K, value: T[K]): this {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return this.copy({ [property]: value });
  }

  public has(property: string): property is keyof Model<T> {
    return property in this;
  }
}

export type ExcludeModelOwnProperties<T> = Exclude<keyof T, keyof Model<unknown>>;
