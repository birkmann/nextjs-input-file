/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  required?: boolean;
  label?: string;
  defaultValue?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFile = (props: Props) => {
  const { name, required, defaultValue, onChange } = props;
  const fileInputField = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [defaultActive, setDefaultActive] = useState(false);
  const [resetActive, setResetActive] = useState(false);

  useEffect(() => {
    if (defaultValue && defaultValue !== "") {
      setDefaultActive(true);
      setShowImagePreview(true);
    }
  }, [defaultValue]);

  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null
  >();

  const buttonClickHandler = () => {
    fileInputField.current.click();
  };

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setShowImagePreview(true);
        setImagePreview(reader.result);
      };
    }
  };

  const deleteFile = () => {
    setShowImagePreview(false);
    setDefaultActive(false);
    setImagePreview(null);

    if (defaultValue && defaultValue !== "") {
      setResetActive(true);
    }
  };

  const resetFile = () => {
    setDefaultActive(true);
    setShowImagePreview(true);
    setResetActive(false);
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute z-10 space-x-4 top-4 right-4">
          {resetActive && (
            <button
              type="button"
              onClick={() => resetFile()}
              className="p-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 border-solid rounded hover:bg-gray-100"
              title="Revert to default"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                />
              </svg>
            </button>
          )}
          {showImagePreview && (
            <button
              type="button"
              onClick={() => deleteFile()}
              className="p-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 border-solid rounded hover:bg-gray-100"
              title="Delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          )}
        </div>
        {!showImagePreview && (
          <div className="relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded h-80 border-slate-300 bg-slate-100">
            <span className="text-sm text-slate-600">
              Drag and drop a file to upload...
            </span>
            <input
              type="file"
              name={name}
              id={name}
              className="absolute inset-0 opacity-0 cursor-pointer"
              ref={fileInputField}
              onChange={(e) => {
                onImageChange(e);
                onChange(e);
              }}
              required={required}
              accept="image/*"
            />
            <button
              type="button"
              onClick={() => buttonClickHandler()}
              className="absolute px-3 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 border-solid rounded bottom-4 hover:bg-gray-100"
            >
              Open file selector
            </button>
          </div>
        )}
        {showImagePreview && (
          <div className="relative bg-black h-80">
            <img
              src={defaultActive ? defaultValue : (imagePreview as string)}
              alt="Image preview"
              className="object-contain w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFile;
