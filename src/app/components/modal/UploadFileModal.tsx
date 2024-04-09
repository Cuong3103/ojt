import { createEnum } from "@/utils/utils";
import { FC, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../button/button";
import { toast } from "react-toastify";
import { uploadProgramsService } from "@/services/programs/programService";

const DuplicationOptionEnum = createEnum(["ALLOW", "REPLACE", "SKIP"]);

type UploadFileModalProps = {
  title: string;
  showModal: () => void;
  scanningIds: string[];
  getFileUrl: string;
  importSettingFileds?: string[];
};

export const UploadFileModal: FC<UploadFileModalProps> = ({
  title,
  showModal,
  scanningIds,
  getFileUrl,
  importSettingFileds,
}) => {
  const [file, setFile] = useState<File | undefined>(undefined);
  const [scanningOpts, setScanningOpts] = useState<{
    id: string;
    name: string;
  }>({ id: "false", name: "false" });
  const [duplicationOption, setDuplicationOption] = useState<string>(
    DuplicationOptionEnum.ALLOW
  );

  const fileInput = useRef<HTMLInputElement>(null);
  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInput.current!.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = e.target.files![0];
    if (uploadFile) {
      setFile(uploadFile);
    }
  };

  const appendScanningFields = (formData: FormData): void => {
    Object.keys(scanningOpts).forEach((key) => {
      formData.append(key, (scanningOpts as any)[key]);
    });
  };

  const chooseScanningOtps = (event: any) => {
    const { name, value } = event.target;
    setScanningOpts({
      ...scanningOpts,
      [name.split(" ")[1].toLowerCase()]: value,
    });
  };

  const submitFile = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append("file", file);
      appendScanningFields(formData);
      formData.append("duplicateHandle", duplicationOption);
      await uploadProgramsService(formData);

      toast.success("File uploaded successfully");
      showModal();
    } else {
      toast.error("Please select a file to upload");
      return;
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full backdrop-blur-md opacity-100 z-40"
        // onClick={showModal}
      >
        <div className="rounded-lg  fixed items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white z-50 shadow-lg w-1/2">
          <h2 className="flex items-center justify-between text-xl bg-[#2D3748] text-white p-2 rounded-t">
            {title}
            <button onClick={showModal}>
              <IoMdCloseCircleOutline />
            </button>
          </h2>

          <form className="p-10">
            <div className="flex items-start">
              <h3 className="font-bold text-black text-lg mt-2">
                Import settings
              </h3>
              <section className="ml-5">
                <label className="flex gap-4 items-center mb-4">
                  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700 mr-56">
                    File (csv)
                  </span>
                  <input
                    type="file"
                    accept=".csv"
                    hidden
                    disabled={!!file}
                    ref={fileInput}
                    onChange={onFileChange}
                  />
                  <Button
                    title={file ? file.name : "Select"}
                    disabled={!!file}
                    className="btn bg-black text-white"
                    onClick={(e) => onClickButton(e)}
                  />
                </label>
                <label className="flex gap-4 items-center mb-4">
                  <div className="mr-20 w-full  text-sm font-medium text-slate-700">
                    Encoding type
                  </div>
                  <select className="select select-bordered w-full max-w-xs">
                    <option>Auto detect</option>
                    <option>UTF-8</option>
                    <option>UTF-16</option>
                  </select>
                </label>
                <label className="flex gap-4 items-center mb-4">
                  <div className="mr-20 w-full  text-sm font-medium text-slate-700">
                    Column separator
                  </div>
                  <select className="select select-bordered w-full max-w-xs">
                    <option selected>Comma</option>
                  </select>
                </label>
                <label className="flex gap-4 items-center mb-4">
                  <div className="mr-20 w-full  text-sm font-medium text-slate-700">
                    Import template
                  </div>
                  <a href={getFileUrl} className="text-blue-500 underline">
                    Download
                  </a>
                </label>
              </section>
            </div>
            <div className="divider"></div>
            <div className="flex items-start">
              <h3 className="font-bold text-black text-lg mt-2">
                Duplicate controls
              </h3>
              <section className="ml-5 mt-3">
                <div className="mr-20 w-full  text-sm font-medium text-slate-700 mb-3">
                  Scanning
                </div>
                <div className="flex gap-4 mb-10">
                  {scanningIds.map((id) => (
                    <label className="flex items-center mr-10 gap-3">
                      <input
                        type="checkbox"
                        name={id}
                        value={"true"}
                        className="checkbox"
                        onChange={(e) =>
                          chooseScanningOtps(e)
                        }
                      />

                      <p className="text-sm">{id}</p>
                    </label>
                  ))}
                </div>
                <div className="mr-20 w-full  text-sm font-medium text-slate-700 mb-3">
                  Duplicate handle
                </div>
                <div className="flex gap-4">
                  {Object.keys(DuplicationOptionEnum).map((id) => (
                    <label className="flex items-center mr-10 gap-3">
                      <input
                        type="radio"
                        name="scanning"
                        value={id}
                        className="checkbox"
                        onChange={(e) => setDuplicationOption(e.target.value)}
                      />
                      <p className="text-sm">{id}</p>
                    </label>
                  ))}
                </div>
              </section>
            </div>
            <div className="divider"></div>
            <section className="flex justify-end mt-5 items-center gap-6">
              <Button
                title="Cancel"
                className="w-[48px] h-[28px] py-[2px] rounded-[8px] underline text-[#E74A3B] text-sm mr-[30px]"
                onClick={showModal}
              />
              <Button
                title="Import"
                className="btn bg-black text-white"
                disabled={!file}
                onClick={(e) => submitFile(e)}
              />
            </section>
          </form>
        </div>
      </div>
    </>
  );
};
