import React from 'react'
import { TableContainer, TableBody, TableCell, Table, TableHead, TableRow } from '@mui/material'
import { Typography, Grid, Paper, Box, Avatar, Card, CardContent, CardActionArea } from '@mui/material'

//images
import Crown from '../../image_src/crown.jpg';
import Aerial from '../../image_src/arial.jpg';
import Ground from '../../image_src/ground.jpg';

function nutrition(nutrients, amount) {
  return { nutrients, amount }
}

//katangian ng pinyang queen
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
const About = () => {
  return (
    <div id="about">
      {/* 1st */}
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src={require('../../image_src/pinya3.jpg')} className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Katangian ng Pinyang Queen</h2>
              <p> Ang queen ang pinakamatamis na uri ng pinya sa Pilipinas. Ito ay may matinik na dahon kung ikukumpara sa ibang uri ng pinya. Ang  bunga ang tumitimbang ng halos isang kilo.
                Ang bunga ng queen ay malaki sa gawing puno at paliit sa gawing dulo. Matingkad na kulay dilaw ang balat kung hinog na at ang laman ay malutong. Hindi ito gaanong makatas
                at tamang tama lang sa panlasa at tamis. Napagalaman sa pagsusuri ng DOLE Philippines ma mataas ang taglay na iron, magnesium, potasyum, copper at manganese
                ng Queen kaysa sa Hawaian.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className="container" style={{marginTop:50}}>
          <div className="section-title">
            <h2>Mga Uri ng Pananim</h2>
          </div>
          <div className="row">
            <Grid container spacing={2}
              sx={{
                display: 'flex',
                '& > :not(style)': {
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                },
              }}
            >
              <Grid item xs={12} md={4} lg={4} >
                <Paper elevation={3} sx={{ backgroundColor: '#07da63' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, }}>
                    <Avatar alt="crown" src={Crown} />

                    <Typography variant="button" display="block" gutterBottom>
                      Korona
                    </Typography>
                    <Typography variant="caption" display="block">
                      isang uri ng pananim na nakausbong sa ibabaw ng bunga ng pinya. Karaniwan, ang bawat bunga ay may isa lamang korona.
                      Halos pare-pareho ang gulang nito at ang punong bahagi ay mas malaki at doon lumalabas ang usbong na may maraming ugat.
                      Karaniqang kasama ang korona ng bunga kung ibenta kaya bihira itong gamitin bilang pananim.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper elevation={3} sx={{ backgroundColor: '#fdff72' }} >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                    <Avatar alt="aerial" src={Aerial} />
                    <Typography variant="button" display="block" gutterBottom>
                      Hapas o Aerial Suckers
                    </Typography>
                    <Typography variant="caption" display="block">
                      Ang hapas o aerial suckers ay umuusbong naman sa taas na bahagi ng puno ng pinya.
                      Maari itong kunin  bilang pantanim mga 3 hanggang 5 buwan matapos anihin ang bunga ng pinya.
                    </Typography>
                  </Box>
                </Paper>

              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Paper elevation={3} sx={{ backgroundColor: '#07da63' }} >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, }}>
                    <Avatar alt="ground" src={Ground} />
                    <Typography variant="button" display="block" gutterBottom>
                      Suhi o Ground Suckers
                    </Typography>
                    <Typography variant="caption" display="block">
                      Ang suhi o ground suckers ay tumutubo naman sa puno ng pinya na nakadikit sa lupa. Makukuha ito bilang pantanim kasabay ng hapas.
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>

      {/* 1st */}
      <div className="container" >
        <div className="row" style={{marginTop:50,}}>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Pagpili at Paghahanda ng Pantanim</h2>
              <p>Mahusay na piliin ang semilyang pantanim upang makasigurong pare-pareho ang laki ng bunga
                sa panahon ng pag-ani. Pagsama- samahin ang magkaparehong uri.  Iwasan gumamit ng malaking
                semilya sapagkat namumulaklak ito ng maaga.  Subalit iwasan din naman ang sobrang maliit dahil
                mahinang klase din ang bunga nito. Kung korona ang gagamitin bilang pantanim iwasan gamitin ang
                doble o kumpol-kumpol na korona. Iwasan na gamitin ang sirang ubod na korona. Ikalat ang semilyang
                pantanim sa lugar na nasisiskatan ng araw sa loob ng dalawa hanggat tatlong araw. Sa ganitong paraan,
                mapapadali ang pag -uugat at maiiwasan ang pagkakaroon ng sakit</p>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src={require('../../image_src/pinya1.jpg')} className="img-responsive" alt="" />{" "}
          </div>

        </div>
      </div>
      {/* 1st */}
      <div className="container">
        <div className="row" style={{marginTop:50}}>
          <div className="col-xs-12 col-md-6">
            {" "}
            <img src={require('../../image_src/pinya3.jpg')} className="img-responsive" alt="" />{" "}
          </div>
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Paghahanda ng Lupa</h2>
              <p> Mahalagang maayos at maihandang mabuti ang lupang tataniman ng pinya.
                Kailangan itong bungkalin at suyuin ng husto upang makasigurong normal ang paglaki ng halaman.
                Sundin ang mga sumusunod:</p>
              <ul>
                <li style={{ fontSize: 12 }}>Linisin ang lugar na tataniman. Tabasin ang mga malalagong damo o kaya'y gumamit ng gamot na pamatay damo.</li>
                <li style={{ fontSize: 12 }}>Alisin ang mga halamang hindi kailangan. Bunutin ang mga ugat at tuod</li>
                <li style={{ fontSize: 12 }}> Araruhin ang lugar na malinis na at makalipas ang 7 hanggang 10 araw araruhin ulit</li>
              </ul>
              <p>Mas mabuting ihanda ang lupa bago sumapit ang tag-ulan. Mas madaling araruhin at suyurin ang lupa sa ganitong panahon. Kung ang lupa ay maputik at naiipon ang tubig maglagay ng tubig daluyan o kanal.
                Maari din gumawa ng kama-kama para doon itanim ang pinya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About