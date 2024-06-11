import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ImageList, Modal } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
import Footer  from "./Footer";

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
                      <MenuItem onClick={() => scrollToRef(abonoRef)}>Pagaabono</MenuItem>
                      <MenuItem onClick={() => scrollToRef(bulaklakRef)}>Pagpapabulaklak</MenuItem>

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
                      <MenuItem onClick={() => scrollToRef(pesteRef)}>Mga Peste</MenuItem>
                      <MenuItem onClick={() => scrollToRef(paraanRef)}>Paraan ng pagpapalaki</MenuItem>
                      <MenuItem onClick={() => scrollToRef(bungaRef)}>Pagaani ng bunga</MenuItem>
                      <MenuItem onClick={() => scrollToRef(dahonRef)}>Pagaani ng dahon</MenuItem>
                      <MenuItem onClick={() => scrollToRef(paraanRef)}>Paraan ng paghanda ng pinya</MenuItem>
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
              {/* <Container component='main' maxWidth='xs'>
                <CssBaseline /> */}
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
                {/* <Box sx={{width:25, height:25, justifyContent:'center', alignItems:'center'}}>
                    <img src={require('../image_src/pinyatamap-logo.png')}/>
                  </Box> */}
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
              {/* </Container> */}
            </Modal>
          </div>
        </div>
        <div ref={opagRef}>
          <Opag />
        </div>
        <div ref={aboutRef}>
          <About />
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
    url: 'gov.jpg',
    title: "Hon. Ricarte R. Padilla",
    text: "Camarines Norte Governor"
  },
  {
    url: "abad.png",
    title: "Engr. Almirante A. Abad",
    text: "Provincial Agriculturist"
  },
  {
    url: "marilyn.jpg",
    title: "Marilyn C. Pauto",
    text: "Supervising Agriculturist -CROPS Division"
  },
  {
    url: "rowil.png",
    title: "Rowil B. Diaz",
    text: "Agriculturist II/ Provincial Pineapple Coordinator "
  }
]
const Opag = () => {
  return (
    <div className="text-center" style={{ backgroundColor: 'white', padding:5}}>
      <div >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700', backgroundColor: 'white', marginTop: 20 }}>
            OFFICE OF THE PROVINCIAL AGRICULTURIST
          </Typography>
        </div>
        <ImageList sx={{ width: '100%', }} cols={4} >
          {
            aboutList.map((about) => (
              <div key={`${about.title}-${about.text}`} >
                <img
                  src={require(`../image_src/${about.url}`)}
                  style={{
                    borderRadius: '50%',
                    width: '50%',
                    height: '50%',
                    objectFit: 'cover',

                  }} />
                <h3 style={{ fontFamily: 'Arial, Helvetica, sans-seri', fontWeight: 'bold', padding: 5 }}>{about.title}</h3>
                <p style={{ fontFamily: 'monospace' }}>{about.text}</p>
              </div>
            ))
          }
        </ImageList>
      </div>
    </div>
  )
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

const Information = ({ cName }) => (
  <Box sx={{ fontFamily: 'monospace', fontSize: '20px', justifyContent: 'center' }}>
    Ang queen ang pinakamatamis na uri ng pinya sa Pilipinas. Ito ay may matinik na dahon kung ikukumpara sa ibang uri ng pinya. Ang  bunga ang tumitimbang ng halos isang kilo.
    Ang bunga ng queen ay malaki sa gawing puno at paliit sa gawing dulo. Matingkad na kulay dilaw ang balat kung hinog na at ang laman ay malutong. Hindi ito gaanong makatas
    at tamang tama lang sa panlasa at tamis. Napagalaman sa pagsusuri ng DOLE Philippines ma mataas ang taglay na iron, magnesium, potasyum, copper at manganese
    ng Queen kaysa sa Hawaiian.
  </Box>
);
function nutrition(nutrients, amount) {
  return { nutrients, amount }
}

const r = [
  nutrition('ph', 3.45),
  nutrition('Soluble solids', 16.8),
  nutrition('Acidity (%)', 0.45),
  nutrition('Unsoluble solids', 5.13),
  nutrition('Color,ppm beta carotene', 5.13),
  nutrition('Essence,ppm', 127.50),
  nutrition('Vitamin A', '15 i.u.'),
  nutrition('Vitamin C', '21 mg'),
  nutrition('Phosphorus', '19 mg'),
  nutrition('Carbohydrates', '13 mg'),
  nutrition('calium', '19 mg'),
  nutrition('Sugar ang malaking bahagi ng prutas'),
]
const imageMenu = [
  {
    url: 'uri.jpg',
    title: 'MGA URI NG PANANIM',
    content: '',
    additionalContent: [
      'Korona - isang uri ng pananim na nakausbong sa ibabaw ng bunga ng pinya. Karaniwan ang bawat bunga ay may isa lamang korona.',
      'Hapas o Aerial Suckers - Ang hapas o aerial suckers ay umuusbong naman sa taas na bahagi ng puno ng pinya. Maari itong kunin bilang pantanim mga 3 hanggang 5 buwan matapos anihin ang bunga ng pinya.',
      'Suhi o Ground Suckers - Ang suhi o ground suckers ay tumutubo naman sa puno ng pinya na nakadikit sa lupa. Makukuha ito bilang pantanim kasabay ng hapas.'
    ],
    width: '20%',
  },

  {
    url: 'tanim.jpg',
    title: 'PAGPILI AT PAGHAHANDA NG PANTANIM',
    content: ' Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga sa panahon ng pag-ani. Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking semilya sapagkat namumulaklak ito ng maaga.  Subalit iwasan din naman ang sobrang maliit dahil mahinang klase din ang bunga nito. Kung korona ang gagamitin bilang pantanim iwasan gamitin ang doble o kumpol-kumpol na korona. Iwasan na gamitin ang sirang ubod na korona. Ikalat ang semilyang pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. Sa ganitong paraan, mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit',
    additionalContent: [],
    width: '20%',
  },
  {
    url: 'planting.jpg',
    title: 'PAGTATANIM',
    content: ' Itanim ang pinya sa umpisa ng tag-ulan. Doon sa mga lugar na may regular na distribution ng ulan maaring itanim ang pinya ano mang oras basta nakahanda ang pantanim. Sundin ang mga sumusunod:',
    additionalContent: [
      'Kung ang pinyang queen ay itatanim bilang sali-tanim sa niyugan, mabuting planuhin ang mga daanan sa paglabas ng mga inang niyog.',
      'Hakutin ang pantanim sa lupang tataniman. Tantiyahin ang tamang bilang ng pantanim na hahakutin.',
      'Pagsama-samahin ang mga pantanim na makakasinlaki.',
      'Sa pagtatanim maaring sundin ang tinatawag na single row o isag linya na may agwat na 70-100 sentimetro ang bawat linya at 30 sentimetro ang pagitan ng bawat puno.',
      'Maari din sundin ang tinatawag na double row o dalawahang linya na may agwat na 80-100 sentimetro ang pagitan ng dalawang linya at 50 sentimetro sa loob ng dalawang linya',
      'Iwasan na malagyan ng lupa ang ubod ng pantanim. Ito ay maaring pagsimulan ng sakit at pagkabulok.'
    ],
    width: '20%',
  },
  {
    url: 'prep.jpg',
    title: 'PAGHAHANDA NG LUPA',
    content: ' Mahalagang maayos at maihandang mabuti ang lupang tataniman ng pinya. Kailangan itong bungkalin at suyuin ng husto upang makasigurong normal ang paglaki ng halaman. Mas mabuting ihanda ang lupa bago sumapit ang tag-ulan. Mas madaling araruhin at suyurin ang lupa sa ganitong panahon. Kung ang lupa ay maputik at naiipon ang tubig maglagay ng tubig daluyan o kanal. Maari din gumawa ng kama-kama para doon itanim ang pinya. Sundin ang mga sumusunod:',
    additionalContent: ['Linisin ang lugar na tataniman. Tabasin ang mga malalagong damo o kayay gumamit ng gamot na pamatay damo.',
      'Alisin ang mga halamang hindi kailangan. Bunutin ang mga ugat at tuod',
      ' Araruhin ang lugar na malinis na at makalipas ang 7 hanggang 10 araw araruhin ulit'
    ],
    width: '20%',
  },
  {
    url: 'damo.jpg',
    title: 'PAGSUGPO NG DAMO',
    content: 'May dalawang paraan ng pagsugpo ng damo sa taniman ng pinya - ang paggamit ng kemikal at ang paggamaso pagpunot ng damo, Bagamat epektibo ang bawat isa mas mabuting pagsamahin ang dalawang paraan upang mas lalong epektibong masugpo ang damo. Narito ang ilang mga hakbang:',
    additionalContent: [
      'Araruhin at suyurin ang lupang tataniman. Higit na kapaki-pakinabang kung ang bawat pag-aararo at pag-suyud ay ginagwa makalipasang 7 hanggang 10 araw.',
      'Maari din mag-spray ng Power sa lupang tataniman makalipas ang 7-10 araw matapos ang pag-bubungkal.',
      'Ang iba pang damo ay maaring puksain ng pre-emergence na pamatay damo tulad ng Karmex at Diuron. Ang mga ito ay mas mabisa at matipid kung gagamitin bilang pambomba sa damo 7 hanggang 10 araw pagkatanim. Maliban dito, pinapatay nito ang mga Damosa mga murang ugat at usbong ng mga ito.',
      'Subalit, hindi ito maaring gamitin kung masyado nang malago ang mga damo. Kapag ito ay ibinomba ng hindi tama sa panahon maaring magdulot ito ng paninilaw ng dahon at tuluyang pagkalanta ng tanim. Maliban na lamang kung ang gamot ay direktang i-spray sa damo. Kung sakaling ganito ang paggamit maghalo ng sticker katulad ng hoestick o sabon sa solusyon. Kung ang tanim ay malago na ang mga damong tumutubo tulad ng agingay ay maaring sugpuin ng Onecide., isang uri ng pamatay damo na maaring ibomba ano man oras pagkatanim. Ang kogon naman ay maaring puksain ng round-up o power bago itanim ang pinya. Ang paggamit ng gamot ay suplemento lamang sa karaniwang paraan na pagalis ng damo.'
    ],
    width: '20%',
  },
]

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensures the image covers the entire box without stretching
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


// const ImageSrc = styled('span')({
//   position: 'absolute',
//   left: 0,
//   right: 0,
//   top: 0,
//   bottom: 0,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center 40%',
// });

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

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));
const ModalContent = styled('div')({
  position: 'absolute',
  width: '80%',
  height: '80%',
  backgroundColor: 'white',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
});
const About = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalContent, setModalContent] = useState('');

  const openModal = (image) => {
    setSelectedImage(image);
    setModalContent(image.content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalContent('');
    setModalOpen(false);
  };
  return (
    <>
      <div style={{ backgroundColor: 'white', paddingLeft: 5, paddingRight: 5 }}>
        <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700', backgroundColor: 'white', marginLeft: 15 }}>
          KATANGIAN NG PINYANG QUEEN
        </Typography>

        <div className='about' >
          <div className='about-col-one' >
            <div><Information cName='about-text' /></div>
            <div >
              <Accordion style={{ borderColor: 'green', marginTop: 10 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <b>Ayon pa rin sa Food and Nutrition Research Institute ito ay nagtataglay ng mga sumusunod:</b>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper} sx={{ width: '100%', height: '50%' }}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Nutrients</TableCell>
                          <TableCell align="right">Amount</TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {r.map((row) => (
                          <TableRow
                            key={row.nutrients}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.nutrients}
                            </TableCell>
                            <TableCell align="right">{row.amount}</TableCell>

                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                >
                  <b>Ang Bureau of Agricultural Fishery Products Standards ay nagpalabas ng sumusunod na klasipikasyon base sa timbang ng pinyangqueen kasama ang korona.</b>
                </AccordionSummary>
                <AccordionDetails>
                  <p>Extra Large: (mahigit 1,000g)</p>
                  <p>Large: (850-1,000g)</p>
                  <p>Medium: (700-850g)</p>
                  <p>Small: (550-700g)</p>
                  <p>Butterball: (below 550g)</p>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div className='about-col-two'>
            <Images imagesList={imagesList} />
          </div>
        </div>
      </div>
      <div>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%', height: '25%' }}>
          {imageMenu.map((image) => (
            <ImageButton
              focusRipple
              key={image.title}
              style={{
                width: image.width,
              }} onClick={() => openModal(image)}
            >
              <img src={require(`../image_src/${image.url}`)} alt={image.title}
                component='span'
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 40%',
                }}
              />
              <ImageBackdrop className="MuiImageBackdrop-root" />
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
                  {image.title}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          ))}
        </Box>
      </div>
      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalContent>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedImage ? selectedImage.title : ''}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedImage ? selectedImage.content : ''}
            <ul>
              {selectedImage && selectedImage.additionalContent.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </Typography>
        </ModalContent>

      </Modal >
    </>
  );
};


const Uri = () => {
  return (
    <div style={{ backgroundColor: 'orange', paddingBottom: 10, display: 'flex', flexDirection: 'column', marginBottom: 10 }}>
      <Typography style={{ color: 'white', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700', marginLeft: 15, paddingTop: 10 }}>
        MGA URI NG PANANIM
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <div className='about-col-one' style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
          <div styles={{ fontSize: '25px' }}>
            <li><b>Korona</b>- isang uri ng pananim na nakausbong sa ibabaw ng bunga ng pinya. Karaniwan, ang bawat bunga ay may isa lamang korona.
              Halos pare-pareho ang gulang nito at ang punong bahagi ay mas malaki at doon lumalabas ang usbong na may maraming ugat.
              Karaniqang kasama ang korona ng bunga kung ibenta kaya bihira itong gamitin bilang pananim.
            </li>
            <li><b>Hapas o Aerial Suckers</b>- Ang hapas o aerial suckers ay umuusbong naman sa taas na bahagi ng puno ng pinya.
              Maari itong kunin  bilang pantanim mga 3 hanggang 5 buwan matapos anihin ang bunga ng pinya.</li>
            <li><b>Suhi o Ground Suckers</b>-  Ang suhi o ground suckers ay tumutubo naman sa puno ng pinya na nakadikit sa lupa. Makukuha ito bilang pantanim kasabay ng hapas.</li>
          </div>
        </div>
        <div className='about-col-two' style={{ flex: 1 }}>
          <img src={require('../image_src/uri.jpg')} style={{ width: '70%' }} />
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  gridItem: {
    display: 'flex',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
};

const Pili = () => {
  return (
    <div style={styles.container}>
      <Grid container spacing={2} style={{ paddingLeft: 5, paddingRight: 5 }}>
        <Grid item xs={12} md={6} lg={6} style={styles.gridItem}>
          <CardActionArea component="a" href="#">
            <Card sx={styles.card}>
              <CardContent sx={{ flex: 1, fontSize: 2 }}>
                <Typography component="h6" variant="h6" style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
                  PAGPILI AT PAGHAHANDA NG PANTANIM
                </Typography>
                <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
                  Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga sa panahon ng pag-ani. Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking semilya sapagkat namumulaklak ito ng maaga.  Subalit iwasan din naman ang sobrang maliit dahil mahinang klase din ang bunga nito. Kung korona ang gagamitin bilang pantanim iwasan gamitin ang doble o kumpol-kumpol na korona. Iwasan na gamitin ang sirang ubod na korona. Ikalat ang semilyang pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. Sa ganitong paraan, mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={styles.gridItem}>
          <CardActionArea component="b" href="#">
            <Card sx={styles.card}>
              <CardContent sx={{ flex: 1 }}>
                <Typography component="h6" variant="h6" style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
                  PAGHAHANDA NG LUPA
                </Typography>
                <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
                  Mahalagang maayos at maihandang mabuti ang lupang tataniman ng pinya. Kailangan itong bungkalin at suyuin ng husto upang makasigurong normal ang paglaki ng halaman. Sundin ang mga sumusunod:
                  <ul>
                    <li>Linisin ang lugar na tataniman. Tabasin ang mga malalagong damo o kaya'y gumamit ng gamot na pamatay damo.</li>
                    <li>Alisin ang mga halamang hindi kailangan. Bunutin ang mga ugat at tuod</li>
                    <li> Araruhin ang lugar na malinis na at makalipas ang 7 hanggang 10 araw araruhin ulit</li>
                  </ul>
                  Mas mabuting ihanda ang lupa bago sumapit ang tag-ulan. Mas madaling araruhin at suyurin ang lupa sa ganitong panahon. Kung ang lupa ay maputik at naiipon ang tubig maglagay ng tubig daluyan o kanal.
                  Maari din gumawa ng kama-kama para doon itanim ang pinya.
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      </Grid>
    </div>
  );
};


const Tanim = () => {
  return (
    <Grid sx={{ marginBottom: 3, paddingLeft: 5, paddingRight: 5 }} item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1, borderColor: 'orange' }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '10', fontWeight: '700' }}>
              PAGTATANIM
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
              Itanim ang pinya sa umpisa ng tag-ulan. Doon sa mga lugar na may regular na distribution ng ulan maaring itanim ang pinya ano mang oras
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
            src={require('../image_src/tanim.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Damo = () => {
  return (
    <Grid item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex', paddingRight: 5, paddingLeft: 5 }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGSUGPO NG DAMO
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
              <p>May dalawang paraan ng pagsugpo ng damo sa taniman ng pinya - ang paggamit ng kemikal at ang paggamaso pagpunot ng damo, Bagamat epektibo ang bawat isa mas mabuting pagsamahin ang dalawang paraan upang mas lalong epektibong masugpo ang damo.</p>
              <p> Narito ang ilang mga hakbang: </p>
              <li>Araruhin at suyurin ang lupang tataniman. Higit na kapaki-pakinabang kung ang bawat pag-aararo at pag-suyud ay ginagwa makalipasang 7 hanggang 10 araw.</li>
              <li>Maari din mag-spray ng 'Power' sa lupang tataniman makalipas ang 7-10 araw matapos ang pag-bubungkal.</li>
              <li>Ang iba pang damo ay maaring puksain ng 'pre-emergence' na pamatay damo tulad ng Karmex at Diuron. Ang mga ito ay mas mabisa at matipid kung gagamitin bilang pambomba sa damo 7 hanggang 10 araw pagkatanim. Maliban dito, pinapatay nito ang mga Damosa mga murang ugat at usbong ng mga ito.</li>
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
function createData(buwan, abono, dami, bilang) {
  return { buwan, abono, dami, bilang };
}

const rows = [
  createData('1 buwan pagkatanim', 'Ammonium phosphate (16-20-0)', 10, 7),
  createData('', 'Muriate of Potash (0-0-60)', 5, 3.5),
  createData('3 buwan pagkatanim', 'Urea (46-0-0)', 5, 3.5),
  createData('5 buwan pagkatanim', 'Urea (46-0-0)', 5, 3.5),
  createData('7 buwan ppagkatanim', 5, 3.5),
  createData('1 buwan pagkatanim', 'Muriate of Potash (0-0-60)', 5, 3.5),
  createData('Total', '', 35, 24.5),
];

const Abono = () => {
  return (
    <Grid item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex', paddingLeft: 5, paddingRight: 5 }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem' }}>
              PAGAABONO
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }} >
              <div>Kailangan ng pinya ang sapat na dami ng abono para ganap na maganda ang paglaki at pamumunga nito.
                <br /> Dapat alamin ang likas na uaman o katabaan ng lupang tataniman sa pamamagitan ng pagpapasuri ng lupa. Mas higit na epektibo at matipid ang paglalagay ng pataba.
                <br />Sundin ang rekomendasyon ng Solis Laboratory o kaya ang resulta sa soil test kit sa Office ng Municipal Agriculturist.
                <br /> Makakatulong din ang paggamit ng organikong pataba mula 6 hanggang 9 na sako sa bawat ektarya. Iwasan ang mag-abono ng halos isang dakot bawat halaman. Malaking porsiyento ang natatapon
                o nawawala dahil sa pagsingaw o pagka-anod, pagsipsip ng lupa at damo.
                <br /> Upang mapataas ang kalidad ng bunga, gumamit ng tamang timpla ng abono. Ang potasyum ay nakakapagpatamis ng bunga, ang nitroheno naman ay nakakapagpalaki ng puno ay bunga.
                Ang posporus naman ay nakakakapagpalago ng ugat.
                <br /> Kailangan din ng pinya ang iba pang sustansiya tulad ng boron. Lumalaki ang bunga kung magwiwisik ng Borax sa daming 3 gramo bawat litro ng tubig. Puwedeng gamitin mula 5 buwan
                pagkatanim hanggang sa panahon ng pamumulaklak.
                <br /> Mag-abono kung medyo basa ang lupa. Kung mainit at tuyo ang lupa mainam na tunawin ang abono sa tubig at idilig sa puno ng pinya sa daming 40 cc bawat halaman.
                Iwasan malagyan ang dahon dahil maaring masunog ito.
                <br /> Maari ding mag-abono sa panahon ng pamumulaklak. Ito ay nakakapagpalaki ng bunga at suhi.
                <br /> Ilagay ang urea sa bandang puno ng pinya. Ang ammonium phospate at mureate of potasg ay maaring ilagay sa puno ng pinya.</div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" justifyContent='center'>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{color:'orange'}}>Buwan ng Pag-abono</TableCell>
                      <TableCell sx={{color:'orange'}} >Uri ng Abono</TableCell>
                      <TableCell sx={{color:'orange'}}align="center">Dami bawat puno (gramo)</TableCell>
                      <TableCell sx={{color:'orange'}} align="center">Bilang(sako)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.buwan}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.buwan}
                        </TableCell>
                        <TableCell>{row.abono}</TableCell>
                        <TableCell align="center">{row.dami}</TableCell>
                        <TableCell align="center">{row.bilang}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

              </TableContainer>
              <p> Sa halip na urea, puwede ring gamitin ang ammonium sulfate (21-0-0) sa dami na doble sa urea.</p>
              <p> Mas mabuti kung makagawa ng takalan na may daming 5,10,20 gramo upang magamit sa pag-aabono.</p>
            </Typography>
          </CardContent>

        </Card>
      </CardActionArea>
    </Grid>
  );
}
function Data(gamot, dami) {
  return { gamot, dami };
}

const rowsData = [
  Data('Ethrel (480)', '1 Dram (200 liters) Knapsack Sprayer (16 liters)'),
  Data('Urea', '100 ml 4 kg 8 ml 320 g'),

];
const Bulaklak = () => {
  return (
    <Grid item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex', paddingLeft: 5, paddingRight: 5 }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGPAPABULAKLAK
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
              <div>Ang pagpapabulaklak ng pinya na wala sa panahon ay mahalaga dahil napapataas nito ang porsiyento ng pamumulaklak; sabay-sabay ang pamumulaklak;
                maaring mamulaklak kung kailan nais ng magsasaka; matipid at mataas ang kita.
                <br />
                Ang pinya ay maaring pabulaklakin mga 10 hanggang 13 buwan makatapos itanim. Iwasan ang pagpapabunga ng maaga lalo na kung pitong buwan pa lamang
                sapagkat maaring maliliit ang bunga.
                <br />
                Sundin ang mga sumusunod na hakbang:</div>
              <p>1. Maghanda ng ethephon (Ethrel 480), urea, pantakal,timba o timplahang dram at knapsack sprayer.</p>
              <p>Sundin ang timplang 5 cc ethephone + 10 litro ng tubig + 200 gramo ng urea.</p>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Gamot</TableCell>
                      <TableCell  >Dami</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowsData.map((rowsData) => (
                      <TableRow
                        key={rowsData.gamot}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {rowsData.gamot}
                        </TableCell>
                        <TableCell> {rowsData.dami}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <p> 3. Maglagay ng 30 cc sa ubod ng bawat puno halaman.</p>
              <p> 4. Maglagay ng pampabulaklak sa bandang hapon upang mataas ang porsiyento ng pamumulaklak.</p>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/Flower.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Peste = () => {
  return (
    <Grid >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700', marginLeft: 15, paddingLeft: 5, paddingRight: 5 }}>
              MGA PESTE NG PINYA
              <Grid container spacing={2} style={{ marginBottom: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={2} marginBottom={5} marginTop={5}>
                  {/* First Grid item */}
                  <Grid item xs={12} md={6}>
                    <CardActionArea component="a" href="#">
                      <Card sx={{ display: 'flex' }}>
                        <CardContent sx={{ flex: 1, fontSize: 2 }}>
                          <Typography component="h6" variant="h6">
                            Mealybugs
                          </Typography>
                          <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
                            <p>Ito'y isang insektong sumisipsip ng katas ng mga murang dahon at mga dahong nagsisismulang gumulang.</p>
                            <b>Sintomas:</b>
                            <li>Pamumula ng dahon</li>
                            <li>Pagkalanta ng dahon</li>
                            <li>Panunuyo ng malaking bahaging dahong apektado</li>
                            <li>Pagkupas ng berdeng kulay dahon</li>
                            <li>Bansot ang halaman</li>
                            <b>Pagpuksa:</b>
                            <p>Ang mealybugs ay nabubuhay kasam ng mga langgam. Ang langgam ang naglilipat sa mga ito sa mga malulusog na bahagi ng halaman.</p>
                            <li>Paggamit ng 'mealybug-free' na pananim</li>
                            <li>Mag-gpray ng 1-1.4ml./li ng Malathion o Diazinon</li>
                            <li>Puksain ang mga langgam na nagkakalat ng peste sa pamamagitan ng pagbobomba ng Sumicidin sa border area na may 4-6 na tudling.</li>
                          </Typography>
                        </CardContent>
                        <CardMedia
                          component="img"
                          sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                          src={require('../image_src/mealybug.jpg')}
                          alt="Korona Image"
                        />
                      </Card>
                    </CardActionArea>
                  </Grid>

                  {/* Second Grid item */}
                  <Grid item xs={12} md={6}>
                    <CardActionArea component="b" href="#">
                      <Card sx={{ display: 'flex' }}>
                        <CardContent sx={{ flex: 1, fontSize: 2 }}>
                          <Typography component="h2" variant="h5">
                            Butt Rot
                          </Typography>
                          <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
                            <b>Sintomas</b>
                            <li>Pagkabulok ng gawing puno ng halaman</li>
                            <li>Pagkalanta ng buong halaman</li>
                            <li>Biglaang pagkamatay ng halaman</li>
                            <b>Pagpuksa/pag-iwas</b>
                            <li>Iwasan na magkasugat ang halaman upang hindi makapasok ang fungus na nagdudulot ng sakit</li>
                            <li>Maari ding ilubog ang puno ng halaman sa 2.5 gramo bawat litro ng Aliette solusyon habang sariwa pa ang sugat.</li>
                          </Typography>
                        </CardContent>
                        <CardMedia
                          component="img"
                          sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                          src={require('../image_src/buttrot.jpg')}
                          alt="Aerial Image"
                        />
                      </Card>
                    </CardActionArea>
                  </Grid>
                </Grid>

                <Grid marginBottom={5}>
                  <CardActionArea component="c" href="#">
                    <Card sx={{ display: 'flex' }}>
                      <CardContent sx={{ flex: 1, fontSize: 2 }}>
                        <Typography component="h2" variant="h5">
                          Fruit Core Rot
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          <p>Ang sakit na ito ay dulot ng fungus. Ito ay labis na nagpapababa ng kalidad ng bunga ng pinya. </p>
                          <b>Sintomas:</b>
                          <li>Berde at maliit ang bunga</li>
                          <li>Lubog ang mata ng apektadong bunga na kulay brown</li>
                          <li>Kapag hiniwa ang apektadong bahagi ay nangingitim, matigas, basa at nabubulok</li>
                          <b>Pagpuksa/pag-iwas:</b>
                          <li>Panatilihing tama ang dami ng N, P at K.</li>
                          <li>Mag-bomba ng 1-1.4 m/li ng malathion o kaya 0.1% Diazinon laban sa mealybugs na gumagawa ng butas o sira sa pinya na maaring pasukan ng fungus.</li>
                          <li>iwasan ang pagtanggal ng ubod ng korona sa panahon ng tag-ulan.</li>
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                        src={require('../image_src/fruit core rot.jpg')}
                        alt="Ground Image"
                      />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid marginBottom={5}>
                  <CardActionArea component="c" href="#">
                    <Card sx={{ display: 'flex' }}>
                      <CardContent sx={{ flex: 1, fontSize: 2 }}>
                        <Typography component="h2" variant="h5">
                          Heart Rot
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          <p>Ang sakit na ito ay dulot ng fungus at karaniwang pinapatay nito ang bagong tanim na halaman. </p>
                          <b>Sintomas:</b>
                          <li>Paninilaw o pamumula ng dahon ng halaman sa gitna</li>
                          <li>Pagkalanta ng mga gilid (margins) ng dahon</li>
                          <li>Ang puno ng dahon ay nalilinaw hanggang kumupas maging puti, malambot at basa na kulay na kape ang gilid.
                            Madaling matanggal ang ganitong dahon sa puno
                          </li>
                          <li>May mabahong amoy</li>
                          <b>Pagpuksa/pag-iwas:</b>
                          <li>Siguradong maayos ang labasan ng tubig</li>
                          <li>Itaas hanggang 25cm ang taniman kung laganap ang sakit</li>
                          <li>Maglagay ng kulob o mulch kung ginawang 25cm ang taas ng taniman</li>
                          <li>Magtanim sa panahon ng tag-araw</li>
                          <li>Illubog ang pananim ng ilang minuto sa 8-10 g/li solusyon ng Difoltan o 2.5 g/li ng Aliette.</li>
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                        src={require('../image_src/heart rot.jpg')}
                        alt="Ground Image"
                      />
                    </Card>
                  </CardActionArea>
                </Grid>
                <Grid >
                  <CardActionArea component="c" href="#">
                    <Card sx={{ display: 'flex' }}>
                      <CardContent sx={{ flex: 1, fontSize: 2 }}>
                        <Typography component="h2" variant="h5">
                          Daga
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          <b>Pinsala:</b>
                          <li>Kinakain ang prutas, murang dahon at ubod ng halaman</li>
                          <b>Pagpuksa/pag-iwas</b>
                          <li>Paglagay ng pain o lason ng Racumin. Ito ay maaring ihalo sa bigas at ikalat sa taniman. Maari din itong ilagay sa bunot ng niyog o kawayan na may butas.</li>
                          <li>Panatilihing malinis ang taniman</li>
                          <li></li>
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                        src={require('../image_src/mouse.jpg')}
                        alt="Ground Image"
                      />
                    </Card>
                  </CardActionArea>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Paraan = () => {
  return (
    <Grid >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PARAAN NG PAGPAPALAKI NG BUNGA SA PANAHON NG PAMUMULAKLAK NG PINYA
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
              <p>Maaring palakihin ang bunga ng mga pinya kahit sa panahon na ito ng pamumulaklak. Sundin ang sumusunod:</p>
              <Grid xs={12} md={6} lg={4}>
                <CardActionArea component="a" href="#">
                  <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
                        <p>Maglagay ng abono sa simula ng pamulaklak o red bud stage. May malaking epekto ang paglagay ng hinalong 5 gramo ng urea ng pamulaklak o red bud stage.
                          Matipid subalit malaki ang epekto lalo na sa mga lupang matagal lalo na sa mga lupang matagal ng tinaniman ng pinya. </p>
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                      src={require('../image_src/Flower.jpg')}
                      alt="Korona Image"
                    />
                  </Card>
                </CardActionArea>
              </Grid>
              <Grid xs={12} md={6} lg={4}>
                <CardActionArea component="b" href="#">
                  <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
                        <p>Alisin ang korona isang linggo matapos ang pamulaklak o dry petal stage. Mas lalong lumalaki ang bunga at maikli ang tubo ng korona. Huwag isasagad ang pag-alis ng korona sa bunga. Gawin ito
                          kung mainit ang panahon upang hindi ito tamaan ng sakit. Dahil ang sugat sa gawa sa pag-alis ng korona ay maaring maging sanhi o pagmulan ng sakit.
                        </p>
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                      src={require('../image_src/p.jpg')}
                      alt="Korona Image"
                    />
                  </Card>
                </CardActionArea>
              </Grid>
              <Grid xs={12} md={6} lg={4}>
                <CardActionArea component="b" href="#">
                  <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" paragraph sx={{ fontSize: 20 }}>
                        <p>Pag-spray ng Gibberellic acid pagkatapos ng pamumulaklak o dry petal stage. Gamitin ang timplang 1/2 o 3/4 tablet ng Berelex sa bawat sprayer load (16 litro ng tubig)
                          at i-spray sa 1,000 bunga ng pinya. Siguruhin na basa ang lahat ng bahagi ng bunga ngunit iwasan na matamaan ang korona. Mag-ispray sa umaga o hapon upang mas higit na mabisa.
                        </p>
                      </Typography>
                    </CardContent>

                  </Card>
                </CardActionArea>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}
function info(index, katangian) {
  return { index, katangian };
}

const laman = [
  info('1', 'Lahat ng mata ay kulay berde at medyo puti ang bracts at tuyo ang mga grooves sa gitna ng una hanggang pangalawang layer o baitang ng mata mula sa ibaiba. Makikita din ang paghihiwalay ng kulay dilaw (magulang na pinya ay maaring i-proseso bilangg dried o gawing kendi ito ang pinaka-angkop na panahon para anihin ang pinya para ma-itabi nang medyo matagal)'),
  info('2', 'Tinatayang 2-3 layers na mata mula sa ibaba ang kulay dilaw angkop itong kainin panghimaga at i-proseso bilang juice at jams'),
  info('3', '50% ng mata ay dilaw'),
  info('4', 'Lagpag 75% ng mata ay dilaw (sobrang hinog)'),
  info('5', 'Buong prutas ay dilaw (sobrang hinog'),
];

const Bunga = () => {
  return (
    <Grid item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAG-ANI NG BUNGA
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
              <p>Ang bunga ng pinya ay maaring anihin 4 1/2 hanggang 5 buwan depende sa panahon at timpla ng ethephon na inilagay sa pagpabulaklak.Medyo matagal anihin kung ginagawa
                sa panahon ng tag-ulan at mababa ang timpla ng pampabulaklak na ginamit.
              </p>
              <p>Mapapanatili ang mataas na kalidad ng inaning pinya kung susundin ang sumusunod:</p>
              <ol style={{ listStyleType: 'circle' }}>
                <li>Ingatan ang bunga sa pag-aani. Iwasang mabugbog ang bunga sa pag-ani at paghakot. Ito ang sanhi ng maagang pagkabulok o reject ng produkto para
                  ipagbili sa ibang bansa
                </li>
                <li>Huwag hayaan madikkit ang inaning bunga sa lupa. Ang dumi na maaring dumikit sa bunga ay maaring maging sanhi ng sakit at madaling pagkasira ng produkto.
                  Gumamit ng pansapin habang inaayos ang produktong inani.
                </li>
                <li>Anihin ang bunga ayon sa  pangangailangan ng mamimili. Gawin ang sapilitang pagpapahinog kung kinakailangan upang sabat at pantay na kulay ng hinog at manibalang (green ripe) pang bunga.
                  Ang sapilitang pagpapahinog ay nakakasira ng kalidad ng prutas kung gagawin sa panahon na hilaw pa ang bunga. Matabang at makati ang lasa ng pinya sapilitang pinahinog ng wala pa sa tamang panahon.
                </li>
                <li>Maaring anihin ang pinya depende sa pangangailangan ng mamimili na ibat-iba ang antas ng pagkahinog tulad ng sumusunod:</li>
                <b>Maturity index ng Pinyang Queen base sa inaprubahan na standards ng BAFPS.</b>
                <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{color:'orange'}}>Kulay ng Balat Index</TableCell>
                        <TableCell sx={{color:'orange'}} align="center">Katangian</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {laman.map((row) => (
                        <TableRow
                          key={row.index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.index}
                          </TableCell>
                          <TableCell >{row.katangian}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

              </ol>
            </Typography>
          </CardContent>

        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Dahon = () => {
  return (
    <Grid item  >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex', paddingLeft: 10 ,paddingTop:3, paddingBottom:3}}>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/crown.jpg')}
            alt="Korona Image"
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAG-ANI NG DAHON NG PINYA
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
              <p>Ang dahon ng pinya ay isa sa pinagkukunan ng magandang uri ng hibla para sa tela at papel. Dagdag na kita ito sa mga magtatanim ng pinya kung aanihin at ipagbibili ang sariwang dahon o kaysa
                pinatuyong hibla. Piliin ang magulang na dahon at walangs sira na may habang dalawang talampakan. Ginagawa ang pag-ani ng dahon matapos anihin ang bunga ng pinya.
              </p>
              <p>Sa halip na tabasin para makagawa ng 'walking alley' o daanan sa pag-ani at pag-hakot ng bunga maaring anihin ang dahon upang ibenta at gawing hibla. Ang mga natitirang dahon
                ay anihin ang dahon upang ibenta at gawing hibla. Ang mga natitirang dahon ay anihin ulit pagkatapos anihin ang mga bunga.
              </p>
              <p>Napag-alaman na ang pag-ani ng dahon ay hindi nakakaapekto sa paglaki ng suhi na gagamitin pantanim.</p>
            </Typography>
          </CardContent>

        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Produkto = () => {
  return (
    <Grid item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              MGA PRODUKTO AT GAMIT NG PINYA
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
              <li>Prutas bilang sangkap sa salad</li>
              <li>Sangkap ito sa paggawa ng ice cream, halo-halo at gelatin</li>
              <li>Palaman sa paggawa ng cake, pies, tarts at tinapay</li>
              <li>Sangkap sa mga lutuing karne, curry at iba pa</li>
              <li>Ginagawang jam, jelly at pure</li>
              <li>Ginagawang juice at iba pang inumin</li>
              <li>Nagawang chunks, sliced or crushed na niluluto sa syrup</li>
              <li>Ginagawang candies</li>
              <li>Ginagawa suka, alak at toyo</li>
              <li>Pinoproseso bilang nata de pina</li>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/product.png')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}
const Himagas = () => {
  return (
    <Grid>
      <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700', marginLeft: 15 }}>
        PARAAN NG PAGHANDA NG PINYA BILANG PANGHIMAGAS O TABLE FRUIT
        <Grid container spacing={2} style={{ padding:10 }}>
          <Grid item xs={6} md={3} lg={3}>
            <CardActionArea component="a" href="#">
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1, fontSize: 2 }}>
                  <Typography component="h6" variant="h6">
                    Alisin ang korona
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                  src={require('../image_src/kor.jpg')}
                  alt="Korona Image"
                />
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <CardActionArea component="b" href="#">
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    Putulin ang prutas ng pahaba
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                  src={require('../image_src/putol.jpg')}
                  alt="Aerial Image"
                />
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <CardActionArea component="c" href="#">
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    Putol-putulin ang pinya at tuklapin sa pamamagitan ng kutsilyo
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                  src={require('../image_src/pahaba.jpg')}
                  alt="Ground Image"
                />
              </Card>
            </CardActionArea>
          </Grid>
          <Grid item xs={6} md={3} lg={3}>
            <CardActionArea component="d" href="#">
              <Card sx={{ display: 'flex' }}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography component="h2" variant="h5">
                    Hiwa-hiwain ng bite size o kayang isubo sa bibig
                  </Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                  src={require('../image_src/bite.jpg')}
                  alt="Ground Image"
                />
              </Card>
            </CardActionArea>
          </Grid>
        </Grid>
      </Typography >
    </Grid>

  );
}
const Benta = () => {
  return (
    <Grid item >
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography style={{ color: 'orange', fontFamily: 'Arial, Helvetica, sans-seri', fontSize: '1.4rem', fontWeight: '700' }}>
              PAGHAHANDA NG PINYANG IBEBENTA SA IBANG BANSA
            </Typography>
            <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
              <li>Piliin ang magandang uri ng bunga depende sa pangangailangan ng bumili.</li>
              <li>Ingatan na hindi magalusan, masugatan at mabugbug ang pinya sa pag-ani at paghakot</li>
              <li>Kung maari ilagay ang inaning pinya sa lalagyan na may sapin na dyaryo</li>
              <li>Ihiwalay o alisin ang mga bunga na may sakit, may aphids o iba pang insekto</li>
              <li>Linisin ang bunga sa pamamagitan ng paggamit ng lumang toothbrush o sipilyo</li>
              <li>Putulin ang tangkay ng pinya.Itira ang kalahating puldgada ng tangkay. <br/> Iwasan na magalusan ang tangkay dahil maaring pasukin ito ng insekto na magdududlot ng sakit at pagkabulok ng pinya.</li>
              <li>Karaniwang nilalagyan ng wax ang pinyang ibinebenta sa ibang bansa.</li>
              <li>Sundin ang tamang timpla sa waxing.</li>
              <li>Gumamit ng sprayer sa waxing para mablis at pantay ang pagkalagay.</li>
              <li>Patuyuin sa hangin sa loob ng dalawang oras bago ilagay sa sisidlang karton.</li>
              <p>Ang paglalagyan ng karton ay dapat may label o impormasyon tulad nito.</p>
              <li>Pangalan ng produkto- nakasaan ang variety</li>
              <li>Grade at laki/ o bilang kung ilang piraso ang laman ng karton</li>
              <li>Net weight o timbang sa kilo</li>
              <li>Pangalan ng producer at exporter</li>
              <li>Dapat may nakasulat na "Product of the Philippines"</li>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src={require('../image_src/bansa.jpg')}
            alt="Korona Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}


function ScreenShots() {
  return (
    <div className='screenshot' id="Gallery" style={{ fontFamily: 'Arial', }}>
      <span>GALLERY</span>
      <ImageGal />
    </div>
  )
}

const agencyList = [
  {
    name: "Camarines Norte",
    logo: "POCN_logo.png",
    url: 'https://www.camsnorte.com'
  },
  {
    name: "OPAG - Cam Norte",
    logo: "OPAG_logo.png",
    url: 'https://www.opagcamnorte.com'
  
  },
  {
    name: "DA - CNLRRS",
    logo: "DOA_logo.png",
    url: 'https://www.da.gov.ph'
  }
]

function Agencies({ agencyList }) {
  const handleClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='agencies' id='Agencies' style={{ fontFamily: 'Arial' }}>
      {agencyList.map(agency => (
        <div 
          className='agency' 
          key={agency.name} 
          onClick={() => handleClick(agency.url)} 
          style={{ cursor: 'pointer' }}
        >
          <img 
            src={require(`../image_src/${agency.logo}`)} 
            alt={agency.name} 
            className="logo-image" 
          />
          <span>{agency.name}</span>
        </div>
      ))}
    </div>
  );
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
    <>
    <div className='contact-sec' id='Contacts'>
      <span>CONTACT US</span>
      <Contact />
    </div>
    <Footer/>
    </>
    //   <Contacts contactList={contactList} />
    // </div>
  )
}

export default Dashboard

