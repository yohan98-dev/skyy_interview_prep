import * as React from 'react';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormFieldProps<T> extends FieldValues {
  control: Control<T>;
  name: Path<T>;
  lable: string;
  placeholder: string;
  type?: 'text' | 'email' | 'password';
}

const FormFields = ({
  control,
  name,
  lable,
  placeholder,
  type = 'text',
}: FormFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="lable">{lable}</FormLabel>
        <FormControl>
          <Input
            className="input"
            type={type}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormFields;
