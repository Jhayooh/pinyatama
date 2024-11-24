import React from 'react'
import { TableContainer, TableBody, TableCell, Table, TableHead, TableRow } from '@mui/material'
import { Typography, Grid, Paper, Box, Avatar, Card, CardContent, CardActionArea, Stack, Divider, CardMedia } from '@mui/material'

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
// const Pest = [
//   {
//     "img": `${Mealy}`,
//     "text": "Ito'y isang insektong sumisipsip ng katas ng mga murang dahon at mga dahong nagsisismulang gumulang.",
//     "name": "Mealybugs"
//   },
//   {
//     "img": `${Butt}`,
//     "text": "Ito'y isang insektong sumisipsip ng katas ng mga murang dahon at mga dahong nagsisismulang gumulang.",
//     "name": "Butt Rot"
//   },
//   {
//     "img": `${Fruit}`,
//     "text": "Ang sakit na ito ay dulot ng fungus. Ito ay labis na nagpapababa ng kalidad ng bunga ng pinya.",
//     "name": "Fruit Core Rot"
//   },
//   {
//     "img": `${Heart}`,
//     "text": "Ang sakit na ito ay dulot ng fungus at karaniwang pinapatay nito ang bagong tanim na halaman.",
//     "name": "Heart Rot"
//   },
//   {
//     "img": `${Mouse}`,
//     "text": "Kinakain ang prutas, murang dahon at ubod ng halaman",
//     "name": "Daga"
//   },
// ]
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
      <div id="testimonials" className='container'>
        <Box>
          <div className="section-title">
            <h2>Mga Peste ng Pinya</h2>
          </div>
          <Grid container columns={15} spacing={2}>
            <Grid item xs={15} md={5} lg={3}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'green' }}>
                      Mealybugs
                    </Typography>

                  </Stack>
                  <img src={Mealy} width='100%' height='50%' />
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="body2">
                    <p>Ito'y isang insektong sumisipsip ng katas ng mga murang dahon at mga dahong nagsisismulang gumulang.</p>
                    <b style={{ color: '#07da63' }}>Sintomas:</b>
                    <li>Pamumula ng dahon</li>
                    <li>Pagkalanta ng dahon</li>
                    <li>Panunuyo ng malaking bahaging dahong apektado</li>
                    <li>Pagkupas ng berdeng kulay dahon</li>
                    <li>Bansot ang halaman</li>
                    <b style={{ color: '#07da63' }}>Pagpuksa:</b>
                    <p>Ang mealybugs ay nabubuhay kasam ng mga langgam. Ang langgam ang naglilipat sa mga ito sa mga malulusog na bahagi ng halaman.</p>
                    <li>Paggamit ng 'mealybug-free' na pananim</li>
                    <li>Mag-gpray ng 1-1.4ml./li ng Malathion o Diazinon</li>
                    <li>Puksain ang mga langgam na nagkakalat ng peste sa pamamagitan ng pagbobomba ng Sumicidin sa border area na may 4-6 na tudling.</li>
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={15} md={5} lg={3}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'green' }}>
                      Butt Rot
                    </Typography>

                  </Stack>
                  <img src={Butt} width='100%' height='30%' />
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="body2">
                    <b style={{ color: '#07da63' }}>Sintomas</b>
                    <li>Pagkabulok ng gawing puno ng halaman</li>
                    <li>Pagkalanta ng buong halaman</li>
                    <li>Biglaang pagkamatay ng halaman</li>
                    <b style={{ color: '#07da63' }}>Pagpuksa/pag-iwas</b>
                    <li>Iwasan na magkasugat ang halaman upang hindi makapasok ang fungus na nagdudulot ng sakit</li>
                    <li>Maari ding ilubog ang puno ng halaman sa 2.5 gramo bawat litro ng Aliette solusyon habang sariwa pa ang sugat.</li>
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={15} md={5} lg={3}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'green' }}>
                      Fruit Core Rot
                    </Typography>

                  </Stack>
                  <img src={Fruit} width='100%' height='30%' />
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="body2">
                    <p>Ang sakit na ito ay dulot ng fungus. Ito ay labis na nagpapababa ng kalidad ng bunga ng pinya. </p>
                    <b style={{ color: '#07da63' }}>Sintomas:</b>
                    <li>Berde at maliit ang bunga</li>
                    <li>Lubog ang mata ng apektadong bunga na kulay brown</li>
                    <li>Kapag hiniwa ang apektadong bahagi ay nangingitim, matigas, basa at nabubulok</li>
                    <b style={{ color: '#07da63' }}>Pagpuksa/pag-iwas:</b>
                    <li>Panatilihing tama ang dami ng N, P at K.</li>
                    <li>Mag-bomba ng 1-1.4 m/li ng malathion o kaya 0.1% Diazinon laban sa mealybugs na gumagawa ng butas o sira sa pinya na maaring pasukan ng fungus.</li>
                    <li>iwasan ang pagtanggal ng ubod ng korona sa panahon ng tag-ulan.</li>
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={15} md={5} lg={3}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'green' }}>
                      Heart Rot
                    </Typography>

                  </Stack>
                  <img src={Heart} width='100%' height='30%' />
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="body2">
                    <p>Ang sakit na ito ay dulot ng fungus at karaniwang pinapatay nito ang bagong tanim na halaman. </p>
                    <b style={{ color: '#07da63' }}>Sintomas:</b>
                    <li>Paninilaw o pamumula ng dahon ng halaman sa gitna</li>
                    <li>Pagkalanta ng mga gilid (margins) ng dahon</li>
                    <li>Ang puno ng dahon ay nalilinaw hanggang kumupas maging puti, malambot at basa na kulay na kape ang gilid.
                      Madaling matanggal ang ganitong dahon sa puno
                    </li>
                    <li>May mabahong amoy</li>
                    <b style={{ color: '#07da63' }}>Pagpuksa/pag-iwas:</b>
                    <li>Siguradong maayos ang labasan ng tubig</li>
                    <li>Itaas hanggang 25cm ang taniman kung laganap ang sakit</li>
                    <li>Maglagay ng kulob o mulch kung ginawang 25cm ang taas ng taniman</li>
                    <li>Magtanim sa panahon ng tag-araw</li>
                    <li>Illubog ang pananim ng ilang minuto sa 8-10 g/li solusyon ng Difoltan o 2.5 g/li ng Aliette.</li>
                  </Typography>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={15} md={5} lg={3}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <Box sx={{ p: 2 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography gutterBottom variant="h5" component="div" sx={{ color: 'green' }}>
                      Daga
                    </Typography>

                  </Stack>
                  <img src={Mouse} width='100%' height='30%' />
                </Box>
                <Divider />
                <Box sx={{ p: 2 }}>
                  <Typography gutterBottom variant="body2">
                    <b style={{ color: '#07da63' }}>Pinsala:</b>
                    <li>Kinakain ang prutas, murang dahon at ubod ng halaman</li>
                    <b style={{ color: '#07da63' }}>Pagpuksa/pag-iwas</b>
                    <li>Paglagay ng pain o lason ng Racumin. Ito ay maaring ihalo sa bigas at ikalat sa taniman. Maari din itong ilagay sa bunot ng niyog o kawayan na may butas.</li>
                    <li>Panatilihing malinis ang taniman</li>
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div id='features' className="container" >
        <Box>
          <div className="section-title">
            <h2>Pag-ani ng Dahon</h2>
          </div>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant='caption' display='block' gutterBottom>
              Ang dahon ng pinya ay isa sa pinagkukunan ng magandang uri ng hibla para sa tela at papel. Dagdag na kita ito sa mga magtatanim ng pinya kung aanihin at ipagbibili ang sariwang dahon o kaysa
              pinatuyong hibla. Piliin ang magulang na dahon at walangs sira na may habang dalawang talampakan. Ginagawa ang pag-ani ng dahon matapos anihin ang bunga ng pinya.
            </Typography>
            <Typography variant='caption' display='block' gutterBottom>
              Sa halip na tabasin para makagawa ng 'walking alley' o daanan sa pag-ani at pag-hakot ng bunga maaring anihin ang dahon upang ibenta at gawing hibla. Ang mga natitirang dahon
              ay anihin ang dahon upang ibenta at gawing hibla. Ang mga natitirang dahon ay anihin ulit pagkatapos anihin ang mga bunga.
            </Typography>
            <Typography variant='caption' display='block' gutterBottom>
              Napag-alaman na ang pag-ani ng dahon ay hindi nakakaapekto sa paglaki ng suhi na gagamitin pantanim.
            </Typography>
          </Paper>
        </Box>
      </div>
      <div id='features' className="container" >
        <Box>
          <div className="section-title">
            <h2>Mga Produkto at Gamit ng Pinya</h2>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: 2 }}>
                <Typography variant='caption' sx={{ color: 'green' }}>
                  01
                </Typography>
                <Typography variant='caption'>
                  Prutas bilang sangkap sa salad
                </Typography>
              </Box>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: 2 }}>
                <Typography variant='caption' sx={{ color: 'green' }}>
                  02
                </Typography>
                <Typography variant='caption'>
                  Sangkap ito sa paggawa ng ice cream, halo-halo at gelatin
                </Typography>
              </Box>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: 2 }}>
                <Typography variant='caption' sx={{ color: 'green' }}>
                  03
                </Typography>
                <Typography variant='caption'>
                  Palaman sa paggawa ng cake, pies, tarts at tinapay
                </Typography>
              </Box>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: 2 }}>
                <Typography variant='caption' sx={{ color: 'green' }}>
                  04
                </Typography>
                <Typography variant='caption'>
                  Sangkap sa mga lutuing karne, curry at iba pa
                </Typography>
              </Box>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: 2 }}>
                <Typography variant='caption' sx={{ color: 'green' }}>
                  05
                </Typography>
                <Typography variant='caption'>
                  Ginagawang jam, jelly at pure
                </Typography>
              </Box>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: 2 }}>
                <Typography variant='caption' sx={{ color: 'green' }}>
                  06
                </Typography>
                <Typography variant='caption'>
                  Ginagawang juice at iba pang inumin
                </Typography>
              </Box>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: 2 }}>
                <Typography variant='caption' sx={{ color: 'green' }}>
                  07
                </Typography>
                <Typography variant='caption'>
                  Nagawang chunks, sliced or crushed na niluluto sa syrup
                </Typography>
              </Box>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: 2 }}>
                <Typography variant='caption' sx={{ color: 'green' }}>
                  08
                </Typography>
                <Typography variant='caption'>
                  Ginagawang candies
                </Typography>
              </Box>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: 2 }}>
                <Typography variant='caption' sx={{ color: 'green' }}>
                  09
                </Typography>
                <Typography variant='caption'>
                  Ginagawa suka, alak at toyo
                </Typography>
              </Box>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: 2 }}>
                <Typography variant='caption' sx={{ color: 'green' }}>
                  10
                </Typography>
                <Typography variant='caption'>
                  Pinoproseso bilang nata de pina
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Box sx={{ flexDirection: 'column', display: 'flex', gap: 1 }}>
                <Box sx={{ flexDirection: 'row', display: 'flex', gap: 2 }}>
                  {/* <img src={require('../image_src/product.png')} width='20%' /> */}
                  <img src={require('../../image_src/candy.jfif')} width='20%' />
                  <img src={require('../../image_src/jam.jfif')} width='20%' />
                  <img src={require('../../image_src/salad.jfif')} width='20%' />
                  <img src={require('../../image_src/icecream.jfif')} width='20%' />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div id='features' className="container" >
        <Box>
          <div className="section-title">
            <h2>Paraan ng paghanda ng Pinya bilang Panghimagas o Table Fruit</h2>
          </div>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} lg={3}>
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                <img src={require('../../image_src/koron.jfif')} width='100%' height='50%' />
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="caption">
                  Alisin and Korona
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Card variant="outlined" >
              <Box sx={{ p: 2 }}>
                <img src={require('../../image_src/haba.jfif')} width='100%' height='50%' />
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="caption">
                  Putulin ang Prutas ng Pahaba
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Card variant="outlined" >
              <Box sx={{ p: 2 }}>
                <img src={require('../../image_src/tuklap.jfif')} width='100%' height='50%' />
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="caption">
                  Putol-putulin ang pinya at tuklapin sa pamamagitan ng kutsilyo
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Card variant="outlined" >
              <Box sx={{ p: 2 }}>
                <img src={require('../../image_src/bitesize.jfif')} width='100%' height='50%' />
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Typography gutterBottom variant="caption">
                  Hiwa-hiwain ng bite size o kayang isubo sa bibig
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div id='features' className="container" >
        <Grid container spacing={2} >
          <CardActionArea component="a" href="#">
            <Card sx={{ display: 'flex' }}>
              <CardContent sx={{ flex: 1 }}>
                <div className="section-title">
                  <h2> Paghahanda ng Pinyang ibebenta sa ibang bansa</h2>
                </div>
                <Typography variant="subtitle1" paragraph sx={{ fontSize: 15 }}>
                  <li>Piliin ang magandang uri ng bunga depende sa pangangailangan ng bumili.</li>
                  <li>Ingatan na hindi magalusan, masugatan at mabugbug ang pinya sa pag-ani at paghakot</li>
                  <li>Kung maari ilagay ang inaning pinya sa lalagyan na may sapin na dyaryo</li>
                  <li>Ihiwalay o alisin ang mga bunga na may sakit, may aphids o iba pang insekto</li>
                  <li>Linisin ang bunga sa pamamagitan ng paggamit ng lumang toothbrush o sipilyo</li>
                  <li>Putulin ang tangkay ng pinya.Itira ang kalahating puldgada ng tangkay. <br /> Iwasan na magalusan ang tangkay dahil maaring pasukin ito ng insekto na magdududlot ng sakit at pagkabulok ng pinya.</li>
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
                src={require('../../image_src/bansa.jpg')}
                alt="Korona Image"
              />
            </Card>
          </CardActionArea>
        </Grid>
      </div>
    </div>
  );
}

export default About