import { Validators } from "@angular/forms";
import { FormEspecItem } from "../../common/interfaces/form-espec-item.interface";

export const productTypeFormEspec: FormEspecItem[] = [
    { 
      name: 'uid', 
      label: 'UID', 
      type: 'text',
      validators: [Validators.required]
    },
    {
      name: 'description',
      label: 'Descrição',
      type: 'text',
      validators: [Validators.required]
    },
];