import { ReactNode, useState } from "react";
import InputFile from "../components/InputFile/InputFile";

type FormProps = {
  title: string;
  description: string;
  headerImage: null | undefined | ReactNode;
  secondaryImage: null | undefined | ReactNode;
};

export default function Home() {
  const [values, setValues] = useState<FormProps>({
    title: "",
    description: "",
    headerImage: "",
    secondaryImage: null,
  });

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div>
      <div className="bg-gray-800 min-h-screen">
        <div className="mx-auto max-w-screen-lg px-4 lg:px-8">
          <div className="bg-white p-4 lg:p-16">
            <div className="space-y-8">
              <InputFile
                name={"headerImage"}
                required={true}
                defaultValue={
                  "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
                }
                onChange={inputChangeHandler}
              />
              <InputFile
                name={"secondaryImage"}
                required={true}
                onChange={inputChangeHandler}
              />
            </div>
            <div className="mt-16 bg-black text-white p-4 font-mono">
              <div>
                <div className="font-semibold">headerImage:</div>
                <p>{values.headerImage}</p>
              </div>
              <div>
                <div className="font-semibold">secondaryImage:</div>
                <p>{values.secondaryImage}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
