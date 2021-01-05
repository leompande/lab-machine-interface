export interface OrganizationUnit {
  id: string;
  name: string;
  path: string;
  level: number;
  children: {
    id: string;
    name: string;
  }[];
  parent: {
    id: string;
    name: string;
  };
}
