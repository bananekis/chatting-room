import { StreamStatusContext } from "../../App";
import { useContext } from "react";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";

type Props = { type: string };

export const AddChannel = ({ type }: Props) => {
  const { setCreateType, setIsCreating, setIsEditing } =
    useContext(StreamStatusContext);

  return (
    <AddCircleOutlineSharpIcon
      onClick={() => {
        setCreateType(type);
        setIsCreating(true);
        setIsEditing(false);
      }}
      style={{ cursor: "pointer" }}
    />
  );
};
