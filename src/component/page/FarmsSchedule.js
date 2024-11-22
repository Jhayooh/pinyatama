import React, { useState, useRef, useEffect } from 'react'
import Timeline, { CursorMarker, CustomMarker, DateHeader, SidebarHeader, TimelineHeaders, TimelineMarkers, TodayMarker } from 'react-calendar-timeline'
import '../../component/css/FarmSchedule.css'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Config'
import '../../component/css/ripple.css'
import Textfield from './Timeline'
import { Box, Paper, Slide, Button, Typography, CircularProgress } from '@mui/material'
import { useCollectionData } from 'react-firebase-hooks/firestore';

function SideDetails({ farm, farmer, eventClicked, setSelected, setClicked }) {
  var options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };

  const startDate = new Date(eventClicked.start_time)
  const endDate = new Date(eventClicked.end_time)
  const formattedStart = startDate.toLocaleDateString('en-US', options);
  const formattedEnd = endDate.toLocaleDateString('en-US', options);
  return (
    <>
      {
        farm &&
        <Box sx={{
          position: 'absolute', minWidth: 380, p: 2, pt: 3, borderRadius: 3, boxShadow: '10', backgroundColor: '#fff',
          zIndex: 9999
        }}>
          <Button sx={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'flex-end', ml: 'auto', color: 'red' }} onClick={() => setClicked({})}>X</Button>
          <Box sx={{ margin: 2 }}>
            <Typography variant='button' sx={{ fontFamily: 'serif', fontSize: 25, justifyContent: 'center', alignItems: 'center', display: 'flex', color: 'red' }}> {farm.title} </Typography>
            <Typography sx={{ fontFamily: 'serif', fontSize: 15, display: 'flex' }}> Bilang ng Tanim:<span style={{ color: 'green', fontSize: 15, padding: 2 }}> {farm.plantNumber} piraso </span></Typography>
            <Typography sx={{ fontFamily: 'serif', fontSize: 15, display: 'flex' }}> Yugto ng Pananim:<span style={{ color: 'green', fontSize: 15, padding: 2 }}>{eventClicked.title}</span></Typography>
            <Typography sx={{ fontFamily: 'serif', fontSize: 15, display: 'flex' }}> Petsa ng Pagtanim:<span style={{ color: 'green', fontSize: 15, padding: 2 }}>{formattedStart}</span> </Typography>
            <Typography sx={{ fontFamily: 'serif', fontSize: 15, display: 'flex' }}> Inaasahang Petsa ng Pag-ani:<span style={{ color: 'green', fontSize: 15, padding: 2 }}>{formattedEnd}</span> </Typography>
          </Box>

          <Button variant='contained' color='success' onClick={() => setSelected && setSelected('Farms')}>Tingnan ang Buong Detalye</Button>
        </Box>
      }
    </>
  )
}

function getObject(list, key, value) {
  return list.find((obj) => {
    return obj[key] === value;
  })
}

function FarmsSchedule({ isTimelinePage, farms, events, setSelected }) {  
  const [clicked, setClicked] = useState({})
  const containerRef = useRef(null);

  const dataFarmColl = collection(db, '/dataFarm')
  const [dataFarm] = useCollectionData(dataFarmColl)

  const [farmClicked, setFarmClicked] = useState(null)
  const [farmerClicked, setFarmerClicked] = useState(null)

  useEffect(() => {
    if (!dataFarm && !farms) return
    if (Object.keys(clicked).length === 0) return
    const fc = farms?.find((f) => f.id === clicked.group)
    const frc = dataFarm?.find((f) => f.fieldId === fc.fieldId)

    setFarmClicked(fc)
    setFarmerClicked(frc)
  }, [dataFarm, farms, clicked])

  const keys = {
    groupIdKey: 'id',
    groupTitleKey: 'title',
    groupRightTitleKey: 'rightTitle',
    itemIdKey: 'id',
    itemTitleKey: 'title',
    itemDivTitleKey: 'title',
    itemGroupKey: 'group',
    itemTimeStartKey: 'start_time',
    itemTimeEndKey: 'end_time',
  }

    ;
  const itemRender = ({ item, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
    const backgroundColor = itemContext.selected
      && itemContext.dragging
      && 'red'
    // : item.selectedBgColor
    // : item.bgColor
    const borderColor = itemContext.resizing ? 'red' : item.color
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: '#fff',
            borderColor,
            border: itemContext.selected ? 'dashed 1px rgba(0,0,0,0.3)' : 'none',
            borderRadius: 7,
            position: 'sticky',
            position: '-webkit-sticky',
            display: 'inline-block'
            // boxShadow: `0 1px 5px 0 rgba(0, 0, 0, 0.2),
            //            0 2px 2px 0 rgba(0, 0, 0, 0.14),
            //            0 3px 1px -2px rgba(0, 0, 0, 0.12)`
          },
          // onMouseDown: () => {
          //   setClicked(item)
          // }
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          className="rct-item-content"
          style={{
            height: itemContext.dimensions.height,
            overflow: 'hidden',
            paddingLeft: 3,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '1rem',
            marginLeft: '1rem',
          }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    )
  }

  return (
    <>

      {!events
        ? <CircularProgress />
        :
        <Box sx={{ display: 'flex', pl: 2, maxHeight: 'calc(100% * .92)', flexDirection: { xs: 'column', md: clicked ? 'row' : 'column' } }} ref={containerRef} >
          <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100%)', flex: 1 }}>
            <Timeline
              keys={keys}
              groups={farms.map(f => ({
                ...f,
                stackItems: true,
                canMove: false
              }))}
              onItemSelect={(item) => (setClicked(getObject(events, "id", item)))}
              onItemDeselect={() => (setClicked({}))}
              itemRenderer={itemRender}
              items={events.sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate())}
              lineHeight={35}
              sidebarContent={<div>QP Farms</div>}
              defaultTimeStart={moment().add(-2, 'month')}
              defaultTimeEnd={moment().add(9, 'month')}
              maxZoom={1.5 * 365.24 * 86400 * 1000}
              minZoom={1.24 * 86400 * 1000 * 7 * 3}
              // fullUpdate
              itemTouchSendsClick={false}
              stackItems={true}
              itemHeightRatio={0.75}
              showCursorLine
              canMove={false}
            >
              <TimelineMarkers>
                <CursorMarker >
                  {({ styles, date }) =>
                    // e.g. styles = {...styles, backgroundColor: isDateInAfternoon(date) ? 'red' : 'limegreen'}
                    <div style={{ ...styles, backgroundColor: '#22b14c' }} >
                      <Paper elevation={3} className='date-hover' sx={{
                        position: 'absolute',
                        left: '-40',
                        width: 80,
                        p: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#ffb550',
                        color: '#fff'
                      }}>
                        {new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                      </Paper>
                    </div>
                  }
                </CursorMarker>
                <TodayMarker>
                  {({ styles, date }) =>
                    <div style={{ ...styles, width: '0.3rem', backgroundColor: 'rgba(255,0,0,0.5)' }} />
                  }
                </TodayMarker>
              </TimelineMarkers>
              <TimelineHeaders className='timeline-header'>
                <SidebarHeader >
                  {({ getRootProps }) => {
                    return <h3 {...getRootProps()}>Mga Sakahan</h3>
                  }}
                </SidebarHeader>
                <DateHeader sticky unit="primaryHeader" />
                <DateHeader sticky />
              </TimelineHeaders>
            </Timeline >
            {/* <Timeline
          groups={farms}
          itemRenderer={itemRender}
          items={events.sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate())}
          minZoom={365.24 * 86400 * 1000} // 1 year
          maxZoom={365.24 * 86400 * 1000 * 20} // 20 years
          defaultTimeStart={moment().add(-20, "year")}
          defaultTimeEnd={moment()}
        /> */}
          </Box >
          {isTimelinePage && Object.keys(clicked).length !== 0 && (
            <Box sx={{ flex: { md: '0 0 380px' }, pl: 1 }}>
              <SideDetails farm={farmClicked} setClicked={setClicked} eventClicked={clicked} setSelected={setSelected} farmer={farmerClicked} />
            </Box>
          )}
        </Box>
      }
    </>
  )
}

export default FarmsSchedule