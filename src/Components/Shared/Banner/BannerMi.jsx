import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

const BannerMi = () => {
  return (
    <Paper
      mx="auto"
      elevation={3}
      style={{
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        textAlign: "center",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{ flexGrow: 1 }}
          // sx={{
          //     display: {
          //         xs: "block",
          //         md: "flex",
          //     }
          // }}
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid xs={6} sm={4}>
              <img
                src="https://eadn-wc01-10223060.nxedge.io/wp-content/uploads/2023/08/Engaging-and-Converting-Followers.jpg"
                alt=""
                style={{
                  width: "100%",
                  marginBottom: 0,
                  maxWidth: "600px",
                  height: "auto",
                }}
              />
            </Grid>
            <Grid
              xs={6}
              sx={{
                display: "Grid",
                alignItems: "center",
                textAlign: "center",
                border: "2px",
                justifyContent: "center",
              }}
            >
              <Typography>Give Blood</Typography>

              <Typography>Give Blood</Typography>

              <Button>Donate</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Paper>
  );
};

export default BannerMi;
