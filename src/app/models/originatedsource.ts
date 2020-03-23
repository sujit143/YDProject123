export interface OriginatedSource {
  Id: number;
  Source1: OriginatedSourceList[];
  Source2: string;
}

export interface OriginatedSourceList {
  Id: number;
  Name: string;
}
