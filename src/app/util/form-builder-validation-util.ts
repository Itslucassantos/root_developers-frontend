import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";


export const getMessageError = (errors: ValidationErrors, field: string) : string => {
    let message = ''; 

    if(errors) {
      if(errors?.["required"]) {
        message = `${field} é obrigatório`
      } else if(errors?.["pattern"]) {
        message = 'Por favor insira um e-mail válido!';
      } else if(errors?.["exists"]) {
        message = 'E-mail já está cadastrado!'
      } else if(errors?.["passwordMismatch"]) {
        message = 'Senhas digitadas são diferentes'
      }
    }
    return message;
}

export const hasValueMin = (form: { [x: string]: { value: string | any[]; }; }, field: string | number, valueMin = 3) => {
    if(form && field){
      return form[field]?.value?.length >= valueMin;
    }
    return false; 
}

export const hasError = (form: any, field: string | number, submitted: any) => {
    let errors = form[field]?.errors;
    return errors &&
      ( form[field].touched || submitted )
      && 
        (  
            errors?.required || 
            errors?.exists ||
            errors?.pattern ||
            errors?.passwordMismatch
        );
}

export const patternValidator = () : ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return { invalidPassword: false }
    }
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    const valid = regex.test(control.value);
    return !valid ? { invalidPassword: true } : null;
  };
}

export const matchPasswordValidator = (control: AbstractControl) : { [key: string]: boolean } | null  => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  if (password.value === confirmPassword.value) {
    confirmPassword.setErrors(null); 
  } else {
    confirmPassword.setErrors({ passwordMismatch: true });
  }

  return null;
}

export const matchEmailValidator = (control: AbstractControl) : { [key: string]: boolean } | null  => {
  const password = control.get('email');
  const confirmPassword = control.get('confirmEmail');

  if (!password || !confirmPassword) {
    return null;
  }

  if (password.value === confirmPassword.value) {
    confirmPassword.setErrors(null); 
  } else {
    confirmPassword.setErrors({ passwordMismatch: true });
  }

  return null;
}