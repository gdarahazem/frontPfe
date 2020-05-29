import {UserModel} from "./user-model";
import {ProjectModel} from "./project-model";

export class RoleModel {
  constructor(
    public id: number,
    public nom?: string,
    public users?: UserModel[],
    public projets?: ProjectModel[]
  ) {}
}
