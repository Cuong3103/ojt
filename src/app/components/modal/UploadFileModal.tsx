import { createEnum } from "@/utils/utils";
import { FC, useRef, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../button/button";
import { toast } from "react-toastify";
import { uploadProgramsService } from "@/services/programs/programService";

const DuplicationOptionEnum = createEnum(["ALLOW", "REPLACE", "SKIP"]);

type UploadFileModalProps = {
  title: string;
  scanningIds: string[];
  getFileUrl: string;
  importSettingFileds?: string[];
  updateService: (x: any) => void;
  showModal: () => void;
};

export const UploadFileModal: FC<UploadFileModalProps> = ({
  title,
  showModal,
  scanningIds,
  getFileUrl,
  updateService,
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
      await updateService(formData);

      toast.success("File uploaded successfully");
      showModal();
    } else {
      toast.error("Please select a file to upload");
      return;
    }
  };

  return (
    <>
      <dialog className="modal " open>
        <div className="w-[500px] flex flex-col gap-[15px] bg-white rounded-[10px] shadow-md">
          <div className="head bg-[#2D3748] flex items-center rounded-t-[10px] justify-center p-[10px]">
            <p className="font-bold text-base text-white">{title}</p>
            <button onClick={showModal} className="w-6 h-6 ml-auto">
              <IoMdCloseCircleOutline className="w-full h-full" />
            </button>
          </div>

          <div className="body flex flex-col gap-[15px] px-[20px]">
            <div className="part-top w-full flex justify-between">
              <div className="pt-left">
                <p className="text-sm font-bold">Import setting</p>
              </div>

              <div className="pt-right flex flex-col gap-[15px]">
                <div className="ptr-property flex">
                  <p className="w-[165px] text-sm font-normal">File (csv)*</p>
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
                    className="btn w-[82px] h-[24px] px-[20px] py-[5px] bg-[#2D3748] text-white text-sm font-normal rounded-[5px] flex items-center justify-center"
                    onClick={(e) => onClickButton(e)}
                  />
                </div>
                <div className="ptr-property flex">
                  <p className="w-[165px] text-sm font-normal">Encoding type</p>
                  <div className="w-[140px]">
                    <select
                      className="w-full px-[10px] border-[1px] border-[#ACACAC]"
                      defaultValue="auto"
                    >
                      <option disabled selected>
                        Auto Detect
                      </option>
                      <option>UTF-8</option>
                      <option>UTF-16</option>
                    </select>
                  </div>
                </div>
                <div className="ptr-property flex">
                  <p className="w-[165px] text-sm font-normal">
                    Column seperator
                  </p>
                  <div className="w-[140px]">
                    <select className="w-full max-w-xs px-[10px] border-[1px] border-[#ACACAC]">
                      <option className="" disabled selected>
                        Comma
                      </option>
                    </select>
                  </div>
                </div>
                <div className="ptr-property flex">
                  <p className="w-[165px] text-sm font-normal">
                    Import template
                  </p>
                  <a
                    href={getFileUrl}
                    className="w-[82px] h-[24px] px-[20px] py-[5px] underline text-[#285D9A] text-sm font-normal flex items-center justify-center"
                  >
                    Download
                  </a>
                </div>
                <hr className="h-[1px] bg-[#ACACAC]" />
              </div>
            </div>
            <div className="part-bottom w-full flex justify-between">
              <div className="pb-left">
                <p className="text-sm font-bold">Duplicate control</p>
              </div>
              <div className="pb-right w-[305px]">
                <div className="pbr-top h-[49px] flex flex-col gap-[5px]">
                  <p className="text-sm font-normal">Scanning</p>
                  <div className="choose flex gap-[16px]">
                    <div className="tick flex gap-[8px]">
                      {scanningIds.map((id) => (
                        <>
                          <input
                            type="checkbox"
                            name={id}
                            value={"true"}
                            className="checkbox w-[16px] h-[16px] rounded-[2px]"
                            onChange={(e) => chooseScanningOtps(e)}
                          />
                          <p className="text-sm">{id}</p>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pbr-bottom h-[59px] flex flex-col gap-[5px]">
                  <p className="text-sm font-normal">Duplicate handle</p>
                  <div className="tick flex gap-[8px]">
                    {Object.keys(DuplicationOptionEnum).map((id) => (
                      <>
                        <input
                          key={id}
                          type="radio"
                          name="scanning"
                          value={id}
                          className="checkbox w-[16px] h-[16px] rounded-[2px]"
                          onChange={(e) => setDuplicationOption(e.target.value)}
                        />
                        <p className="text-sm">{id}</p>
                      </>
                    ))}
                  </div>
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
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
