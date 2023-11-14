import React from "react";
import useAreasState from "./Areas.state";
import AreasView from "./Areas.view";
import { IArea } from "../../db/dbTypes";
import { IOrgInfo } from "../Tab";

interface IAreaProps {
  orgInfo: IOrgInfo;
  areas: IArea[];
}
const Areas: React.FC<IAreaProps> = (props) => {
  const state = useAreasState(props.orgInfo);
  return <AreasView {...{ ...state, ...props }}></AreasView>;
};

export default Areas;
