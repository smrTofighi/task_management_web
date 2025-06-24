import React from 'react'

const TaskTile = ({text}) => {
  return (
    <label className="text-xs font-medium text-slate-600">{text}</label>
  )
}

export default TaskTile