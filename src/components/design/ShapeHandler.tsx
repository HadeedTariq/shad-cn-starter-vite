import { setCurrentDesignType } from "@/reducers/designReducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ShapeHandler = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentDesignType("shapes"));
  }, []);
  return <>Shapes</>;
};

export default ShapeHandler;
