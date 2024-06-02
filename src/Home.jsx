// src/Home.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CssBaseline, Fab } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import theme from "./theme";

const Home = () => {
  const [progress, setProgress] = useState(0);
  const [ipData, setIpData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  const fetchData = () => {
    setProgress(30); // Start loading
    axios.get("https://ipapi.co/json").then((res) => {
      setIpData(res.data);
      setProgress(100); // Finish loading
      console.log(res);
    });
  };

  useEffect(() => {
    fetchData();
     // Update the current time every second
     const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    // Cleanup the timer on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <CssBaseline />
      {progress < 100 && (
        <LinearProgress
          sx={{ width: "100%", position: "fixed", top: 0, left: 0 }}
        />
      )}
      <Container>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h4"
            color={"secondary"}
            component="h1"
          
            fontWeight={900}
            letterSpacing={1}
            textTransform={"uppercase"}
            style={{ marginTop: "2rem" }}
            gutterBottom
          >
            IP Address
          </Typography>


          <Typography variant="p" fontSize={12} fontWeight={500} component="p" textTransform={'uppercase'} style={{ marginBottom: "2rem" }} gutterBottom>
             At {currentTime}
          </Typography>


          {ipData ? (
            <TableContainer component={Paper} style={{ marginBottom: "4em" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: theme.palette.secondary.main }}>
                      <strong style={{textTransform: 'uppercase'}}>Field</strong>
                    </TableCell>
                    <TableCell sx={{ color: theme.palette.secondary.main }}>
                      <strong style={{textTransform: 'uppercase'}}>Value</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>IP Address</TableCell>
                    <TableCell>{ipData.ip}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>City</TableCell>
                    <TableCell>{ipData.city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Region</TableCell>
                    <TableCell>{ipData.region}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Country</TableCell>
                    <TableCell>{ipData.country_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Postal Code</TableCell>
                    <TableCell>{ipData.postal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>European Union</TableCell>
                    <TableCell>{ipData.in_eu ? "Yes" : "No"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Latitude / Longitude</TableCell>
                    <TableCell>
                      {ipData.latitude} , {ipData.longitude}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Time Zone</TableCell>
                    <TableCell>{ipData.timezone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Calling Code</TableCell>
                    <TableCell>+{ipData.country_calling_code}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Currency</TableCell>
                    <TableCell>{ipData.currency}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Languages</TableCell>
                    <TableCell>{ipData.languages}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>ASN</TableCell>
                    <TableCell>{ipData.asn}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Organization</TableCell>
                    <TableCell>{ipData.org}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1">Loading...</Typography>
          )}
        </Box>
      </Container>
      <Fab
        color="secondary"
        aria-label="refresh"
        onClick={fetchData}
        sx={{ position: "fixed", bottom: 16, right: 16, borderRadius: '15px'}}
      >
        <RefreshIcon style={{ width: 15 }} />
      </Fab>
    </>
  );
};

export default Home;
