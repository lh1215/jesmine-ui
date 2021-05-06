import React, { PropsWithChildren, useCallback, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "../button";
import { Method, AxiosRequestConfig, CancelTokenSource } from "axios";
import { UploadList, ImageList } from "../uploadList";

export const updateFilist = (
  setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>,
  _file: ProgressBar,
  uploadPartial: Partial<ProgressBar>
) => {
  setFlist((prevList) => {
    if (prevList) {
      return prevList.map((v) => {
        if (v.uid === _file.uid) {
          return { ...v, ...uploadPartial };
        } else {
          return v;
        }
      });
    } else {
      return prevList;
    }
  });
};

export interface ProgressBar {
  filename: string;
  percent: number;
  status: "ready" | "success" | "failed" | "upload";
  uid: string;
  size: number;
  raw: File | null;
  cancel?: CancelTokenSource;
  img?: string | ArrayBuffer | null;
}
type onProgressType = ((p: number, f: File, i: number) => void) | undefined;
type UploadMode = "default" | "img";

const postData = function (
  file: File,
  filename: string,
  config: Partial<AxiosRequestConfig>,
  i: number, //多重上传时i用来标识第几个
  onProgress: onProgressType,
  setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>,
  successCallback: ((res: any, i: number) => void) | undefined,
  failCallback: ((res: any, i: number) => void) | undefined
) {
  const formData = new FormData();
  formData.append(filename, file);
  const source = axios.CancelToken.source();
  const _file: ProgressBar = {
    filename: file.name,
    percent: 0,
    status: "ready",
    uid: Date.now() + "upload",
    size: file.size,
    raw: file,
    cancel: source,
  };
  setFlist((prev) => {
    //添加进队列
    return [_file, ...prev];
  });
  const defaultAxiosConfig: Partial<AxiosRequestConfig> = {
    method: "post",
    url: "http://localhost:51111/user/uploadAvatar/",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    cancelToken: source.token,
    onUploadProgress: (e) => {
      let percentage = Math.round((e.loaded * 100) / e.total) || 0;
      updateFilist(setFlist, _file, {
        status: "upload",
        percent: percentage,
      });
      //更新上传队列
      if (onProgress) {
        onProgress(percentage, file, i);
      }
    },
  };
  const mergeConfig = { ...defaultAxiosConfig, ...config };

  return axios(mergeConfig)
    .then((res) => {
      updateFilist(setFlist, _file, { status: "success", percent: 100 });
      if (successCallback) {
        successCallback(res, i);
      }
    })
    .catch((r) => {
      updateFilist(setFlist, _file, { status: "failed", percent: 0 });
      if (failCallback) {
        failCallback(r, i);
      }
    });
};

const resolveFilename = function (
  uploadFilename: string[] | string,
  index: number
) {
  if (Array.isArray(uploadFilename)) {
    return uploadFilename[index];
  } else {
    return uploadFilename;
  }
};

type UploadProps = {
  /** 上传字段名*/
  uploadFilename: string[] | string;
  /** 发送设置，参考axios */
  axiosConfig?: Partial<AxiosRequestConfig>;
  /** 获取进度 */
  onProgress?: onProgressType;
  /** 成功回调 */
  successCallback?: ((res: any, i: number) => void) | undefined;
  /** 失败回调 */
  failCallback?: ((res: any, i: number) => void) | undefined;
  /** 上传列表初始值 */
  defaultProgressBar?: ProgressBar[];
  /** 如果返回promise，需要提供file，否则同步需要返回boolean，如果为false，则不发送*/
  beforeUpload?: (f: File, i: number) => boolean | Promise<File>;
  /** 上传模式 2种 */
  uploadMode?: UploadMode;
  /** 是否开启进度列表 */
  progress?: boolean;
  onRemoveCallback?: (f: ProgressBar) => void;
  /** 自定义删除行为，只有img与progress为true有效*/
  customRemove?: (
    file: ProgressBar,
    setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>
  ) => void;
};

export function Upload(props: UploadProps) {
  const {
    axiosConfig,
    onProgress,
    defaultProgressBar,
    uploadFilename,
    successCallback,
    failCallback,
    beforeUpload,
    uploadMode,
    progress,
    customRemove,
    onRemoveCallback,
  } = props;
  const [flist, setFlist] = useState<ProgressBar[]>(defaultProgressBar || []);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files && e.target.files.length <= 0) return;
    let filelist = Array.from(e.target.files);
    filelist.forEach((f, i) => {
      if (beforeUpload) {
        const p = beforeUpload(f, i);
        if (p instanceof Promise) {
          p.then((res: File) => {
            postData(
              res,
              resolveFilename(uploadFilename, i),
              axiosConfig!,
              i,
              onProgress,
              setFlist,
              successCallback,
              failCallback
            );
          });
        } else {
          if (p) {
            //false不执行
            postData(
              f,
              resolveFilename(uploadFilename, i),
              axiosConfig!,
              i,
              onProgress,
              setFlist,
              successCallback,
              failCallback
            );
          }
        }
      } else {
        postData(
          f,
          resolveFilename(uploadFilename, i),
          axiosConfig!,
          i,
          onProgress,
          setFlist,
          successCallback,
          failCallback
        );
      }
    });
  };
  const handleClick = () => {
    inputRef.current?.click();
  };
  const resolveBtnLoading = function (flist: ProgressBar[]) {
    return flist.some((v) => v.status === "upload");
  };
  const onRemove = useCallback(
    (file: ProgressBar) => {
      if (customRemove) {
        customRemove(file, setFlist);
      } else {
        setFlist((prev) => {
          return prev.filter((item) => {
            if (
              item.uid === file.uid &&
              item.status === "upload" &&
              item.cancel
            ) {
              item.cancel.cancel();
            }
            return item.uid !== file.uid;
          });
        });
      }

      if (onRemoveCallback) {
        onRemoveCallback(file);
      }
    },
    [customRemove, onRemoveCallback]
  );
  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
        value=""
      ></input>
      <Button
        onClick={handleClick}
        isLoading={resolveBtnLoading(flist)}
        loadingText="上传中..."
      >
        upload
      </Button>
      {uploadMode === "default" && progress && (
        <UploadList flist={flist} onRemove={onRemove}></UploadList>
      )}
      {uploadMode === "img" && (
        <ImageList
          flist={flist}
          setFlist={setFlist}
          onRemove={onRemove}
        ></ImageList>
      )}
    </div>
  );
}
Upload.defaultProps = {
  axiosConfig: {},
  uploadFilename: "avatar",
  successCallback: () => console.log("上传成功"),
  failCallbakc: () => console.error("上传失败"),
};
