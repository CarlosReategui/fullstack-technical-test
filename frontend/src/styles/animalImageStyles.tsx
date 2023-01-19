import { createStyles } from "@mantine/core";

export const useAnimalImageStyles = createStyles((theme, _params, getRef) => ({
  container: {
    width: "40px",
    lineHeight: "40px",
    textAlign: "center",
  },
  resizeFitCenter: {
    maxWidth: "100%",
    borderRadius: "25%",
    maxHeight: "100%",
    verticalAlign: "middle",
  },
}));
