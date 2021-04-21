import {PackageTestModel} from "./package-test-model";

export class BddModel {
  constructor(
    public id: number,
    public nomFicher: string,
    public fichier: string,
    public packageTest?: PackageTestModel
  ) {
  }
}
