import { ImageList, Modal } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { auth } from '../../firebase/Config';
import Contact from './Contact';
import './Dashboard.css';
import ImageGal from "./ImageGal";


function Dashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false); 
  const [anchorElNested, setAnchorElNested] = React.useState(null);
  const openNested = Boolean(anchorElNested);

  const handleClickNested = (event) => {
    setAnchorElNested(event.currentTarget);
  };

  const handleCloseNested = () => {
    setAnchorElNested(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };



  const [loginModalDisplay, setLoginModalDisplay] = useState(false);
  const [registerModalDisplay, setRegisterModalDisplay] = useState(false);
  const modalRef = useRef(null);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const openLoginModal = () => {
    setLoginModalDisplay(true);
  };
  const closeLoginModal = () => {
    setLoginModalDisplay(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const handleOutsideClick = (event) => {
    if (event.target === modalRef.current) {
      closeLoginModal();
    }
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const scrollToRef = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth', // Smooth scrolling behavior
    });
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional: smooth scrolling animation
    });
  };
  const opagRef = useRef(null);
  const aboutRef = useRef(null);
  const galleryRef = useRef(null);
  const agenciesRef = useRef(null);
  const contactsRef = useRef(null);
  return (
    <>
      <div >
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
          <img src={require('../image_src/bg.jpg')} alt='pineapple' className='pineapple-image' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <AppBar
              position="fixed"
              elevation={0}
              style={{
                backgroundColor: isScrolled ? '#ffffff' : 'transparent',
                backdropFilter: isScrolled ? 'none' : 'blur(8px)',
                boxShadow: isScrolled ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
                transition: 'background-color 0.3s, backdrop-filter 0.3s, box-shadow 0.3s',
              }}
            >

              {/* <AppBar position="fixed" elevation={4} style={{ backgroundColor: 'transparent', backdropFilter: 'blur(8px)', boxShadow: 'none' }}> */}
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <img src={require('../image_src/pinyatamap-logo.png')} width={50} height={50} marginLeft />
                  <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                      mr: 2,
                      display: { xs: 'none', md: 'flex' },
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      letterSpacing: '.3rem',
                      color: 'green',
                      textDecoration: 'none',
                    }}
                    style={{ marginLeft: '10px' }}
                  >
                    QUEEN PINEAPPLE FARMING
                  </Typography>

                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', lg: 'flex' } }}>
                  <Button
                      onClick={scrollToTop}
                      sx={{ my: 2, color: 'green', display: 'block' }}
                    >
                      Home
                    </Button>
                    <Button
                      id="fade-button"
                      aria-controls={open ? 'fade-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      sx={{ my: 2, color: 'green', display: 'block' }}
                    >
                      About
                    </Button>
                    <Menu
                      id="fade-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                    >
                      <MenuItem onClick={() => scrollToRef(opagRef)}>Opag</MenuItem>
                      <MenuItem onClick={() => scrollToRef(aboutRef)}>Katangian ng Pinyang Queen</MenuItem>
                      <MenuItem onClick={handleClose}>Mga Uri ng pananim</MenuItem>
                      <MenuItem onClick={handleClose}>Pagpili at paghahanda ng pantanim</MenuItem>

                      {/* Nested Menu */}
                      <MenuItem onClick={handleClickNested}>
                        More Options
                      </MenuItem>
                    </Menu>
                    <Menu
                      id="nested-menu"
                      anchorEl={anchorElNested}
                      open={openNested}
                      onClose={handleCloseNested}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}


                    >
                      <MenuItem onClick={handleCloseNested}>Paghahanda ng lupa</MenuItem>
                      <MenuItem onClick={handleCloseNested}>Pagtatanim</MenuItem>
                      <MenuItem onClick={handleCloseNested}>Pagsugpo ng damo</MenuItem>
                      <MenuItem onClick={handleCloseNested}>Pagaabono</MenuItem>
                      <MenuItem onClick={handleCloseNested}>Pagpapabulaklak</MenuItem>
                      <MenuItem onClick={handleCloseNested}>Mga Peste</MenuItem>
                      <MenuItem onClick={handleCloseNested}>Paraan ng pagpapalaki</MenuItem>
                      <MenuItem onClick={handleCloseNested}>Pagaani ng bunga</MenuItem>
                      <MenuItem onClick={handleCloseNested}>Pagaani ng dahon</MenuItem>
                      <MenuItem onClick={handleCloseNested}>Paraan ng paghanda ng pinya</MenuItem>
                    </Menu>

                    <Button
                      onClick={() => scrollToRef(galleryRef)}
                      sx={{ my: 2, color: 'green', display: 'block' }}
                    >
                      Gallery
                    </Button>
                    <Button
                      onClick={() => scrollToRef(agenciesRef)}
                      sx={{ my: 2, color: 'green', display: 'block' }}
                    >
                      Agencies
                    </Button>
                    <Button
                      onClick={() => scrollToRef(contactsRef)}
                      sx={{ my: 2, color: 'green', display: 'block' }}
                    >
                      Contacts
                    </Button>
                  </Box>

                  <Box sx={{ flexGrow: 0 }}>
                    <div style={{ marginLeft: 'auto' }}>
                      <Button
                        variant='outlined'
                        onClick={openLoginModal}
                        sx={{
                          color: 'green',
                          borderColor: 'green',
                          '&:hover': {
                            backgroundColor: 'green',
                            color: 'white',
                          },
                        }}
                      >Login</Button>
                    </div>
                  </Box>
                </Toolbar>
              </Container>
            </AppBar>
            <Modal
              open={loginModalDisplay}
              onClose={closeLoginModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: '9999',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
              }}>
                <h1 style={{ color: 'orange' }}>MALIGAYANG PAGDATING!</h1>
                <h5 style={{ alignItems: 'center' }}>Mag-login sa iyong account</h5>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  label="Email"
                  color="secondary"
                  value={email}
                  onChange={(event) => { setEmail(event.target.value) }}
                  InputProps={{ style: { borderColor: 'green' } }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  label="Password"
                  color="secondary"
                  value={password}
                  onChange={(event) => { setPassword(event.target.value) }}
                  InputProps={{ style: { borderColor: 'green' } }} />
                <Button
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: 'green' }}
                  onClick={handleLogin}

                >
                  Sign In
                </Button>

              </Box>
            </Modal>
          </div>
        </div>
        <div ref={opagRef}>
          <Opag />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={galleryRef}>
          <ScreenShots />
        </div>
        <div ref={agenciesRef}>
          <AgencySec />
        </div>
        <div ref={contactsRef}>
          <ContactSec />
        </div>
      </div>
    </>
  )
}
const aboutList = [
  {
    url: 'les.jpg',
    title: "Hon. Ricarte R. Padilla",
    text: "Governor"
  },
  {
    url: "jay.jpg",
    title: "Engr. Almirante A. Abad",
    text: "Provincial Agriculturist"
  },
  {
    url: "nay.jpg",
    title: "Marilyn C. Pauto",
    text: "Supervising Agriculturist -CROPS Division"
  },
  {
    url: "glen.png",
    title: "Rowil B. Diaz",
    text: "Agriculturist II/ Provincial Pineapple Coordinator "
  }
]
const Opag = () => {
  return (
    <div id="Opag" className="text-center" style={{ backgroundColor: 'white' }}>
      <div >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700', backgroundColor: 'white', marginTop: 20 }}>
            OFFICE OF THE PROVINCIAL AGRICULTURIST
          </Typography>
        </div>
        <ImageList sx={{ width: '100%', }} cols={4} rowHeight={100}>
          {
            aboutList.map((about) => (
              <div key={`${about.title}-${about.text}`} >
                <img
                  src={require(`../image_src/${about.url}`)}
                  style={{
                    borderRadius: '50%',
                    width: '50%',
                    height: '50%',
                    objectFit: 'cover'
                  }} />
                <h3>{about.title}</h3>
                <p>{about.text}</p>
              </div>
            ))
          }
        </ImageList>
      </div>
    </div>
  )
}
const Information = ({ cName }) => (
  <Box sx={{ fontFamily: 'Helvetica, sans-serif', fontSize: '20px', fontWeight: 'bold', justifyContent: 'center' }}>
    Ang queen ang pinakamatamis na uri ng pinya sa Pilipinas. Ito ay may matinik na dahon kung ikukumpara sa ibang uri ng pinya. Ang  bunga ang tumitimbang ng halos isang kilo.
    Ang bunga ng queen ay malaki sa gawing puno at paliit sa gawing dulo. Matingkad na kulay dilaw ang balat kung hinog na at ang laman ay malutong. Hindi ito gaanong makatas
    at tamang tama lang sa panlasa at tamis. Napagalaman sa pagsusuri ng DOLE Philippines ma mataas ang taglay na iron, magnesium, potasyum, copper at manganese
    ng Queen kaysa sa Hawaiian.
  </Box>
);
const pineList = [
  {
    url: 'p1.jpg',
    title: 'Uri ng Pananim',
    width: '25%',
    popoverText: 'Ang Korona isang uri ng pananim na nakausbong sa ibabaw ng bunga ng pinya. Ang hapas o aerial suckers ay umuusbong naman sa itaas ng bahagi ng puno ng pinya. At ang suhi o ground suckers ay tumutubo naman sa puno ng pinya na nakadikit sa lupa'
  },
  {
    url: 'p2.jpg',
    title: 'Large',
    width: '25%',
    popoverText: 'This is large'
  },
  {
    url: 'p3.jpg',
    title: 'Medium',
    width: '25%',
    popoverText: 'This is medium'
  },
  {
    url: 'p5.jpg',
    title: 'Butterball',
    width: '25%',
    popoverText: 'This is but'
  },
];

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
    backgroundColor: 'transparent',
    borderColor: 'green',
    color: 'green',
    '&:hover': {
      backgroundColor: 'green',
      borderColor: 'green',
      color: 'white',
    },
  },
}));


const About = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentPopoverText, setCurrentPopoverText] = React.useState('');

  const handlePopoverOpen = (event, popoverText) => {
    setAnchorEl(event.currentTarget);
    setCurrentPopoverText(popoverText);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (

    <div style={{ backgroundColor: 'white' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700', backgroundColor: 'white' }}>
          ABOUT PINEAPPLES
        </Typography>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {pineList.map((pine) => (
          <ImageButton
            focusRipple
            key={pine.title}
            style={{
              width: pine.width,
            }}
          >
            <img src={require(`../image_src/${pine.url}`)} alt={pine.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

            <Image>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={(event) => handlePopoverOpen(event, pine.popoverText)}
                onMouseLeave={handlePopoverClose}
              >
                {pine.title}
              </Typography>
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>{currentPopoverText}</Typography>
              </Popover>
            </Image>
          </ImageButton>
        ))}
      </div>

      <div className='about' >
        <div className='about-col-one' >
          <Information cName='about-text' />
        </div>
        <div className='about-col-two'>
          <Images imagesList={imagesList} />
        </div>
      </div>

    </div>

  );
};

function Images({ imagesList }) {
  return (
    <Carousel>
      {imagesList.map(image => (
        <Carousel.Item>
          <img src={require(`../image_src/${image}`)} alt='pineapple' style={{ width: '600px', height: '408px' }} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}
const imagesList = [
  "p1.jpg",
  "p2.jpg",
  "p3.jpg",
  "p5.jpg",
]


function ScreenShots() {
  return (
    <div className='screenshot' id="Gallery" style={{ fontFamily: 'Arial' }}>
      <span>SCREENSHOTS</span>
      <ImageGal />
    </div>
  )
}

const agencyList = [
  {
    name: "Camarines Norte",
    logo: "POCN_logo.png"
  },
  {
    name: "OPAG - Cam Norte",
    logo: "OPAG_logo.png"
  },
  {
    name: "DA - CNLRRS",
    logo: "DOA_logo.png"
  }
]

function Agencies({ agencyList }) {
  return (
    <div className='agencies' id='Ahensiya' style={{ fontFamily: 'Arial' }}>
      {agencyList.map(agency => (
        <div className='agency'>
          <img src={require(`../image_src/${agency.logo}`)} alt={agency.name} className="logo-image" />
          <span>{agency.name}</span>
        </div>
      ))}
    </div>
  )
}

function AgencySec() {
  return (
    <div className='agency-sec' id='Agencies'>
      <span>MGA AHENSIYA</span>
      <Agencies agencyList={agencyList} />
    </div>
  )
}

// const contactList = [
//   {
//     name: "Person One",
//     logo: "profile.png"
//   },
//   {
//     name: "Person Two",
//     logo: "profile.png"
//   },
//   {
//     name: "Person Three",
//     logo: "profile.png"
//   }
// ]

// function Contacts({ contactList }) {
//   return (
//     <div className='contacts' id='Kontak' style={{ fontFamily: 'Arial' }}>
//       {contactList.map(contact => (
//         <div className='contact'>
//           <img src={require(`../image_src/${contact.logo}`)} alt={contact.name} className="logo-image" />
//           <span>{contact.name}</span>
//         </div>
//       ))}
//     </div>
//   )
// }

function ContactSec() {
  return (
    <div className='contact-sec' id='Contacts'>
      <span>GET IN TOUCH</span>
      <Contact />
    </div>
    //   <Contacts contactList={contactList} />
    // </div>
  )
}

export default Dashboard

