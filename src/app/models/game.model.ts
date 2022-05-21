import firebase from 'firebase/compat/app';

export default interface IGame {
  docID?: string;
  timestamp: firebase.firestore.FieldValue;
}
