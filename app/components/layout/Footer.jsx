import React from "react";
import { styled } from "@mui/material/styles";

const FooterRoot = styled("footer")(({ theme }) => ({
  padding: theme.spacing(6, 0),
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(12, 0),
  },
  background: theme.palette.background.footer,
}));

const FooterContainer = styled("div")(({ theme }) => ({
  maxWidth: "100vw",
  width: "100%",
  maxHeight: "60px",
  margin: "0 auto",
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(0, 2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(0, 8),
  },
}));

const GroupTitle = styled("h2")(({ theme }) => ({
  textTransform: "uppercase",
  color: theme.palette.primary.dark,
  marginBottom: theme.spacing(1),
}));

const SocialIcon = styled("a")(({ theme }) => ({
  padding: 0,
  marginRight: theme.spacing(1),
  color: "rgba(255, 255, 255, 0.6)",
  "&:hover": {
    background: "transparent",
  },
  "&:last-child": {
    marginRight: 0,
  },
}));

const Icon = styled("span")(({ theme }) => ({
  fontSize: 24,
}));

const MyFooter = () => {
  return (
    <FooterRoot>
      <FooterContainer>
        {/* Your footer content goes here */}
        {/* Example: Social icons, navigation links, etc. */}
        <GroupTitle>Follow Us</GroupTitle>
        <SocialIcon href="#" target="_blank">
          <Icon className="fab fa-facebook" />
        </SocialIcon>
        <SocialIcon href="#" target="_blank">
          <Icon className="fab fa-twitter" />
        </SocialIcon>
        {/* Add other social icons as needed */}
      </FooterContainer>
    </FooterRoot>
  );
};

export default MyFooter;
