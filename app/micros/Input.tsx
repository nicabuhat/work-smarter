import styles from "./input.module.css";

interface InputProps {
  label: string;
  btnTxt: string;
}
const Input = ({ label, btnTxt }: InputProps) => {
  return (
    <div className="flex gap-2">
      <div className={`${styles.inputBox} flex flex-col relative w-full`}>
        <label
          htmlFor="input"
          className="absolute top-[-14px] left-[6px] bg-transparent p-1 text-sm-b text-primary"
        >
          {label}
        </label>
        <input
          type="text"
          className={`${styles.input} w-full pt-3 pb-2 px-2 border border-gray-300 bg-gray-50 rounded-md`}
        />
      </div>
      <button className="bg-accent rounded-md px-4">{btnTxt}</button>
    </div>
  );
};

export default Input;
