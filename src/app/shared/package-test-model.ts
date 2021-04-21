import {ProjectModel} from './project-model';
import {BddModel} from './BddModel';
import {ScriptModel} from './script-model';

export class PackageTestModel {
  constructor(
    public nom: string,
    public projets: ProjectModel[],
    public rapport?: string,
    public bdds?: BddModel[],
    public scripts?: ScriptModel[],
    public id?: number,
  ) {
  }
}
