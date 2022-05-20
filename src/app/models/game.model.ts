import ITeam from './team.model';

export default interface IGame {
  id: string;
  teams: ITeam[];
  date: Date;
}
