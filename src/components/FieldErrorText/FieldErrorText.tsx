export type FieldErrorTextProps = {
  message?: string;
};

export function FieldErrorText({ message }: FieldErrorTextProps) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm text-rose-300">{message}</p>;
}
