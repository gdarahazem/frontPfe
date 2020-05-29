import {RoleModel} from './role-model';
import {PackageTestModel} from './package-test-model';

export class ProjectModel {
  constructor(
    public id: number,
    public nom?: string,
    public url?: string,
    public roles?: RoleModel[],
    public packageTests?: PackageTestModel[]
    ) {
  }
}
