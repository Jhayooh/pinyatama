import MenuIcon from '@mui/icons-material/Menu';
import { Link, Modal, Tab, Tabs } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
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

// const pages = ['OPAG', 'About', 'Gallery', 'Agencies', 'Contacts'];

function Dashboard() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
                  >
                    QUEEN PINEAPPLE FARMING
                  </Typography>

                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button
                      onClick={() => scrollToRef(opagRef)}
                      sx={{ my: 2, color: 'green', display: 'block' }}
                    >
                      OPAG
                    </Button>
                    <Button
                      onClick={() => scrollToRef(aboutRef)}
                      sx={{ my: 2, color: 'green', display: 'block' }}
                    >
                      About
                    </Button>
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
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: 'block', md: 'none' },
                      }}
                    >

                      {/* {pages.map((page) => (
                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                          {/* <Typography textAlign="center" > */}
                            <Link href={`#${page}`}>{page}</Link>
                          {/* </Typography> */}
                        </MenuItem>
                      ))} */}
                    </Menu>
                  </Box>

                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {/* {pages.map((page) => (
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'green', display: 'block' }}
                      >
                        {page}
                      </Button>
                    ))} */}
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
    <div id="OPAG" className="text-center" style={{ backgroundColor: 'white' }}>
      <div className="container" >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700', backgroundColor: 'white' }}>
            OFFICE OF THE PROVINCIAL AGRICULTURIST
          </Typography>
        </div>
        <div className="row">
          {
            aboutList.map((about) => (
              <div key={`${about.title}-${about.text}`} className="col-xs-6 col-md-3">
                {" "}
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
        </div>
      </div>
    </div>
  )
}
const Information = ({ cName }) => (
  <div style={{ fontFamily: 'Helvetica, sans-serif', fontSize: '20px', fontWeight: 'bold', justifyContent: 'center' }}>
    Ang queen ang pinakamatamis na uri ng pinya sa Pilipinas. Ito ay may matinik na dahon kung ikukumpara sa ibang uri ng pinya. Ang  bunga ang tumitimbang ng halos isang kilo.
    Ang bunga ng queen ay malaki sa gawing puno at paliit sa gawing dulo. Matingkad na kulay dilaw ang balat kung hinog na at ang laman ay malutong. Hindi ito gaanong makatas
    at tamang tama lang sa panlasa at tamis. Napagalaman sa pagsusuri ng DOLE Philippines ma mataas ang taglay na iron, magnesium, potasyum, copper at manganese
    ng Queen kaysa sa Hawaiian.
  </div>
);
const pineList = [
  {
    url: 'p1.jpg',
    title: 'Extra Large',
    width: '25%',
  },
  {
    url: 'p2.jpg',
    title: 'Large',
    width: '25%',
  },
  {
    url: 'p3.jpg',
    title: 'Medium',
    width: '25%',
  },
  {
    url: 'p5.jpg',
    title: 'Butterball',
    width: '25%',
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
  },
}));


const About = () => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => setModalDisplay(true);
  const closeModal = () => setModalDisplay(false);

  const handleOutsideClick = (event) => {
    if (event.target === modalRef.current) {
      closeModal();
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white' }}>
        <div id='About' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px', marginBottom: '5px' }}>
          <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700', marginTop: '18px', backgroundColor: 'white' }}>
            ABOUT PINEAPPLES
          </Typography>

        </div>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
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
                >
                  {pine.title}
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>

        <div className='about' id='Tungkol'>
          <div className='about-col-one' style={{ marginBottom: '5px' }}>
            <Information cName='about-text' />
            {/* <div>
              <button
                className="btn btn-outline-warning"
                type="button"
                onClick={openModal}
                style={{  fontFamily: 'Helvetica, sans-serif' ,fontSize:'12'}}
              >
                Karagdagang impormasyon
              </button>

              {modalDisplay && (
                <div
                  ref={modalRef}
                  className='modal'
                  onClick={handleOutsideClick}
                  style={{ display: 'block' }}
                >
                  <form
                    className='modal-content animate'
                    action='/action_page.php'
                    method='post'
                    style={{ width: '50%', backgroundColor: 'green' }}
                  >
                    <img src={require('../image_src/p5.jpg')} />
                    <p style={{ fontFamily: 'Comic Sans MS, sans-serif', }}> </p>
                    <Tabs
                      defaultActiveKey="info"
                      transition={false}
                      id="noanim-tab-example"
                      className="mb-3"
                    >
                      <Tab eventKey="info" title="Klasipikasyon" style={{ color: 'white' }}>
                        Ang Bureau of Agricyltural Fishery Products Standards ay nagpalabas sa sumusunod na Klasipikasyon
                        base sa timbang ng pinyang queen kasama ang korona.<br />
                        Extra large: mahigit 1,000g <br />
                        Large: 850-1,000g  <br />
                        Medium: 700-850g  <br />
                        Small: 550-700  <br /> Butterball: below 550g
                      </Tab>
                      <Tab eventKey="profile" title="Uri" style={{ color: 'white' }}>
                        Tab content for Profile
                      </Tab>
                      <Tab eventKey="contact" title="Contact" style={{ color: 'white' }}>
                        Tab content for Contact
                      </Tab>
                    </Tabs> */}
            {/* <img src={require('../image_src/p5.jpg' )}/> */}
            {/* <p style={{fontFamily:'Arial',}}>
                  Ang Queen Pineapple ay kilala bilang ang pinakamatamis na pinya sa buong mundo. Ang prutas ay may
                  kakaibang mabangong tamis at krispi, at medyo mas maliit kaysa sa iba pang uri ng pinya dahil ito'y
                  nagbibigay lamang ng timbang na mga 450 gramo hanggang 950 gramo.
                </p>  */}

            {/* </form>
                </div>
              )}
            </div>*/}
          </div>
          <div className='about-col-two'>
            <Images imagesList={imagesList} />
          </div>
        </div>
      </Box>

    </>
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
    <div className='agencies' id='Agencies' style={{ fontFamily: 'Arial' }}>
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

