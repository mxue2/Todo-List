import React, { useState, useEffect, useRef } from 'react';
import Task from '../sections/Task';
import todoImage from '../../assets/to-do-list.svg';
import flagGrey from '../../assets/flag_grey.svg';
import flagRed from '../../assets/flag_red.svg';
import flagBlue from '../../assets/flag_blue.svg';
import flagOrg from '../../assets/flag_org.svg';
import tickImg from '../../assets/tick.svg';

const Mainboard = () => {
  const [itemEditor, setItemEditor] = useState(false);
  const [priority, setPriority] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [id, setId] = useState(0);
  const [taskState, setTaskState] = useState(false);
  const [taskPriority, setTaskPriority] = useState(3);
  const flags = [
    {
      flagId: 0, flagImg: flagRed, text: 'Priority 1', ticked: false,
    },
    {
      flagId: 1, flagImg: flagOrg, text: 'Priority 2', ticked: false,
    },
    {
      flagId: 2, flagImg: flagBlue, text: 'Priority 3', ticked: false,
    },
    {
      flagId: 3, flagImg: flagGrey, text: 'Priority 4', ticked: true,
    },
  ];
  const [flagList, setFlagList] = useState(flags);

  const handleTaskList = (val = null) => {
    if (val) {
      console.log(val.taskPosition);
      const newTaskList = taskList.splice(val.taskPosition, 0, {
        taskId: id, content: val.content, completed: false, taskPriority: val.taskPriority,
      });
      console.log(newTaskList);
      setTaskList([...taskList, newTaskList]);
      console.log(taskList);
    } else {
      setTaskList([...taskList, {
        taskId: id, content: taskInput, completed: false, taskPriority,
      }]);
    }
    setId(id + 1);
    setTaskInput('');
  };

  const handleTaskPriority = (taskId, updatePriority) => {
    taskList.map((task) => {
      if (task.taskId === taskId) {
        setTaskPriority(updatePriority);
      }
      return task;
    });
  };

  const getTaskPosition = (content) => {
    const taskIndex = taskList.findIndex((task) => task.content === content);
    return taskIndex + 1;
  };

  // Get current date
  const getDate = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    let weekDay = new Date().getDay();
    weekDay = days[weekDay];
    const date = new Date();
    const day = date.getDate();
    // get the month short name
    const month = date.toLocaleString('default', { month: 'short' });
    const today = `${weekDay} ${day} ${month}`;
    return today;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const removeTask = (taskId) => {
    const newTaskList = taskList.filter((task) => {
      return task.taskId !== taskId;
    });
    setTaskList(newTaskList);
  };

  const completeTask = (taskCompleted) => {
    setTaskState(taskCompleted);
  };

  // get the previous value of props or state when using react hooks
  const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  };

  const prevState = usePrevious(taskList);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTaskState(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [taskState]);

  return (
    <div className="mainboard-container">
      <div className="main-content">
        <header className="main-content-header">
          <h1>Today</h1>
          <p>{getDate()}</p>
        </header>
        {/* tasklist */}
        { taskList.map((task) => {
          return (
            <Task
              content={task.content}
              taskRemoveFunc={removeTask}
              taskId={task.taskId}
              completeTaskFunc={completeTask}
              taskPriority={task.taskPriority}
              flagList={flags}
              handleTaskListFunc={handleTaskList}
              getTaskPositionFunc={() => getTaskPosition(task.content)}
              handleTaskPriorityFunc={handleTaskPriority}
            />
          );
        })}
        <div className="add-task">
          <div className={`${itemEditor ? 'hideEle' : 'showEle'}`}>
            <button
              type="button"
              className="add-task-btn"
              onClick={() => setItemEditor(true)}
            >
              <span className="plus-icon">
                <svg t="1592291255906" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3576" width="16" height="16">
                  <path d="M460.8 51.2v409.6h-409.6A51.2 51.2 0 0 0 0 512a51.2 51.2 0 0 0 51.2 51.2h409.6v409.6A51.2 51.2 0 0 0 512 1024a51.2 51.2 0 0 0 51.2-51.2v-921.6A51.2 51.2 0 0 0 512 0a51.2 51.2 0 0 0-51.2 51.2z" fill="#dd4b39" p-id="3577" />
                  <path d="M634.88 460.8m51.2 0l286.72 0q51.2 0 51.2 51.2l0 0q0 51.2-51.2 51.2l-286.72 0q-51.2 0-51.2-51.2l0 0q0-51.2 51.2-51.2Z" fill="#dd4b39" p-id="3578" />
                </svg>
              </span>
              <p className="plus-text">Add task</p>
            </button>
          </div>
          <div className={`${itemEditor ? 'showEle' : 'hideEle'}`}>
            <form className="item-editor" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder=" e.g. Buy gift tomorrow at 6pm p1 #Errands"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
              />
              <div className="item-editor-actions">
                <div className="actions-left">
                  <button
                    type="submit"
                    disabled={!taskInput}
                    className="add-task-btn"
                    onClick={() => handleTaskList()}
                  >
                    Add task
                  </button>
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => {
                      setTaskInput('');
                      setItemEditor(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <div className="actions-right">
                  <button
                    type="button"
                    className="item-action-priority"
                    onClick={() => setPriority(!priority)}
                  >
                    {flagList.filter((flag) => {
                      return (flag.ticked === true);
                    }).map((flag) => {
                      return (
                        <img src={flag.flagImg} alt={`${flag.text}`} />
                      );
                    }) }

                  </button>
                  <div className="dialog">
                    <div className={`${priority ? 'showEle' : 'hideEle'}`}>
                      <div className="dialog-nose" />
                      <div className="dropdown-select">
                        <ul className="dropdown-select-listbox">
                          {flagList.map((e) => {
                            return (
                              <li className={`dropdown-select-item ${e.ticked ? 'grey-bgc' : ''}`}>
                                <button
                                  type="button"
                                  className="select-item-container"
                                  onClick={() => {
                                    const newFlags = flagList.map((flag) => {
                                      if (flag.flagId === e.flagId) {
                                        setTaskPriority(flag.flagId);
                                        return { ...flag, ticked: true };
                                      }
                                      if (flag.flagId !== e.flagId) {
                                        return { ...flag, ticked: false };
                                      }
                                      return flag;
                                    });

                                    setFlagList(newFlags);
                                    setPriority(false);
                                  }}

                                >
                                  <div className="flag-info">
                                    <img src={e.flagImg} alt="Flag" />
                                    <span className="flag-text">{e.text}</span>
                                  </div>
                                  <img className={`${e.ticked ? 'showEle' : 'hideEle'}`} src={tickImg} alt="Tick" />
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="todo-content">
          <div className={`${taskList.length > 0 || itemEditor ? 'hideEle' : 'showEle'}`}>
            <img src={todoImage} alt="todo" width="180" height="180" />
            <div className="empty-state-header">
              <p>Get a clear view of the day ahead</p>
            </div>
            <div className="empty-state-body">
              <p>All your tasks that are due today will show up here.</p>
            </div>
            <div>
              <button
                type="button"
                className="empty-state-button"
                onClick={() => setItemEditor(true)}
              >
                Add a task
              </button>
            </div>
            <div className="empty-state-tooltip">
              <span className="tooltip-icon">
                <svg t="1592373015318" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10401" width="20" height="20">
                  <path d="M560 732.8C387.2 710.4 256 563.2 256 384s131.2-326.4 304-348.8C732.8 57.6 864 204.8 864 384s-131.2 326.4-304 348.8z" fill="#EF9943" p-id="10402" />
                  <path d="M416 723.2V672h32c195.2 0 352-156.8 352-352 0-80-28.8-156.8-73.6-214.4 83.2 64 137.6 166.4 137.6 278.4 0 195.2-156.8 352-352 352-32 0-64-3.2-96-12.8z" fill="#D86C2D" p-id="10403" />
                  <path d="M665.6 736H416c-19.2 0-32-12.8-32-32s12.8-32 32-32h236.8c108.8-54.4 179.2-166.4 179.2-288 0-176-144-320-320-320S192 208 192 384c0 83.2 32 160 89.6 220.8 12.8 12.8 12.8 32 0 44.8-12.8 12.8-32 12.8-44.8 0C166.4 576 128 483.2 128 384 128 172.8 300.8 0 512 0s384 172.8 384 384c0 150.4-86.4 288-224 348.8l-6.4 3.2z" fill="#545454" p-id="10404" />
                  <path d="M665.6 736h-233.6c-19.2 0-32-12.8-32-32s12.8-32 32-32h220.8c108.8-54.4 179.2-166.4 179.2-288 0-176-144-320-320-320S192 208 192 384c0 83.2 32 160 89.6 220.8 3.2 3.2 6.4 9.6 9.6 12.8 12.8 12.8 12.8 32 0 44.8-12.8 12.8-32 12.8-44.8 0-6.4-3.2-9.6-9.6-16-16C166.4 576 128 483.2 128 384 128 172.8 300.8 0 512 0s384 172.8 384 384c0 150.4-86.4 288-224 348.8l-6.4 3.2z" fill="#3C3C3C" p-id="10405" />
                  <path d="M512 448c54.4 0 96 41.6 96 96v128c0 35.2-28.8 64-64 64h-64c-35.2 0-64-28.8-64-64v-128c0-54.4 41.6-96 96-96z" fill="#FFFFFF" p-id="10406" />
                  <path d="M544 736h-64c-35.2 0-64-28.8-64-64v-128c0-54.4 41.6-96 96-96s96 41.6 96 96v128c0 35.2-28.8 64-64 64z m-32-224c-19.2 0-32 12.8-32 32v128h64v-128c0-19.2-12.8-32-32-32z" fill="#3C3C3C" p-id="10407" />
                  <path d="M448 704h192v160c0 60.8-41.6 108.8-96 124.8-54.4-12.8-96-64-96-124.8v-160z" fill="#E5E7EB" p-id="10408" />
                  <path d="M512 1024c-89.6 0-160-70.4-160-160v-128c0-35.2 28.8-64 64-64h256v192c0 89.6-70.4 160-160 160z m-96-288v128c0 54.4 41.6 96 96 96s96-41.6 96-96v-128h-192z" fill="#3C3C3C" p-id="10409" />
                  <path d="M419.2 169.6c12.8-9.6 35.2-9.6 44.8 6.4 9.6 12.8 9.6 35.2-6.4 44.8-12.8 9.6-25.6 22.4-32 38.4-9.6 16-12.8 32-16 48-3.2 16-19.2 28.8-35.2 28.8-16-3.2-28.8-19.2-28.8-35.2 3.2-25.6 12.8-48 25.6-70.4 9.6-25.6 28.8-44.8 48-60.8z" fill="#FBCB7C" p-id="10410" />
                </svg>
              </span>
              <span className="tooltip-text">Establish a daliy habit</span>
            </div>
          </div>
        </div>
      </div>
      <div className={`${taskState ? 'task-state' : 'hideEle'}`}>
        <div className="state-container">
          <div className="task-completed">
            <span>1 task completed</span>
          </div>
          <div className="undo">
            <button
              type="button"
              onClick={() => {
                setTaskList(prevState);
                setTaskState(false);
              }}
            >
              UNDO
            </button>
          </div>
          <div className="hide">
            <button
              type="button"
              onClick={() => setTaskState(false)}
            >
              HIDE
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Mainboard;
