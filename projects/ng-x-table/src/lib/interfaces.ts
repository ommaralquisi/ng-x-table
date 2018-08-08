export interface ITableConfig {
  total: number; // total length of the data
  itemPerPage: number; // how many item should the table display
  currentPage: number; // the current page the table displaying
  sorting?: ISorting;
  filtering?: IFiltering;
}

export interface ISorting {
  column: string; // todo: change this to be of type IColumns
  direction: string;
}

export interface IFiltering {
  column: string; // todo: change this to be of type IColumns
  filteringString: string;
}

export interface IColumns {
  title: string;
  name: string;
  sorting: boolean;
  sort?: string | boolean;
  pipe?: string;
  filter?: boolean;
}
