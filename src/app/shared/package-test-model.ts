import {ProjectModel} from './project-model';

export class PackageTestModel {
  constructor(
    public id: number,
    public nom: string,
    public bdd: string,
    public rapprot: string,
    public projets: ProjectModel[]
  ) {
  }
}
