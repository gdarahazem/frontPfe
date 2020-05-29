import {RoleModel} from './role-model';

export class UserModel {
  constructor(
    public id: number,
    public nom: string,
    public prenom: string,
    public login: string,
    public mdp: string,
    public role?: RoleModel
  ) { }
}
