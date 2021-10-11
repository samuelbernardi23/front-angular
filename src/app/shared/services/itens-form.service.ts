import { Injectable } from '@angular/core';
import notify from 'devextreme/ui/notify';

export interface SaveButton {
  text: string;
  type: string;
  useSubmitBehavior: boolean;
  height: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItensFormService {

  constructor() { }

  notify(message: string, time?: number | null) {
    notify({
      message: message,
      position: {
        my: "bottom center",
        at: "bottom center"
      }
    }, "success", time ? time : 4000);
  }

  saveButton(): SaveButton {
    return {
      text: "Salvar",
      type: "success",
      useSubmitBehavior: true,
      height: "60",
    }
  }
}
