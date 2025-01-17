import { Col, ColProps, Box } from "@mantine/core";

export function ColWrapper(props: ColProps) {
  return (
    <Col {...props}>
      <Box
        sx={(theme) => ({
          height: "100%",
          padding: theme.spacing.md,
        })}
      >
        {props.children}
      </Box>
    </Col>
  );
}
