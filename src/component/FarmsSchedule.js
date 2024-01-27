import React from 'react'
import Timeline from 'react-calendar-timeline'
import './FarmSchedule.css'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

function FarmsSchedule({ farms, events }) {
  return (
    <div className='timeline-container'>
      <Timeline
        groups={farms}
        items={events}
        lineHeight={48}
        defaultTimeStart={moment().add(-9, 'month')}
        defaultTimeEnd={moment().add(9, 'month')}

      />
    </div>
  )
}

export default FarmsSchedule