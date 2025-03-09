export interface IProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  characteristics: ICharacteristics;
}

export type FilterType = {
  [key: string]: string[] | number[];
};

export interface ICharacteristics {
  country: string;
  brand: string;
  dossage: string;
  releaseForm: string;
  storageTemperature: string;
  quantityPerPackage: number;
  expirationDate: string;
  isByPrescription: boolean;
  manufacturer: string;
}
