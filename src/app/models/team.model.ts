import firebase from 'firebase/compat/app';

export default interface ITeam {
  docID?: string;
  gameId?: string;
  score: number;
  timestamp: firebase.firestore.FieldValue;
  color: string;
  name: string;
}
