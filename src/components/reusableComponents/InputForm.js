import React from 'react';
import FlagList from './flagListComponent/FlagList';

const InputForm = () => {
  return (
    <div className="input-form">
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
              })}

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
  );
};

export default InputForm;
