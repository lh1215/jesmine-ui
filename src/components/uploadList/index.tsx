import React, { PropsWithChildren, ReactNode, useMemo } from "react";
import styled from "styled-components";
import { color, typography } from "../shared/styles";
import { darken, rgba, opacify } from "polished";
import { ProgressBar, updateFilist } from "../upload";
import Icon from "../icon";

interface UploadListProps {
  flist: ProgressBar[];
  onRemove: (item: ProgressBar) => void;
}
const ImgWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 104px;
  height: 104px;
  margin-right: 8px;
  margin-bottom: 8px;
  text-align: center;
  vertical-align: top;
  background-color: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 2px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  > img {
    width: 100%;
    height: 100%;
  }

  &::before {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    content: " ";
  }
  &:hover::before {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 1;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    content: " ";
  }
  &:hover > .closebtn {
    display: block;
  }
`;

const ImgCloseBtn = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  display: none;
`;
export function UploadList(props: UploadListProps) {
  const { flist, onRemove } = props;
  return (
    <React.Fragment>
      {flist.map((item) => {
        return (
          <span key={item.uid}>
            <ImgWrapper>
              <img src={item.img as string} alt="3"></img>
              <ImgCloseBtn className="closebtn" onClick={() => onRemove(item)}>
                <Icon icon="trash" color={color.light}></Icon>
              </ImgCloseBtn>
            </ImgWrapper>
          </span>
        );
      })}
    </React.Fragment>
  );
}

interface imageListProps extends UploadListProps {
  setFlist: React.Dispatch<React.SetStateAction<ProgressBar[]>>;
}

export function ImageList(props: imageListProps) {
  const { flist, onRemove, setFlist } = props;
  useMemo(() => {
    if (flist) {
      flist.forEach((item) => {
        if (item.raw && !item.img) {
          //如果有文件并且没有img地址，生成blob地址
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            updateFilist(setFlist, item, {
              img: reader.result || "error",
            });
          });
          reader.readAsDataURL(item.raw);
        }
      });
    }
  }, [flist, setFlist]);
  return (
    <div>
      {flist.map((item) => {
        return (
          <span key={item.uid}>
            <img src={item.img as string} alt="3"></img>
          </span>
        );
      })}
    </div>
  );
}
