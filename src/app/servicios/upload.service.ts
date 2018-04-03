import { Injectable } from '@angular/core';
import { Upload } from './upload';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {
  constructor(private db: AngularFireDatabase) { }
  pushUpload(upload: Upload) {
    let refAlm = firebase.storage().ref();
    let subidor = refAlm.child(`uploads/${upload.file.name}`).put(upload.file);
    subidor.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
      },
      (error) => {
        console.log(error);
      },
      () => {
        upload.url = subidor.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.guardaArchivo(upload);
      }
    );
  }
  private guardaArchivo(upload: Upload) {
    this.db.list(`uploads`).push(upload);
  }
}
