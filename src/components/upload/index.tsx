import React, { PropsWithChildren, ReactNode, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "../button";
import { Method, AxiosRequestConfig, CancelTokenSource } from "axios";
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

interface ProgressBar {
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
};

export function Upload(props: UploadProps) {
  const {
    axiosConfig,
    onProgress,
    defaultProgressBar,
    uploadFilename,
    successCallback,
    failCallback,
  } = props;
  const [flist, setFlist] = useState<ProgressBar[]>(defaultProgressBar || []);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (e.target.files && e.target.files.length <= 0) return;
    let filelist = Array.from(e.target.files);
    filelist.forEach((f, i) => {
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
    });
  };
  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleChange}
        style={{ display: "none" }}
        value=""
      ></input>
      <Button onClick={handleClick}>upload</Button>
      {flist.map((v) => {
        return (
          <div key={v.uid}>
            {v.filename}
            {v.percent}
            {v.status}
          </div>
        );
      })}
    </div>
  );
}
Upload.defaultProps = {
  axiosConfig: {},
  uploadFilename: "avatar",
};
