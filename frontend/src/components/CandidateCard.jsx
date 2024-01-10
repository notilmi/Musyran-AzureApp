import React, { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/system/Box";
import ExitToApp from "@mui/icons-material/ExitToApp";
import HowToVote from "@mui/icons-material/HowToVote";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import CheckCircle from "@mui/icons-material/CheckCircle";

export default function CandidateCard({
  CandidateNumber,
  CandidateName,
  CandidateMission,
  CandidateVision,
  CandidateAvatar,
  selectedCandidate
}) {
  const [open, setOpen] = React.useState(false);

  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(!clicked);
    
    if (!clicked) {
      selectedCandidate.push(CandidateName)
    } else {
      let index = selectedCandidate.indexOf(CandidateName)
      if (index !== -1) {
        selectedCandidate.splice(index, 1)
      }
    }
    console.log(selectedCandidate);
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          width: "285px",
          textAlign: "center",
          marginLeft: "30px",
          marginTop: "15px",
          marginBottom: "15px",
          borderRadius: "15px"
        }}
      >
        <div></div>
        <Box sx={{ borderRadius: "12px", overflow: "hidden" }}>
          <AspectRatio
            minHeight="400px"
            maxHeight="400px"
            minWidth="300px"
            maxWidth="300px"
            borderRadius="25px"
          >
            <img src={CandidateAvatar} loading="lazy" alt={CandidateName} onClick={() => setOpen(true)}/>
          </AspectRatio>
        </Box>
        <CardContent orientation="horizontal">
          <Box sx={{ flexGrow: 1 }}>
            <Typography level="h4">{CandidateName}</Typography>
            <Typography level="title-md">
              Nomor Kandidat : {CandidateNumber}
            </Typography>
          </Box>
        </CardContent>
        <Box sx={{ marginTop: "6px", alignContent: "flex-end", shadow: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            startDecorator={<InfoOutlined />}
          >
            Detail
          </Button>
          <Button
            variant={clicked ? "outlined" : "solid"}
            size="md"
            color={clicked ? "success" : "primary"}
            startDecorator={clicked ? <CheckCircle /> : <HowToVote />}
            sx={{ marginLeft: "12px", shadow: 3 }}
            onClick={() => handleClick()}
          >
            {clicked ? "Voted" : "Vote"}
          </Button>
        </Box>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="soft"
            sx={{
              width: "auto",
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose variant="plain" />
            <Typography
              component="h1"
              id="modal-title"
              level="h1"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
              marginBottom="25px"
            >
              Tentang Calon Formatur
            </Typography>
            <Box sx={{ width: "auto", display: "flex", flexDirection: "row" }}>
              <Box sx={{}}>
                <Typography
                  component="h3"
                  id="modal-number"
                  level="h5"
                  textColor="inherit"
                  fontWeight="lg"
                  sx={{
                    marginTop: "12px",
                  }}
                >
                  Nomor Urut
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary">
                  {CandidateNumber}
                </Typography>
                <Typography
                  component="h3"
                  id="modal-name"
                  level="h5"
                  textColor="inherit"
                  fontWeight="lg"
                  sx={{
                    marginTop: "12px",
                  }}
                >
                  Nama Calon Formatur
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary">
                  {CandidateName}
                </Typography>
                <Typography
                  component="h3"
                  id="modal-vision"
                  level="h5"
                  textColor="inherit"
                  fontWeight="lg"
                  sx={{
                    marginTop: "12px",
                  }}
                >
                  Visi Calon Formatur
                </Typography>
                <Typography id="modal-desc" textColor="text.tertiary">
                  {CandidateVision}
                </Typography>
                <Typography
                  component="h3"
                  id="modal-mission"
                  level="h5"
                  textColor="inherit"
                  fontWeight="lg"
                  sx={{
                    marginTop: "12px",
                  }}
                >
                  Misi Calon Formatur
                </Typography>
                <Typography
                  id="modal-desc"
                  textColor="text.tertiary"
                  sx={{ whiteSpace: "pre-wrap" }}
                >
                  {CandidateMission}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: "300px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <img
                  src={CandidateAvatar}
                  alt="Candidate Avatar"
                  style={{
                    size: "auto",
                    maxWidth: "300px",
                    maxHeight: "400px",
                    borderRadius: "25px",
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                size="md"
                color="primary"
                onClick={() => setOpen(false)}
                variant="solid"
                startDecorator={<ExitToApp />}
              >
                Tutup
              </Button>
            </Box>
          </Sheet>
        </Modal>
      </Card>
    </React.Fragment>
  );
}
