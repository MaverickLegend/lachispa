export interface DataflowAnnotation {
  id?: string;
  title?: string;
  type: string;
  text?: string;
}

export interface Dataflow {
  id: string;
  name?: string;
  agencyID: string;
  version: string;
  isFinal: boolean;
  urn: string;
  annotations?: DataflowAnnotation[];
  structure?: string;
}

export interface DataflowReferenceMap {
  [urn: string]: Dataflow;
}

export interface DataflowResponse {
  resources: any[];
  references: DataflowReferenceMap;
}

export interface Codelist {
  id: string;
  name: string;
  codes: Codes[];
}

export interface Codes {
  id: string;
  name: string;
}
