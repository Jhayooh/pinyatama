import React, { useState, useEffect } from 'react'
import Timeline, { CursorMarker, CustomMarker, DateHeader, SidebarHeader, TimelineHeaders, TimelineMarkers, TodayMarker } from 'react-calendar-timeline'
import './FarmSchedule.css'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase/Config'
import './ripple.css'
import Textfield from './Timeline'
import { Paper } from '@mui/material'

function FarmsSchedule({ farms, events }) {

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
  // const [farms, setFarms] = useState([])


  // useEffect(() => {
  //   const fetchFarms = async () => {
  //     try {
  //       const farmRef = collection(db, 'farms')
  //       const farmSnap = await getDocs(farmRef)
  //       const farmList = farmSnap.docs.map(doc => ({
  //         id: doc.uid,
  //         name: doc.name,
  //       }))
  //       setFarms(farmList)
  //     } catch (error) {
  //       console.error('Error fetching farms:', error)
  //     }
  //   }

  //   fetchFarms()
  // }, [])
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
            borderRadius: 16,
            boxShadow: `0 1px 5px 0 rgba(0, 0, 0, 0.2),
                       0 2px 2px 0 rgba(0, 0, 0, 0.14),
                       0 3px 1px -2px rgba(0, 0, 0, 0.12)`
          },
          onMouseDown: () => {
            console.log('on item click', item)
          }
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

  return (
    <Timeline
      keys={keys}
      groups={farms}
      onItemClick={(item) => console.log(item)}
      itemRenderer={itemRender}
      items={events}
      lineHeight={50}
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
        <DateHeader sticky/>
      </TimelineHeaders>
    </Timeline >
  )
}

export default FarmsSchedule