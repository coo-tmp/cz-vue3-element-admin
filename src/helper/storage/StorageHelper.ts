const StorageHelper = {
  encode<T>(value: T): string {
    return JSON.stringify(value);
  },

  decode<T>(value: string): T {
    return JSON.parse(value) as T;
  },
};

export default StorageHelper;
