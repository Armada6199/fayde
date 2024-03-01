import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { Grid, Paper } from "@mui/material";
import { Stack } from "@mui/system";

const drawerWidth = 240;
const navActions = [
  "Assistant",
  "Speech to text",
  "Text to speech",
  "Speech to Speech",
  "Sign Langauge To Text",
  "Text to Sign Langauge",
  "Sign Lanagauge to sign Langauge",
];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        INSPIRE AI
      </Typography>
      <Divider />
      <Stack spacing={2}>
        {navActions.map((item) => (
          <Item>{item}</Item>
        ))}
      </Stack>
      <Button sx={{ color: "#fff" }}>Login</Button>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", height: "60px", maxHeight: "60px" }}>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"space-around"}
        px={4}
        sx={{
          bgcolor: "primary.main ",
          bgcolor: "primary.main",
        }}
      >
        <Grid container item alignItems={"center"}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", color: "#fff" },
            }}
          >
            INSPIRE AI
          </Typography>
          <Button sx={{ color: "#fff", fontSize: 24 }}>Login</Button>
        </Grid>
      </Grid>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default DrawerAppBar;
