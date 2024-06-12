import React, { useState, useRef } from 'react'
import Timeline, { CursorMarker, CustomMarker, DateHeader, SidebarHeader, TimelineHeaders, TimelineMarkers, TodayMarker } from 'react-calendar-timeline'
import './FarmSchedule.css'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase/Config'
import './ripple.css'
import Textfield from './Timeline'
import { Box, Paper, Slide } from '@mui/material'

function SideDetails({ farms, eventClicked }) {
  const farmClicked = getObject(farms, "id", eventClicked.group)
  var options = {
    month: 'long', // Full month name
    day: 'numeric', // Day of the month
    year: 'numeric' // Full year
  };

  const startDate = new Date(eventClicked.start_time)
  const endDate = new Date(eventClicked.end_time)
  const formattedStart = startDate.toLocaleDateString('en-US', options);
  const formattedEnd = endDate.toLocaleDateString('en-US', options);
  return (
    <Box sx={{ minWidth: 380, p: 2, pt: 3, borderRadius: 3, boxShadow: '1'}}>
      {/* lagay closing */}
      <h2>{farmClicked.farmerName}</h2>
      <h5>Phase:{eventClicked.title}</h5>
      <p>start date: {formattedStart}</p>
      <p>end date: {formattedEnd}</p>
      <p></p>
      <h5>Activities: </h5>
      <p>No Activities</p>
    </Box>
  )
}

function getObject(list, key, value) {
  return list.find((obj) => {
    return obj[key] === value;
  })
}

function FarmsSchedule({ farms, events }) {
  const [clicked, setClicked] = useState({})
  const containerRef = useRef(null);

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
  const itemRender = ({ item, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps()
    const backgroundColor = itemContext.selected
      ? itemContext.dragging
        ? 'red'
        : item.selectedBgColor
      : item.bgColor
    const borderColor = itemContext.resizing ? 'red' : item.color
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: '#fff',
            borderColor,
            border: itemContext.selected ? 'dashed 1px rgba(0,0,0,0.3)' : 'none',
            borderRadius: 8,
            boxShadow: `0 1px 5px 0 rgba(0, 0, 0, 0.2),
                       0 2px 2px 0 rgba(0, 0, 0, 0.14),
                       0 3px 1px -2px rgba(0, 0, 0, 0.12)`
          },
          // onMouseDown: () => {
          //   setClicked(item)
          // }
        })}
      >
        {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}

        <div
          className="ripple"
          style={{
            height: itemContext.dimensions.height,
            overflow: 'hidden',
            paddingLeft: 3,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontSize: '1rem',
            marginLeft: '1rem'
          }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    )
  }

  // const sideDetails = (
  //   <Box sx={{ minWidth: 380, p: 2, pt: 3, borderRadius: 3, zIndex: 9999, boxShadow: '-48px 0px 29px -7px rgba(0,0,0,0.1)'}}>
  //     {/* lagay closing */}
  //     <h2>phase details</h2>
  //     <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  //       <p>no activity</p>
  //     </div>
  //   </Box>
  // )

  return (
    <Box sx={{ display: 'flex', pl: 2, maxHeight: 'calc(100% * .85)', flexDirection: { xs: 'column', md: clicked ? 'row' : 'column' } }} ref={containerRef} >
      <Box sx={{ overflowY: 'auto', minHeight: 'calc(100% * .85)', flex: 1 }}>
        <Timeline
          keys={keys}
          groups={farms}
          onItemSelect={(item) => (setClicked(getObject(events, "id", item)))}
          onItemDeselect={() => (setClicked({}))}
          itemRenderer={itemRender}
          items={events}
          lineHeight={35}
          sidebarContent={<div>QP Farms</div>}
          defaultTimeStart={moment().add(-2, 'month')}
          defaultTimeEnd={moment().add(9, 'month')}
          maxZoom={1.5 * 365.24 * 86400 * 1000}
          minZoom={1.24 * 86400 * 1000 * 7 * 3}
          // fullUpdate
          itemTouchSendsClick={false}
          // stackItems
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
                return <h3 {...getRootProps()}>QP Farm</h3>
              }}
            </SidebarHeader>
            <DateHeader sticky unit="primaryHeader" />
            <DateHeader sticky />
          </TimelineHeaders>
        </Timeline >
      </Box >
      {
        Object.keys(clicked).length !== 0 &&
        <Box sx={{ flex: { md: '0 0 380px' }, pl: 1 }}>
          <SideDetails farms={farms} eventClicked={clicked} />
        </Box>
      }
    </Box>
  )
}

export default FarmsSchedule