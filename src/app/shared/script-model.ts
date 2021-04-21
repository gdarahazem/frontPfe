import {PackageTestModel} from './package-test-model';

export class ScriptModel {
  constructor(
    public id: number,
    public nomFichier: string,
    public fichier: string,
    public packageTest?: PackageTestModel
  ) {
  }
}
