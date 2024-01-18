interface NativeName {
  [key: string]: {
    official: string;
    common: string;
  };
}

export default interface Country {
  name: {
    common: string;
    official: string;
    nativeName: NativeName;
  };
  cca2: string;
}
