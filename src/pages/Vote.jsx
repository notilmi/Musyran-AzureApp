import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/system/Box";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import "react-tiny-fab/dist/styles.css";
import NotFound from "./NotFound";

import NavBar from "../components/Navbar";
import CandidateCard from "../components/CandidateCard";
import FAB from "../components/FloatingVoteButton";
import ErrorSnackbar from "../components/ErrorSnackbar";
import sendVote from "../components/voteProcessing";
import SuccessSnackbar from "../components/SuccessSnackbar";
import ProgressSnackbar from "../components/ProgressSnackbar";

function Vote() {
  const authCode = new URLSearchParams(location.search).get("authCode");
  if (!authCode) {
    return <NotFound />;
  }

  const [candidates, setCandidates] = useState([]);
  const [countCandidate, setCountCandidate] = useState(0);
  const [selectedCandidate] = React.useState([]);

  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [progressOpen, setProgressOpen] = React.useState(false);

  const [successStatement, setSuccessStatement] = React.useState(null);
  const [errorStatement, setErrorStatement] = React.useState(null);

  const [loading, setLoading] = useState(true); // Initially set to true to show the loading screen.
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get("api/vote");
        setCandidates(response.data.body);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setErrorStatement("Error fetching candidates");
        setErrorOpen(true);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure.
      }
    };

    fetchCandidates();
  }, []);

  return (
    <CssVarsProvider>
      <CssBaseline />
      <NavBar countCandidate={countCandidate} />
      <FAB
        sendVote={() =>
          sendVote({
            authCode: authCode,
            selectedCandidate: selectedCandidate,
            setErrorOpen: setErrorOpen,
            setErrorStatement: setErrorStatement,
            setSuccessOpen: setSuccessOpen,
            setSuccessStatement: setSuccessStatement,
            setProgressOpen: setProgressOpen,
          })
        }
      />
      {loading ? (
        // Show loading spinner when data is being fetched
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100% !important",
            height: "100vh !important",
          }}
        >
          <CircularProgress size="lg" />
        </Box>
      ) : (
        // Render content when data is loaded
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {candidates
            .slice()
            .sort((a, b) => a.nomorKandidat - b.nomorKandidat)
            .map((candidate) => (
              <CandidateCard
                key={candidate.nomorKandidat}
                CandidateNumber={candidate.nomorKandidat}
                CandidateName={candidate.option}
                CandidateMission={candidate.misi}
                CandidateVision={candidate.visi}
                CandidateAvatar={candidate.avataruri}
                countCandidate={countCandidate}
                setCountCandidate={setCountCandidate}
                selectedCandidate={selectedCandidate}
              />
            ))}
        </Box>
      )}
      <SuccessSnackbar
        successOpen={successOpen}
        setSuccessOpen={setSuccessOpen}
        successStatement={successStatement}
        setSuccessStatement={setSuccessStatement}
        redirect={`/done`}
      />
      <ErrorSnackbar
        errorOpen={errorOpen}
        setErrorOpen={setErrorOpen}
        errorStatement={errorStatement}
        setErrorStatement={setErrorStatement}
      />
      <ProgressSnackbar
        progressOpen={progressOpen}
        setProgressOpen={setProgressOpen}
      />
    </CssVarsProvider>
  );
}

export default Vote;
