import React, { useState, useEffect, useRef } from 'react';
import selectTick from '../../assets/selectTick.svg';
import singleDot from '../../assets/singleDot.svg';
import editSvg from '../../assets/edit.svg';
import commentSvg from '../../assets/comment.svg';
import moreSvg from '../../assets/more.svg';
import taskList from '../../assets/taskList.svg';
import todayIcon from '../../assets/today.svg';
import tomorrowIcon from '../../assets/tomorrowIcon.svg';
import postponeIcon from '../../assets/postpone.svg';
import nextweekIcon from '../../assets/nextweek.svg';
import noDate from '../../assets/noDate.svg';
import rightArrowIcon from '../../assets/rightArrow.svg';
import duplicateIcon from '../../assets/duplicate.svg';
import deleteIcon from '../../assets/delete.svg';

const Task = (props) => {
  // const [taskList, setTaskList] = useState(props);
  // console.log((taskList.content));
  const wrapperRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [priority, setPriority] = useState(props.taskPriority);
  // const [priorityUpdate, setPriorityUpdate] = useState(false);

  const handleCircleColor = () => {
    const colorList = ['redCircle', 'orgCircle', 'blueCircle', 'greyCircle'];
    const circleColor = colorList[priority];
    return circleColor;
  };

  const handleClick = (e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, false);
    };
  }, []);

  return (
    <div className="task-list-item">
      <button
        type="button"
        className={`item-checkbox ${handleCircleColor()}`}
        aria-label="select task"
        onClick={() => {
          props.taskRemoveFunc(props.taskId);
          props.completeTaskFunc(true);
          // const timer = setTimeout(() => {
          //   props.completeTaskFunc(false);
          // }, 1000);
        }}
      >
        <span className="selected">
          {/* <img src={selectTick} alt="selected" className="tick-img" /> */}
          <svg t="1592982073730" className="icon tick-img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27140" width="16" height="16"><path d="M468.52096 682.9568c-13.00992 0-25.2928-5.05856-34.688-14.45376-0.72192-0.72192-0.72192-1.44384-1.44384-1.44384L256.78336 450.98496c-7.94624-9.3952-6.5024-23.84896 3.61472-31.7952 9.39008-7.94624 23.84896-6.5024 31.7952 3.61472l174.16192 214.6304c1.44384 1.43872 2.88768 1.43872 5.05856-0.72704l307.57376-306.57024a22.05696 22.05696 0 0 1 31.80032-0.72192 22.05184 22.05184 0 0 1 0.72192 31.7952l-308.29568 307.29216c-9.40032 9.39008-21.68832 14.45376-34.69312 14.45376z" p-id="27141" fill="currentColor" /></svg>
        </span>
      </button>
      <div className="task-list-item-content">
        <div className="task-content">
          <span>{props.content}</span>
          <span>
            position:
            {props.getTaskPositionFunc()}
          </span>
        </div>
        <div className="task-content-info-tags">
          <span className="task-content-info-project">
            <a href="/">
              <span className="task-content-info-text">Inbox</span>
              <img src={singleDot} alt="Circle" />
            </a>
          </span>
        </div>
      </div>
      <div className="task-list-item-actions">
        <button className="edit" aria-label="Edit" type="button">
          <img src={editSvg} alt="Edit Icon" />
        </button>
        <button className="comment" aria-label="Comment" type="button">
          <img src={commentSvg} alt="Comment Icon" />
        </button>
        <button
          className="more"
          aria-label="More"
          type="button"
          onClick={() => setIsVisible(true)}
        >
          <img src={moreSvg} alt="MoreIcon" />
        </button>
        <div className={`${isVisible ? 'popover-content' : 'hideEle'}`} ref={wrapperRef}>
          <ul className="menu-list">
            <li className="menu-item">
              <button type="button" className="menu-item-action">
                <div className="menu-item-icon">
                  <img src={taskList} alt="Task List Icon" />
                </div>
                <div className="menu-item-content">
                  <p>Go to project</p>
                </div>
              </button>
            </li>
            <li className="menu-separator" />
            <li className="section-menu">
              <div className="section-menu-label">Schedule</div>
              <div className="scheduler-holder">
                <div className="icon-list">
                  <button type="button" className="icon-scheduler" aria-label="Today">
                    <img src={todayIcon} alt="Tomorrow Icon" />
                  </button>
                  <button type="button" className="icon-scheduler" aria-label="Tomorrow">
                    <img src={tomorrowIcon} alt="Tomorrow Icon" />
                  </button>
                  <button type="button" className="icon-scheduler" aria-label="Next week">
                    <img src={nextweekIcon} alt="Tomorrow Icon" />
                  </button>
                  <button type="button" className="icon-scheduler" aria-label="Postpone to tomorrow">
                    <img src={postponeIcon} alt="Postpone Icon" />
                  </button>
                  <button type="button" className="icon-scheduler" aria-label="Postpone to tomorrow">
                    <img src={noDate} alt="No Date Icon" />
                  </button>
                </div>
              </div>
            </li>
            <li className="section-menu priority-selector">
              <div className="section-menu-label">Priority</div>

              <div className="priority-list">
                {props.flagList.map((flag) => {
                  return (
                    <button
                      type="button"
                      className="priority-item"
                      onClick={() => {
                        setPriority(flag.flagId);
                        // setPriorityUpdate(true);
                        props.handleTaskPriorityFunc(props.taskId, flag.flagId);
                        setIsVisible(false);
                      }}
                    >
                      <img src={flag.flagImg} alt="Priority Flag" />
                    </button>
                  );
                })}
              </div>
            </li>
            <li className="menu-separator" />

            <li className="menu-item">
              <button type="button" className="menu-item-action">
                <div className="menu-item-icon">
                  <img src={rightArrowIcon} alt="Right Arrow Icon" />
                </div>
                <div className="menu-item-content">
                  <p>Move to project</p>
                </div>
              </button>
            </li>
            <li className="menu-item">
              <button
                type="button"
                className="menu-item-action"
                onClick={() => {
                  props.handleTaskListFunc({
                    content: props.content,
                    taskPriority: props.taskPriority,
                    taskPosition: props.getTaskPositionFunc(),
                  });
                  setIsVisible(false);
                }}
              >
                <div className="menu-item-icon">
                  <img src={duplicateIcon} alt="Duplicate Icon" />
                </div>
                <div className="menu-item-content">
                  <p>Duplicate</p>
                </div>
              </button>
            </li>
            <li className="menu-separator" />
            <li className="menu-item delete-item">
              <button
                type="button"
                className="menu-item-action"
                onClick={() => {
                  props.taskRemoveFunc(props.taskId);
                  props.completeTaskFunc(true);
                  setIsVisible(false);
                }}
              >
                <div className="menu-item-icon">
                  <img src={deleteIcon} alt="Duplicate Icon" />
                </div>
                <div className="menu-item-content">
                  <p>Delete task</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Task;
