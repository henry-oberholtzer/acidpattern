import { useContext } from "react";
import { PatternContext } from "./PatternContext";

const usePattern = () => {
	return useContext(PatternContext);
};

export { usePattern }
