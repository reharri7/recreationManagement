import firebase from 'firebase/compat/app';

export default interface ITeam {
  id?: string;
  gameId?: string;
  score: number;
  timestamp: firebase.firestore.FieldValue;
  color: string;
  name: string;
  metadata?;
}
