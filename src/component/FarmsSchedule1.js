import React, { useState, useRef } from 'react';
import Timeline, { CursorMarker, CustomMarker, DateHeader, SidebarHeader, TimelineHeaders, TimelineMarkers, TodayMarker } from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import './FarmSchedule.css';
import './ripple.css';
import moment from 'moment';
import { Box, Paper } from '@mui/material';
import Textfield from './Timeline';
import { db } from '../firebase/Config';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

function SideDetails({ farms, eventClicked }) {
  const farmClicked = farms.find(farm => farm.id === eventClicked.group);
  console.log("this is the farm", farmClicked);
  console.log('This is the event', eventClicked);

  const options = { 
    month: 'long', // Full month name
    day: 'numeric', // Day of the month
    year: 'numeric' // Full year
  };

  const formattedStart = new Date(eventClicked.start_time).toLocaleDateString('en-US', options);
  const formattedEnd = new Date(eventClicked.end_time).toLocaleDateString('en-US', options);

  return (
    <Box sx={{ minWidth: 1000, p: 2, pt: 3, borderRadius: 3, zIndex: 9999, boxShadow: '-48px 0px 29px -7px rgba(0,0,0,0.1)' }}>
      <h2>{farmClicked.farmerName}</h2>
      <h5>Phase: {eventClicked.title}</h5>
      <p>Start date: {formattedStart}</p>
      <p>End date: {formattedEnd}</p>
      <h5>Activities:</h5>
      <p>No Activities</p>
    </Box>
  );
}

function FarmsSchedule({ farms, events }) {
  const [clicked, setClicked] = useState({});
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
  };

  const itemRender = ({ item, itemContext, getItemProps, getResizeProps }) => {
    const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected
      ? itemContext.dragging
        ? 'red'
        : item.selectedBgColor
      : item.bgColor;
    const borderColor = itemContext.resizing ? 'red' : item.color;

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
                       0 3px 1px -2px rgba(0, 0, 0, 0.12)`,
          },
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
            marginLeft: '1rem',
          }}
        >
          {itemContext.title}
        </div>

        {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
      </div>
    );
  };

  const municipalities = [
    "BASUD", "CAPALONGA", "DAET (Capital)", "JOSE PANGANIBAN", 
    "LABO", "MERCEDES", "PARACALE", "SAN LORENZO RUIZ", 
    "SAN VICENTE", "SANTA ELENA", "TALISAY", "VINZONS"
  ];

  const filteredFarms = municipalities.map(mun => farms.find(farm => farm.mun === mun)).filter(Boolean);

  return (
    <Box sx={{ display: 'flex', pl: 2, maxHeight: 'calc(100% * .85)' }} ref={containerRef}>
      <Box sx={{ overflowY: 'auto', minHeight: 'calc(100% * .85)' }}>
        <Timeline
          keys={keys}
          groups={filteredFarms}
          onItemSelect={(item) => setClicked(events.find(event => event.id === item))}
          onItemDeselect={() => setClicked({})}
          itemRenderer={itemRender}
          items={events}
          lineHeight={35}
          sidebarContent={<div>QP Farms</div>}
          defaultTimeStart={moment().add(-2, 'month')}
          defaultTimeEnd={moment().add(9, 'month')}
          maxZoom={1.5 * 365.24 * 86400 * 1000}
          minZoom={1.24 * 86400 * 1000 * 7 * 3}
          itemTouchSendsClick={false}
          itemHeightRatio={0.75}
          showCursorLine
          canMove={false}
        >
          <TimelineMarkers>
            <CursorMarker>
              {({ styles, date }) => (
                <div style={{ ...styles, backgroundColor: '#22b14c' }}>
                  <Paper
                    elevation={3}
                    className='date-hover'
                    sx={{
                      position: 'absolute',
                      left: '-40',
                      width: 80,
                      p: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#ffb550',
                      color: '#fff',
                    }}
                  >
                    {new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                  </Paper>
                </div>
              )}
            </CursorMarker>
            <TodayMarker>
              {({ styles }) => (
                <div style={{ ...styles, width: '0.3rem', backgroundColor: 'rgba(255,0,0,0.5)' }} />
              )}
            </TodayMarker>
          </TimelineMarkers>
          <TimelineHeaders className='timeline-header'>
            <SidebarHeader>
              {({ getRootProps }) => <h3 {...getRootProps()}>QP Farm</h3>}
            </SidebarHeader>
            <DateHeader sticky unit="primaryHeader" />
            <DateHeader sticky />
          </TimelineHeaders>
        </Timeline>
      </Box>
      {Object.keys(clicked).length !== 0 && <SideDetails farms={farms} eventClicked={clicked} />}
    </Box>
  );
}

export default FarmsSchedule;
