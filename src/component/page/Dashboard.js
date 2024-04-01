import { ImageList, Modal } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
  const uriRef = useRef(null);
  const piliRef = useRef(null);
  const lupaRef = useRef(null);
  const tanimRef = useRef(null);
  const damoRef = useRef(null);
  const abonoRef = useRef(null);
  const bulaklakRef = useRef(null);
  const pesteRef = useRef(null);
  const paraanRef = useRef(null);
  const bungaRef = useRef(null);
  const dahonRef = useRef(null);
  const produktoRef = useRef(null);
  const himagasRef = useRef(null);
  const bentaRef = useRef(null);

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
                      <MenuItem onClick={() => scrollToRef(uriRef)}>Mga Uri ng pananim</MenuItem>
                      <MenuItem onClick={() => scrollToRef(piliRef)}>Pagpili at paghahanda ng pantanim</MenuItem>

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
                      <MenuItem onClick={() => scrollToRef(lupaRef)}>Paghahanda ng lupa</MenuItem>
                      <MenuItem onClick={() => scrollToRef(lupaRef)}>Pagtatanim</MenuItem>
                      <MenuItem onClick={() => scrollToRef(lupaRef)}>Pagsugpo ng damo</MenuItem>
                      <MenuItem onClick={() => scrollToRef(lupaRef)}>Pagaabono</MenuItem>
                      <MenuItem onClick={() => scrollToRef(lupaRef)}>Pagpapabulaklak</MenuItem>
                      <MenuItem onClick={() => scrollToRef(lupaRef)}>Mga Peste</MenuItem>
                      <MenuItem onClick={() => scrollToRef(lupaRef)}>Paraan ng pagpapalaki</MenuItem>
                      <MenuItem onClick={() => scrollToRef(lupaRef)}>Pagaani ng bunga</MenuItem>
                      <MenuItem onClick={() => scrollToRef(lupaRef)}>Pagaani ng dahon</MenuItem>
                      <MenuItem onClick={() => scrollToRef(lupaRef)}>Paraan ng paghanda ng pinya</MenuItem>
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
        <div ref={uriRef}>
          <Uri />
        </div>
        <div ref={piliRef}>
          <Pili />
        </div>
        <div ref={lupaRef}>
          <Lupa />
        </div>
        <div ref={tanimRef}>
          <Tanim />
        </div>
        <div ref={damoRef}>
          <Damo />
        </div>
        <div ref={abonoRef}>
          <Abono />
        </div>
        <div ref={bulaklakRef}>
          <Bulaklak />
        </div>
        <div ref={pesteRef}>
          <Peste />
        </div>
        <div ref={paraanRef}>
          <Paraan />
        </div>
        <div ref={bungaRef}>
          <Bunga />
        </div>
        <div ref={dahonRef}>
          <Dahon />
        </div>
        <div ref={produktoRef}>
          <Produkto />
        </div>
        <div ref={himagasRef}>
          <Himagas />
        </div>
        <div ref={bentaRef}>
          <Benta />
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
  <Box sx={{ fontFamily: 'Helvetica, sans-serif', fontSize: '20px', justifyContent: 'center' }}>
    Ang queen ang pinakamatamis na uri ng pinya sa Pilipinas. Ito ay may matinik na dahon kung ikukumpara sa ibang uri ng pinya. Ang  bunga ang tumitimbang ng halos isang kilo.
    Ang bunga ng queen ay malaki sa gawing puno at paliit sa gawing dulo. Matingkad na kulay dilaw ang balat kung hinog na at ang laman ay malutong. Hindi ito gaanong makatas
    at tamang tama lang sa panlasa at tamis. Napagalaman sa pagsusuri ng DOLE Philippines ma mataas ang taglay na iron, magnesium, potasyum, copper at manganese
    ng Queen kaysa sa Hawaiian.
  </Box>
);
// const pineList = [
//   {
//     url: 'p1.jpg',
//     title: 'Uri ng Pananim',
//     width: '25%',
//     popoverText: 'Ang Korona isang uri ng pananim na nakausbong sa ibabaw ng bunga ng pinya. Ang hapas o aerial suckers ay umuusbong naman sa itaas ng bahagi ng puno ng pinya. At ang suhi o ground suckers ay tumutubo naman sa puno ng pinya na nakadikit sa lupa'
//   },
//   {
//     url: 'p2.jpg',
//     title: 'Large',
//     width: '25%',
//     popoverText: 'This is large'
//   },
//   {
//     url: 'p3.jpg',
//     title: 'Medium',
//     width: '25%',
//     popoverText: 'This is medium'
//   },
//   {
//     url: 'p5.jpg',
//     title: 'Butterball',
//     width: '25%',
//     popoverText: 'This is but'
//   },
// ];

// const Image = styled('span')(({ theme }) => ({
//   position: 'absolute',
//   left: 0,
//   right: 0,
//   top: 0,
//   bottom: 0,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   color: theme.palette.common.white,
// }));
// const ImageButton = styled(ButtonBase)(({ theme }) => ({
//   position: 'relative',
//   height: 200,
//   [theme.breakpoints.down('sm')]: {
//     width: '100% !important', // Overrides inline-style
//     height: 100,
//   },
//   '&:hover, &.Mui-focusVisible': {
//     zIndex: 1,
//     '& .MuiImageBackdrop-root': {
//       opacity: 0.15,
//     },
//     '& .MuiImageMarked-root': {
//       opacity: 0,
//     },
//     '& .MuiTypography-root': {
//       border: '4px solid currentColor',
//     },
//     backgroundColor: 'transparent',
//     borderColor: 'green',
//     color: 'green',
//     '&:hover': {
//       backgroundColor: 'green',
//       borderColor: 'green',
//       color: 'white',
//     },
//   },
// }));


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
      <div style={{ display: 'flex', marginLeft: 15 }}>
        <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700', backgroundColor: 'white' }}>
          KATANGIAN NG PINYANG QUEEN
        </Typography>
      </div>
      {/* <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
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
      </div> */}

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

const Uri = () => {
  return (
    <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700', marginLeft: 15 }}>
      MGA URI NG PANANIM

      <Grid container spacing={2} style={{ marginBottom: 15 }}>
        <Grid item xs={12} md={4} lg={4}>
          <CardActionArea component="a" href="#">
            <Card sx={{ display: 'flex' }}>
              <CardContent sx={{ flex: 1, fontSize: 2 }}>
                <Typography component="h6" variant="h6">
                  Korona
                </Typography>
                <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
                  isang uri ng pananim na nakausbong sa ibabaw ng bunga ng pinya. Karaniwan, ang bawat bunga ay may isa lamang korona.
                  Halos pare-pareho ang gulang nito at ang punong bahagi ay mas malaki at doon lumalabas ang usbong na may maraming ugat.
                  Karaniqang kasama ang korona ng bunga kung ibenta kaya bihira itong gamitin bilang pananim.
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                src={require('../image_src/crown.jpg')}
                alt="Korona Image"
              />
            </Card>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <CardActionArea component="b" href="#">
            <Card sx={{ display: 'flex' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  Hapas o Aerial Suckers
                </Typography>
                <Typography variant="subtitle1" paragraph xs={{ fontSize: 25 }}>
                  Ang hapas o aerial suckers ay umuusbong naman sa taas na bahagi ng puno ng pinya.
                  Maari itong kunin  bilang pantanim mga 3 hanggang 5 buwan matapos anihin ang bunga ng pinya.
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                src={require('../image_src/arial.jpg')}
                alt="Aerial Image"
              />
            </Card>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <CardActionArea component="c" href="#">
            <Card sx={{ display: 'flex' }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                  Suhi o Ground Suckers
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  Ang suhi o ground suckers ay tumutubo naman sa puno ng pinya na nakadikit sa lupa. Makukuha ito bilang pantanim kasabay ng hapas.
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                src={require('../image_src/ground.jpg')}
                alt="Ground Image"
              />
            </Card>
          </CardActionArea>
        </Grid>
      </Grid>
    </Typography>
  );
}
const Pili = () => {
  return (
    <Grid sx={{ marginBottom: 3}} item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGPILI AT PAGHAHANDA NG PANTANIM
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              <pre> {'Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga sa panahon ng pag-ani. \n Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking semilya sapagkat namumulaklak ito ng maaga.\n  Subalit iwasan din naman ang sobrang maliit dahil mahinang klase din ang bunga nito. \n\n Kung korona ang gagamitin bilang pantanim iwasan gamitin ang doble o kumpol-kumpol na korona. \n Iwasan na gamitin ang sirang ubod na korona. \n\n Ikalat ang semilyang pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. \n Sa ganitong paraan, mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit'}  </pre>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Lupa = () => {
  return (
    <Grid sx={{ marginBottom: 3}}  item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGHAHANDA NG LUPA
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              Mahalagang maayos at maihandang mabuti ang lupang tataniman ng pinya. Kailangan itong bungkalin at suyuin ng husto upang makasigurong normal ang paglaki ng halaman. Sundin ang mga sumusunod: 
              <li>Linisi ang lugar na tataniman. Tabasin ang mga malalagong damo o kaya'y gumamit ng gamot na pamatay damo.</li>
              <li>Alisin ang mga halamang hindi kailangan. Bunutin ang mga ugat at tuod</li>
              <li> Araruhin ang lugar na malinis na at makalipas ang 7 hanggang 10 araw araruhin ulit</li>
             Mas mabuting ihanda ang lupa bago sumapit ang tag-ulan. Mas madaling araruhin at suyurin ang lupa sa ganitong panahon. Kung ang lupa ay maputik at naiipon ang tubig maglagay ng tubig daluyan o kanal.
             Maari din gumawa ng kama-kama para doon itanim ang pinya.
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  )
}
const Tanim = () => {
  return (
    <Grid sx={{ marginBottom: 3}} item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGTATANIM
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              itanim ang pinya sa umpisa ng tag-ulan. Doon sa mga lugar na may regular na distribution ng ulan maaring itanim ang pinya ano mang oras
              basta nakahanda ang pantanim. Sundin ang mga sumusunod:
              <li>Kung ang pinyang queen ay itatanim bilang sali-tanim sa niyugan, mabuting planuhin ang mga daanan sa paglabas ng mga inang niyog.</li>
              <li> Hakutin ang pantanim sa lupang tataniman. Tantiyahin ang tamang bilang ng pantanim na hahakutin.</li>
              <li>Pagsama-samahin ang mga pantanim na makakasinlaki.</li>
              <li>Sa pagtatanim maaring sundin ang tinatawag na 'single row' o isag linya na may agwat na 70-100 sentimetro ang bawat linya at 30 sentimetro ang pagitan ng bawat puno.</li>
              <li>Maari din sundin ang tinatawag na 'double row' o dalawahang linya na may agwat na 80-100 sentimetro ang pagitan ng dalawang linya at 50 sentimetro sa loob ng dalawang linya</li>
              <li> Iwasan na malagyan ng lupa ang ubod ng pantanim. Ito ay maaring pagsimulan ng sakit at pagkabulok.</li>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Damo = () => {
  return (
    <Grid sx={{marginBottom:10}}item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGSUGPO NG DAMO
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
            <p>May dalawang paraan ng pagsugpo ng damo sa taniman ng pinya - ang paggamit ng kemikal at ang paggamaso pagpunot ng damo, Bagamat epektibo ang bawat isa mas mabuting pagsamahin ang dalawang paraan upang mas lalong epektibong masugpo ang damo.</p>
            <p> Narito ang ilang mga hakbang: </p>
            <li>Araruhin at suyurin ang lupang tataniman. Higit na kapaki-pakinabang kung ang bawat pag-aararo at pag-suyud ay ginagwa makalipasang 7 hanggang 10 araw.</li>
            <li>Maari din mag-spray ng 'Power' sa lupang tataniman makalipas ang 7-10 araw matapos ang pag-bubungkal.</li>
            <li>Ang ib pang damo ay maaring puksain ng 'pre-emergence' na pamatay damo tulad ng Karmex at Diuron. Ang mga ito ay mas mabisa at matipid kung gagamitin bilang pambomba sa damo 7 hanggang 10 araw pagkatanim. Maliban dito, pinapatay nito ang mga Damosa mga murang ugat at usbong ng mga ito.</li>
            <p>Subalit, hindi ito maaring gamitin kung masyado nang malago ang mga damo. Kapag ito ay ibinomba ng hindi tama sa panahon maaring magdulot ito ng paninilaw ng dahon at tuluyang pagkalanta ng tanim. 
              Maliban na lamang kung ang gamot ay direktang i-spray sa damo. Kung sakaling ganito ang paggamit maghalo ng 'sticker' katulad ng hoestick o sabon sa solusyon. </p>
            <p>Kung ang tanim ay malago na ang mga damong tumutubo tulad ng agingay ay maaring sugpuin ng Onecide., isang uri ng pamatay damo na maaring ibomba ano man oras pagkatanim. Ang kogon naman ay maaring puksain ng 'round-up o power' bago itanim ang pinya.</p>
            <p>Ang paggamit ng gamot ay suplemento lamang sa karaniwang paraan na pagalis ng damo.</p>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Abono = () => {
  return (
    <Grid item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGPILI AT PAGHAHANDA NG PANTANIM
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              <pre> {'Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga sa panahon ng pag-ani. \n Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking semilya sapagkat namumulaklak ito ng maaga.\n  Subalit iwasan din naman ang sobrang maliit dahil mahinang klase din ang bunga nito. \n\n Kung korona ang gagamitin bilang pantanim iwasan gamitin ang doble o kumpol-kumpol na korona. \n Iwasan na gamitin ang sirang ubod na korona. \n\n Ikalat ang semilyang pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. \n Sa ganitong paraan, mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit'}  </pre>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Bulaklak = () => {
  return (
    <Grid  item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGPILI AT PAGHAHANDA NG PANTANIM
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              <pre> {'Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga sa panahon ng pag-ani. \n Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking semilya sapagkat namumulaklak ito ng maaga.\n  Subalit iwasan din naman ang sobrang maliit dahil mahinang klase din ang bunga nito. \n\n Kung korona ang gagamitin bilang pantanim iwasan gamitin ang doble o kumpol-kumpol na korona. \n Iwasan na gamitin ang sirang ubod na korona. \n\n Ikalat ang semilyang pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. \n Sa ganitong paraan, mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit'}  </pre>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Peste= () => {
  return (
    <Grid sx={{ marginBottom: 15 }} item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGPILI AT PAGHAHANDA NG PANTANIM
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              <pre> {'Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga sa panahon ng pag-ani. \n Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking semilya sapagkat namumulaklak ito ng maaga.\n  Subalit iwasan din naman ang sobrang maliit dahil mahinang klase din ang bunga nito. \n\n Kung korona ang gagamitin bilang pantanim iwasan gamitin ang doble o kumpol-kumpol na korona. \n Iwasan na gamitin ang sirang ubod na korona. \n\n Ikalat ang semilyang pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. \n Sa ganitong paraan, mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit'}  </pre>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Paraan= () => {
  return (
    <Grid sx={{ marginBottom: 15 }} item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGPILI AT PAGHAHANDA NG PANTANIM
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              <pre> {'Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga sa panahon ng pag-ani. \n Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking semilya sapagkat namumulaklak ito ng maaga.\n  Subalit iwasan din naman ang sobrang maliit dahil mahinang klase din ang bunga nito. \n\n Kung korona ang gagamitin bilang pantanim iwasan gamitin ang doble o kumpol-kumpol na korona. \n Iwasan na gamitin ang sirang ubod na korona. \n\n Ikalat ang semilyang pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. \n Sa ganitong paraan, mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit'}  </pre>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Bunga = () => {
  return (
    <Grid sx={{ marginBottom: 15 }} item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGPILI AT PAGHAHANDA NG PANTANIM
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              <pre> {'Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga sa panahon ng pag-ani. \n Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking semilya sapagkat namumulaklak ito ng maaga.\n  Subalit iwasan din naman ang sobrang maliit dahil mahinang klase din ang bunga nito. \n\n Kung korona ang gagamitin bilang pantanim iwasan gamitin ang doble o kumpol-kumpol na korona. \n Iwasan na gamitin ang sirang ubod na korona. \n\n Ikalat ang semilyang pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. \n Sa ganitong paraan, mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit'}  </pre>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Dahon = () => {
  return (
    <Grid sx={{ marginBottom: 15 }} item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGPILI AT PAGHAHANDA NG PANTANIM
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              <pre> {'Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga sa panahon ng pag-ani. \n Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking semilya sapagkat namumulaklak ito ng maaga.\n  Subalit iwasan din naman ang sobrang maliit dahil mahinang klase din ang bunga nito. \n\n Kung korona ang gagamitin bilang pantanim iwasan gamitin ang doble o kumpol-kumpol na korona. \n Iwasan na gamitin ang sirang ubod na korona. \n\n Ikalat ang semilyang pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. \n Sa ganitong paraan, mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit'}  </pre>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Produkto = () => {
  return (
    <Grid sx={{ marginBottom: 15 }} item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGPILI AT PAGHAHANDA NG PANTANIM
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              <pre> {'Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga sa panahon ng pag-ani. \n Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking semilya sapagkat namumulaklak ito ng maaga.\n  Subalit iwasan din naman ang sobrang maliit dahil mahinang klase din ang bunga nito. \n\n Kung korona ang gagamitin bilang pantanim iwasan gamitin ang doble o kumpol-kumpol na korona. \n Iwasan na gamitin ang sirang ubod na korona. \n\n Ikalat ang semilyang pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. \n Sa ganitong paraan, mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit'}  </pre>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Himagas = () => {
  return (
    <Grid sx={{ marginBottom: 15 }} item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGPILI AT PAGHAHANDA NG PANTANIM
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              <pre> {'Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga sa panahon ng pag-ani. \n Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking semilya sapagkat namumulaklak ito ng maaga.\n  Subalit iwasan din naman ang sobrang maliit dahil mahinang klase din ang bunga nito. \n\n Kung korona ang gagamitin bilang pantanim iwasan gamitin ang doble o kumpol-kumpol na korona. \n Iwasan na gamitin ang sirang ubod na korona. \n\n Ikalat ang semilyang pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. \n Sa ganitong paraan, mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit'}  </pre>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Benta = () => {
  return (
    <Grid sx={{ marginBottom: 15 }} item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGPILI AT PAGHAHANDA NG PANTANIM
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              <pre> {'Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga sa panahon ng pag-ani. \n Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking semilya sapagkat namumulaklak ito ng maaga.\n  Subalit iwasan din naman ang sobrang maliit dahil mahinang klase din ang bunga nito. \n\n Kung korona ang gagamitin bilang pantanim iwasan gamitin ang doble o kumpol-kumpol na korona. \n Iwasan na gamitin ang sirang ubod na korona. \n\n Ikalat ang semilyang pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. \n Sa ganitong paraan, mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit'}  </pre>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
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

