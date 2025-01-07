import { Validators } from "@angular/forms";
import { FormEspecItem } from "../../common/interfaces/form-espec-item.interface";

const productTypeDescriptionEspec: FormEspecItem = {
  name: 'description',
  label: 'Descrição',
  type: 'text',
  validators: [Validators.required]
}

export const productTypeCreateFormEspec: FormEspecItem[] = [
  { 
    name: 'uid', 
    label: 'UID', 
    type: 'text',
    validators: [Validators.required]
  }, productTypeDescriptionEspec
];

export const productTypeViewFormEspec: FormEspecItem[] = [
  { 
    name: 'uid', 
    label: 'UID', 
    type: 'text',
    disabled: true,
  }, productTypeDescriptionEspec
];