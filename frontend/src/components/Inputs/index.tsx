export { CustomInput } from './Input';
export { TextArea } from './TextArea';

export interface InputProps {
    type?: React.HTMLInputTypeAttribute;
    value: string | number | readonly string[];
    onInput:
        | React.FormEventHandler<HTMLInputElement>
        | React.FormEventHandler<HTMLTextAreaElement>;
    label: string;
    errors?: string;
}
