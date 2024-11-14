import React from 'react'
import { TableContainer, TableBody, TableCell, Table, TableHead, TableRow } from '@mui/material'
import { Typography, Grid, Paper, Box, Avatar, Card, CardContent, CardActionArea } from '@mui/material'

//images
import Crown from '../../image_src/crown.jpg';
import Aerial from '../../image_src/arial.jpg';
import Ground from '../../image_src/ground.jpg';
import a from '../../image_src/shovel.png';
import b from '../../image_src/grass.png';
import c from '../../image_src/fertilizer.png';
import d from '../../image_src/lotus.png';
import e from '../../image_src/seeding.png';
import f from '../../image_src/sickle.png';
import Mealy from '../../image_src/mealybug.jpg';
import Butt from '../../image_src/buttrot.jpg';
import Fruit from '../../image_src/fruit core rot.jpg';
import Heart from '../../image_src/heart rot.jpg';
import Mouse from '../../image_src/mouse.jpg';


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
const data = [
  {
    "url": `${a}`,
    "name": "Pagtatanim",
    "text": "Itanim ang pinya sa umpisa ng tag-ulan. Doon sa mga lugar na may regular na distribution ng ulan maaring itanim ang pinya ano mang oras basta nakahanda ang pantanim."
  },
  {
    "url": `${b}`,
    "name": "Pagsugpo ng Damo",
    "text": " May dalawang paraan ng pagsugpo ng damo sa taniman ng pinya - ang paggamit ng kemikal at ang paggamaso pagpunot ng damo.Bagamat epektibo ang bawat isa mas mabuting pagsamahin ang dalawang paraan upang mas lalong epektibong masugpo ang damo."
  },
  {
    "url": `${c}`,
    "name": "Pag-aabono",
    "text": "Kailangan ng pinya ang sapat na dami ng abono para ganap na maganda ang paglaki at pamumunga nito. Dapat alamin ang likas na uaman o katabaan ng lupang tataniman sa pamamagitan ng pagpapasuri ng lupa. Mas higit na epektibo at matipid ang paglalagay ng pataba."
  },
  {
    "url": `${d}`,
    "name": "Pagpapabulaklak",
    "text": " Ang pagpapabulaklak ng pinya na wala sa panahon ay mahalaga dahil napapataas nito ang porsiyento ng pamumulaklak; sabay-sabay ang pamumulaklak; maaring mamulaklak kung kailan nais ng magsasaka; matipid at mataas ang kita. Ang pinya ay maaring pabulaklakin mga 10 hanggang 13 buwan makatapos itanim. Iwasan ang pagpapabunga ng maaga lalo na kung pitong buwan pa lamang sapagkat maaring maliliit ang bunga."
  },
  {
    "url": `${e}`,
    "name": "Paraan ng Pagpapalaki ng Bunga sa Panahon ng Pamumulaklak ng Pinya",
    "text": "Maaring palakihin ang bunga ng mga pinya kahit sa panahon na ito ng pamumulaklak."
  },
  {
    "url": `${f}`,
    "name": "Pag-ani ng Bunga",
    "text": " Ang bunga ng pinya ay maaring anihin 4 1/2 hanggang 5 buwan depende sa panahon at timpla ng ethephon na inilagay sa pagpabulaklak.Medyo matagal anihin kung ginagawa sa panahon ng tag-ulan at mababa ang timpla ng pampabulaklak na ginamit."
  }
]
const Pest = [
  {
    "img": `${Mealy}`,
    "text": "Ito'y isang insektong sumisipsip ng katas ng mga murang dahon at mga dahong nagsisismulang gumulang.",
    "name": "Mealybugs"
  },
  {
    "img": `${Butt}`,
    "text": "Ito'y isang insektong sumisipsip ng katas ng mga murang dahon at mga dahong nagsisismulang gumulang.",
    "name": "Butt Rot"
  },
  {
    "img": `${Fruit}`,
    "text": "Ang sakit na ito ay dulot ng fungus. Ito ay labis na nagpapababa ng kalidad ng bunga ng pinya.",
    "name": "Fruit Core Rot"
  },
  {
    "img": `${Heart}`,
    "text": "Ang sakit na ito ay dulot ng fungus at karaniwang pinapatay nito ang bagong tanim na halaman.",
    "name": "Heart Rot"
  },
  {
    "img": `${Mouse}`,
    "text": "Kinakain ang prutas, murang dahon at ubod ng halaman",
    "name": "Daga"
  },
]
const About = () => {
  return (
    <div id="about">
      {/* 1st */}
      <div id='features' className="container">
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <div className="about-text">
              <h2>Katangian ng Pinyang Queen</h2>
              <p> Ang queen ang pinakamatamis na uri ng pinya sa Pilipinas. Ito ay may matinik na dahon kung ikukumpara sa ibang uri ng pinya. Ang  bunga ang tumitimbang ng halos isang kilo.
                Ang bunga ng queen ay malaki sa gawing puno at paliit sa gawing dulo. Matingkad na kulay dilaw ang balat kung hinog na at ang laman ay malutong. Hindi ito gaanong makatas
                at tamang tama lang sa panlasa at tamis. Napagalaman sa pagsusuri ng DOLE Philippines ma mataas ang taglay na iron, magnesium, potasyum, copper at manganese
                ng Queen kaysa sa Hawaian.</p>
            </div>
          </div>
          <div className="col-xs-12 col-md-6">
            <img src={require('../../image_src/pinya3.jpg')} className="img-responsive" alt="" width={520} />{" "}
          </div>
        </div>
      </div>
      <div id='testimonials' className="text-center">
        <div className="container" style={{ marginTop: 50 }}>
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
      <div id='services' className='text-center'>
        <div className='container'>
          <div className="section-title">
            <h2>Paghahanda</h2>
            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p> */}
          </div>
        </div>
        <div className='row'>
          {data.map((d, i) => (
            <div key={`${d.name}-${i}`} className="col-md-4">
              <img src={d.url} alt={d.name} className="icon" />
              <div className="service-desc">
                <h3>{d.name}</h3>
                <p>{d.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 1st */}
      <div id='features' className="container" >
        <div className="row" style={{ marginTop: 50, }}>
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
            <img src={require('../../image_src/pinya1.jpg')} className="img-responsive" alt="" width={520} />{" "}
          </div>
        </div>
      </div>
      {/* 1st */}
      <div id='features' className="container" >
        <div className="row">
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
          <div className="col-xs-12 col-md-6">
            <img src={require('../../image_src/pinya3.jpg')} className="img-responsive" alt="" width={520} />{" "}
          </div>
        </div>
      </div>

      <div id="testimonials">
        <div className="container">
          <div className="section-title text-center">
            <h2>Mga Peste ng Pinya</h2>
          </div>
          <div className="row">
            {Pest.map((d, i) => (
              <div key={`${d.name}-${i}`} className="col-md-4">
                <div className="testimonial">
                  <div className="testimonial-image">
                    {" "}
                    <img src={d.img} alt="" />{" "}
                  </div>
                  <div className="testimonial-content">
                    <p>"{d.text}"</p>
                    <div className="testimonial-meta"> - {d.name} </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About