interface InputProps {
  placeholder: string;
  reference?: any;
}

export function Input({ placeholder, reference }: InputProps) {
  return (
    <div className="items-center pr-5">
      <input
        ref={reference}
        placeholder={placeholder}
        type={"text"}
        className="px-4 py-2 border rounded m-2 items-center w-full"
      ></input>
    </div>
  );
}
