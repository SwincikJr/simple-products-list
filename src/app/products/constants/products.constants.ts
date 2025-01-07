import { Validators } from "@angular/forms";
import { FormEspecItem } from "../../common/interfaces/form-espec-item.interface";

export const productsFormEspec: FormEspecItem[] = [
    {
        name: 'name',
        label: 'Nome',
        type:  'text',
        validators: [Validators.required]
    },
    {
        name: 'productTypeId',
        label: "Tipo de Produto",
        type: 'select',
        validators: [Validators.required],
        options: []
    }
]

export const productsViewExtraEspec: FormEspecItem = {
    name: 'createdAt',
    label: 'Data e Hora de criação',
    type:  'text',
    disabled: true
}
