import React from "react";
import useAreasState from "./Areas.state";
import AreasView from "./Areas.view";

const Areas: React.FC<{}> = () => {
  const state = useAreasState();
  return <AreasView {...state}></AreasView>;
};

export default Areas;
