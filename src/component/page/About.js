import React from "react";
import {
    Typography,
    Box,
    Button,
    Paper,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Modal,
    Avatar,
    Table,
    Divider,
    Stack,
    Card,
    Chip
} from "@mui/material";

//Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


//Images
import Crown from '../image_src/crown.jpg';
import Aerial from '../image_src/arial.jpg';
import Ground from '../image_src/ground.jpg';

function About() {
    //katangian ng pinyang queen
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

    //Pagaabono
    function createData(buwan, abono, dami, bilang) {
        return { buwan, abono, dami, bilang };
    }

    const rows = [
        createData('1 buwan pagkatanim', 'Ammonium phosphate (16-20-0)', 10, 7),
        createData('', 'Muriate of Potash (0-0-60)', 5, 3.5),
        createData('3 buwan pagkatanim', 'Urea (46-0-0)', 5, 3.5),
        createData('5 buwan pagkatanim', 'Urea (46-0-0)', 5, 3.5),
        createData('', 'Muriate of Potash (0-0-60)', 5, 3.5),
        createData('7 buwan pagkatanim', 'Urea (46-0-0)', 5, 3.5),

        createData('Total', '', 35, 24.5),
    ];


    return (
        <>
            {/* Katangian ng Pinyang Queen */}
            <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography
                    variant="overline"
                    display="block"
                    gutterBottom
                    sx={{ color: 'orange', fontSize: '20px', textAlign: 'center' }}>
                    Katangian ng Pinyang Queen
                </Typography>
                <Box sx={{ maxWidth: 800, textAlign: 'left' }}>
                    <Typography variant="caption" display="block">
                        Ang queen ang pinakamatamis na uri ng pinya sa Pilipinas. Ito ay may matinik na dahon kung ikukumpara sa ibang uri ng pinya. Ang  bunga ang tumitimbang ng halos isang kilo.
                        Ang bunga ng queen ay malaki sa gawing puno at paliit sa gawing dulo. Matingkad na kulay dilaw ang balat kung hinog na at ang laman ay malutong. Hindi ito gaanong makatas
                        at tamang tama lang sa panlasa at tamis. Napagalaman sa pagsusuri ng DOLE Philippines ma mataas ang taglay na iron, magnesium, potasyum, copper at manganese
                        ng Queen kaysa sa Hawaian.
                    </Typography>
                </Box>
                <Button variant="outlined"
                    sx={{ color: 'green', borderRadius: 15, borderColor: 'green' }}
                    onClick={handleOpen}>
                    Iba pang Detalye
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '70%',
                        textAlign: 'center',
                        background: 'transparent',
                        boxShadow: 'none',
                        outline: 'none',
                    }}
                >
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
                </Modal>
            </div>
            {/* Mga Uri ng Pananim */}
            <div style={{ padding: 10 }}>
                <Typography
                    variant="overline"
                    display="block"
                    gutterBottom
                    sx={{ color: 'orange', fontSize: '20px', textAlign: 'center' }}>
                    Mga Uri ng Pananim
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1, // Adjust the gap between papers
                        '& > :not(style)': {
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                        },
                    }}
                >
                    <Paper elevation={3} sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, backgroundColor: 'orange' }}>
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

                    <Paper elevation={3} sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, backgroundColor: 'yellow' }}>
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

                    <Paper elevation={3} sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2, backgroundColor: 'orange' }}>
                            <Avatar alt="ground" src={Ground} />
                            <Typography variant="button" display="block" gutterBottom>
                                Suhi o Ground Suckers
                            </Typography>
                            <Typography variant="caption" display="block">
                                Ang suhi o ground suckers ay tumutubo naman sa puno ng pinya na nakadikit sa lupa. Makukuha ito bilang pantanim kasabay ng hapas.
                            </Typography>
                        </Box>
                    </Paper>
                </Box>
            </div >
            {/* Paghahanda ng Lupa*/}
            <div style={{ padding: 20 }}>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        '& > :not(style)': {
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                        },
                    }}
                >
                    <div style={{ display: 'flex' }}>
                        <img src={require('../image_src/p1.jpg')} style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}>
                            <Typography
                                variant="overline"
                                display="block"
                                gutterBottom
                                sx={{ color: 'orange', fontSize: '20px', textAlign: 'center' }}>
                                Paghahanda ng Lupa
                            </Typography>
                            <div style={{ width: '100%', padding: 5 }}>
                                {/* Use a div to wrap content and maintain width */}
                                <Typography variant="caption" display="block" sx={{ alignItems: 'center' }}>
                                    Mahalagang maayos at maihandang mabuti ang lupang tataniman ng pinya.
                                    Kailangan itong bungkalin at suyuin ng husto upang makasigurong normal ang paglaki ng halaman.
                                    Sundin ang mga sumusunod:
                                    <ul>
                                        <li>Linisin ang lugar na tataniman. Tabasin ang mga malalagong damo o kaya'y gumamit ng gamot na pamatay damo.</li>
                                        <li>Alisin ang mga halamang hindi kailangan. Bunutin ang mga ugat at tuod</li>
                                        <li> Araruhin ang lugar na malinis na at makalipas ang 7 hanggang 10 araw araruhin ulit</li>
                                    </ul>
                                    Mas mabuting ihanda ang lupa bago sumapit ang tag-ulan. Mas madaling araruhin at suyurin ang lupa sa ganitong panahon. Kung ang lupa ay maputik at naiipon ang tubig maglagay ng tubig daluyan o kanal.
                                    Maari din gumawa ng kama-kama para doon itanim ang pinya.
                                </Typography>
                            </div>
                        </Box>
                    </div>



                </Box>

            </div>
            {/* Pagtatanim*/}
            <div style={{ padding: 20 }}>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        '& > :not(style)': {
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                        },
                    }}
                >

                    <div style={{ display: 'flex' }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}>
                            <Typography
                                variant="overline"
                                display="block"
                                gutterBottom
                                sx={{ color: 'orange', fontSize: '20px', textAlign: 'center' }}>
                                Pagtatanim
                            </Typography>
                            <div style={{ width: '100%', padding: 5 }}>
                                <Typography variant="caption" display="block" sx={{ alignItems: 'center' }}>
                                    Itanim ang pinya sa umpisa ng tag-ulan. Doon sa mga lugar na may regular na distribution ng ulan maaring itanim ang pinya ano mang oras
                                    basta nakahanda ang pantanim. Sundin ang mga sumusunod:
                                    <li>Kung ang pinyang queen ay itatanim bilang sali-tanim sa niyugan, mabuting planuhin ang mga daanan sa paglabas ng mga inang niyog.</li>
                                    <li> Hakutin ang pantanim sa lupang tataniman. Tantiyahin ang tamang bilang ng pantanim na hahakutin.</li>
                                    <li>Pagsama-samahin ang mga pantanim na makakasinlaki.</li>
                                    <li>Sa pagtatanim maaring sundin ang tinatawag na 'single row' o isag linya na may agwat na 70-100 sentimetro ang bawat linya at 30 sentimetro ang pagitan ng bawat puno.</li>
                                    <li>Maari din sundin ang tinatawag na 'double row' o dalawahang linya na may agwat na 80-100 sentimetro ang pagitan ng dalawang linya at 50 sentimetro sa loob ng dalawang linya</li>
                                    <li> Iwasan na malagyan ng lupa ang ubod ng pantanim. Ito ay maaring pagsimulan ng sakit at pagkabulok.</li>
                                </Typography>
                            </div>

                        </Box>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <img src={require('../image_src/p3.jpg')} style={{ width: '100%', height: '100%' }} />
                    </div>
                </Box>
            </div>
            {/* Pagsugpo ng Damo */}
            <div style={{ padding: 20 }}>
                <Typography
                    variant="overline"
                    display="block"
                    gutterBottom
                    sx={{ color: 'orange', fontSize: '20px', }}>
                    Pagsugpo ng Damo
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                        }}>
                        <Typography variant="caption" display="block" gutterBottom>
                            May dalawang paraan ng pagsugpo ng damo sa taniman ng pinya - ang paggamit ng kemikal at ang paggamaso pagpunot ng damo
                            Bagamat epektibo ang bawat isa mas mabuting pagsamahin ang dalawang paraan upang mas lalong epektibong masugpo ang damo.
                        </Typography>
                        <Typography variant="caption" display="block" gutterBottom>
                            Narito ang ilang mga hakbang:
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1,
                        }}>
                            <Typography variant="button" display="block" gutterBottom sx={{ color: 'orange' }}>
                                01
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                Araruhin at suyurin ang lupang tataniman.
                                Higit na kapaki-pakinabang kung ang bawat pag-aararo at pag-suyud ay ginagwa makalipasang 7 hanggang 10 araw.
                            </Typography>
                            <Typography variant="button" display="block" gutterBottom sx={{ color: 'orange' }}>
                                02
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                Maari din mag-spray ng 'Power' sa lupang tataniman makalipas ang 7-10 araw matapos ang pag-bubungkal.
                            </Typography>
                        </Box>

                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1,
                        }}>
                            <Typography variant="button" display="block" gutterBottom sx={{ color: 'orange' }}>
                                03
                            </Typography>
                            <Typography variant="caption" display="block" gutterBottom>
                                Ang iba pang damo ay maaring puksain ng 'pre-emergence' na pamatay damo tulad ng Karmex at Diuron.
                                Ang mga ito ay mas mabisa at matipid kung gagamitin bilang pambomba sa damo 7 hanggang 10 araw pagkatanim.
                                Maliban dito, pinapatay nito ang mga Damosa mga murang ugat at usbong ng mga ito.
                            </Typography>
                        </Box>
                        <Typography variant="caption" display="block" gutterBottom>
                            Subalit, hindi ito maaring gamitin kung masyado nang malago ang mga damo. Kapag ito ay ibinomba ng hindi tama sa panahon maaring magdulot ito ng paninilaw ng dahon at tuluyang pagkalanta ng tanim.
                            Maliban na lamang kung ang gamot ay direktang i-spray sa damo. Kung sakaling ganito ang paggamit maghalo ng 'sticker' katulad ng hoestick o sabon sa solusyon.
                        </Typography>
                        <Typography variant='caption' display='block' gutterBottom>
                            Kung ang tanim ay malago na ang mga damong tumutubo tulad ng agingay ay maaring sugpuin ng Onecide., isang uri ng pamatay damo na maaring ibomba ano man oras pagkatanim.
                            Ang kogon naman ay maaring puksain ng 'round-up o power' bago itanim ang pinya.
                        </Typography>
                        <Typography variant='caption' display='block' gutterBottom>
                            Ang paggamit ng gamot ay suplemento lamang sa karaniwang paraan na pagalis ng damo.
                        </Typography>
                    </Box>
                </Box>
            </div>
            {/* Pag-aabono */}
            <div style={{ pading: 20 }}>
                <Box
                    sx={{
                        padding: 2,
                        backgroundColor: 'orange'
                    }}
                >
                    <Typography
                        variant="overline"
                        display="block"
                        gutterBottom
                        sx={{ color: 'white', fontSize: '20px', }}>
                        Pagsugpo ng Damo
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                    }}>
                        <Typography variant='caption' display='block' gutterBottom>
                            <div>Kailangan ng pinya ang sapat na dami ng abono para ganap na maganda ang paglaki at pamumunga nito.
                                <br /> Dapat alamin ang likas na uaman o katabaan ng lupang tataniman sa pamamagitan ng pagpapasuri ng lupa. Mas higit na epektibo at matipid ang paglalagay ng pataba.
                                <br />Sundin ang rekomendasyon ng Solis Laboratory o kaya ang resulta sa soil test kit sa Office ng Municipal Agriculturist.
                                <br /> Makakatulong din ang paggamit ng organikong pataba mula 6 hanggang 9 na sako sa bawat ektarya. Iwasan ang mag-abono ng halos isang dakot bawat halaman. Malaking porsiyento ang natatapon
                                o nawawala dahil sa pagsingaw o pagka-anod, pagsipsip ng lupa at damo.
                                <br /> Upang mapataas ang kalidad ng bunga, gumamit ng tamang timpla ng abono. Ang potasyum ay nakakapagpatamis ng bunga, ang nitroheno naman ay nakakapagpalaki ng puno ay bunga.
                                Ang posporus naman ay nakakakapagpalago ng ugat.
                            </div>

                        </Typography>
                        <Typography variant='caption' display='block' gutterBottom>
                            <div>
                                Kailangan din ng pinya ang iba pang sustansiya tulad ng boron. Lumalaki ang bunga kung magwiwisik ng Borax sa daming 3 gramo bawat litro ng tubig. Puwedeng gamitin mula 5 buwan
                                pagkatanim hanggang sa panahon ng pamumulaklak.
                                <br /> Mag-abono kung medyo basa ang lupa. Kung mainit at tuyo ang lupa mainam na tunawin ang abono sa tubig at idilig sa puno ng pinya sa daming 40 cc bawat halaman.
                                Iwasan malagyan ang dahon dahil maaring masunog ito.
                                <br /> Maari ding mag-abono sa panahon ng pamumulaklak. Ito ay nakakapagpalaki ng bunga at suhi.
                                <br /> Ilagay ang urea sa bandang puno ng pinya. Ang ammonium phospate at mureate of potasg ay maaring ilagay sa puno ng pinya.</div>
                        </Typography>

                    </Box>
                    <Typography variant='caption' display='block' gutterBottom>
                        Kung hindi nagawa ang pagpapasuri ng lupa, maaring sundin ang sumusunod na talaan na panahon ng pag-aabono.
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" justifyContent='center'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Buwan ng Pag-abono</TableCell>
                                    <TableCell align="justify">Uri ng Abono</TableCell>
                                    <TableCell align="center">Dami bawat puno (gramo)</TableCell>
                                    <TableCell align="center">Bilang(sako)</TableCell>
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
                                        <TableCell align='justify'>{row.abono}</TableCell>
                                        <TableCell align="center">{row.dami}</TableCell>
                                        <TableCell align="center">{row.bilang}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography variant='caption' display='block' gutterBottom>
                        <div>  Sa halip na urea, puwede ring gamitin ang ammonium sulfate (21-0-0) sa dami na doble sa urea.
                            <br />  Mas mabuti kung makagawa ng takalan na may daming 5,10,20 gramo upang magamit sa pag-aabono.
                        </div>
                    </Typography>
                </Box>
            </div >
            {/* Mga peste ng Pinya */}
            <div style={{ padding: 20 }}>
                <Box>
                    <Typography
                        variant="overline"
                        display="block"
                        gutterBottom
                        sx={{ color: 'orange', fontSize: '20px', }}>
                        Mga Peste ng Pinya
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 1,
                        }}>
                        <Card variant="outlined" sx={{ maxWidth: 360 }}>
                            <Box sx={{ p: 2 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography gutterBottom variant="h5" component="div">
                                        Mealybugs
                                    </Typography>

                                </Stack>
                                <img src={require('../image_src/mealybug.jpg')} width='100%' height='50%' />
                            </Box>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
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
                            </Box>
                        </Card>
                        <Card variant="outlined" sx={{ maxWidth: 360 }}>
                            <Box sx={{ p: 2 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography gutterBottom variant="h5" component="div">
                                        Butt Rot
                                    </Typography>

                                </Stack>
                                <img src={require('../image_src/buttrot.jpg')} width='100%' height='30%' />
                            </Box>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    <b>Sintomas</b>
                                    <li>Pagkabulok ng gawing puno ng halaman</li>
                                    <li>Pagkalanta ng buong halaman</li>
                                    <li>Biglaang pagkamatay ng halaman</li>
                                    <b>Pagpuksa/pag-iwas</b>
                                    <li>Iwasan na magkasugat ang halaman upang hindi makapasok ang fungus na nagdudulot ng sakit</li>
                                    <li>Maari ding ilubog ang puno ng halaman sa 2.5 gramo bawat litro ng Aliette solusyon habang sariwa pa ang sugat.</li>
                                </Typography>
                            </Box>
                        </Card>
                        <Card variant="outlined" sx={{ maxWidth: 360 }}>
                            <Box sx={{ p: 2 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography gutterBottom variant="h5" component="div">
                                        Fruit Core Rot
                                    </Typography>

                                </Stack>
                                <img src={require('../image_src/fruit core rot.jpg')} width='100%' height='30%' />
                            </Box>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
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
                            </Box>
                        </Card>
                        <Card variant="outlined" sx={{ maxWidth: 360 }}>
                            <Box sx={{ p: 2 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography gutterBottom variant="h5" component="div">
                                        Heart Rot
                                    </Typography>

                                </Stack>
                                <img src={require('../image_src/heart rot.jpg')} width='100%' height='30%' />
                            </Box>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
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
                            </Box>
                        </Card>
                        <Card variant="outlined" sx={{ maxWidth: 360 }}>
                            <Box sx={{ p: 2 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography gutterBottom variant="h5" component="div">
                                        Daga
                                    </Typography>

                                </Stack>
                                <img src={require('../image_src/mouse.jpg')} width='100%' height='30%' />
                            </Box>
                            <Divider />
                            <Box sx={{ p: 2 }}>
                                <Typography gutterBottom variant="body2">
                                    <b>Pinsala:</b>
                                    <li>Kinakain ang prutas, murang dahon at ubod ng halaman</li>
                                    <b>Pagpuksa/pag-iwas</b>
                                    <li>Paglagay ng pain o lason ng Racumin. Ito ay maaring ihalo sa bigas at ikalat sa taniman. Maari din itong ilagay sa bunot ng niyog o kawayan na may butas.</li>
                                    <li>Panatilihing malinis ang taniman</li>
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                </Box>
            </div>
            {/* Pagpapabulaklak */}
            <div style={{ padding: 20 }}>
                <Box>
                    <Typography
                        variant="overline"
                        display="block"
                        gutterBottom
                        sx={{ color: 'orange', fontSize: '20px', }}>
                        Pagpapabulaklak
                    </Typography>
                </Box>

            </div>


        </>

    );
}
export default About