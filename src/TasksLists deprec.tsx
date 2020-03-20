import React from "react";
import { StateProps } from "./interfaces";
import { Task, TaskProps } from "./types";

export function TasksLists(taskState: TaskProps) {
  //
  function moveToGroup(
    groupName: string,
    eventTarget: React.MouseEvent<HTMLButtonElement>,
    taskState: TaskProps
  ) {
    eventTarget.preventDefault();
    const newArray = taskState.tasks.slice();
    const indexOfChangedElement = newArray.findIndex(
      task => task.name == eventTarget.currentTarget.id.toString()
    );
    const arrayToSave = newArray
      .slice(0, indexOfChangedElement)
      .concat(newArray.slice(indexOfChangedElement + 1, newArray.length));
    taskState.setTasks(arrayToSave);
  }

  function ListOfTasksInCategory(taskState: TaskProps, Heading: React.FC) {
    return (
      <div>
        <Heading />
        <div className="tasks-element">
          {TasksElement(taskState, moveToDone)}
        </div>
      </div>
    );
  }

  function buttonMoveTo(props: ButtonProps) {
    function buttonOnClick(taskName: string, moveTo: string) {
      const nameOfTask = taskName;
      const moveTarget = moveTo;
      const newArrayOfTasks = taskState.tasks.slice();
      const indexOfTaskToChange = newArrayOfTasks.findIndex(
        task => task.name == nameOfTask
      );
      newArrayOfTasks
        .slice(0, indexOfTaskToChange)
        .concat(
          newArrayOfTasks.slice(indexOfTaskToChange + 1, newArrayOfTasks.length)
        );
      newArrayOfTasks.unshift({ name: nameOfTask, status: moveTarget });
      props.state.setTasks(newArrayOfTasks);
    }
    return (
      <button
        onClick={eventTarget => {
          buttonOnClick(eventTarget.currentTarget.id, props.whereToMove);
        }}
      >
        move to {props.whereToMove}
      </button>
    );
    //{buttonMoveto(buttonProps)}
  }

  function makePropsForTask(status: string) {
    const arrayOfTasksToRender = taskState.tasks.filter(
      element => element.name == status
    );
    return;
  }
  function TasksElement(
    { tasks }: StateProps,
    clickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
  ) {
    return tasks.map(task => {
      return (
        <div className="task-element">
          {task.name}
          {buttonMoveTo(propsWraper)}
        </div>
      );
    });
  }
  const propsWraper: ButtonProps = {
    state: taskState,
    whereToMove: "done"
  };
  const moveToDone: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void = event => {
    event.preventDefault();
    const doneTasksArrayToSave = taskState.tasks.slice();

    const toDoTasksArrayToSave = taskState.tasks.slice();
    const task = event.currentTarget.id;

    const found = toDoTasksArrayToSave.find(
      (element: Task) => element.name == task
    );

    toDoTasksArrayToSave.splice(toDoTasksArrayToSave.indexOf(found as Task), 1);
    console.log({ toDoTasksArrayToSave });
    //sendNewTask({ name: task, status: "done" });
    doneTasksArrayToSave.unshift({ name: task, status: "done" });
    taskState.setTasks(doneTasksArrayToSave);
    taskState.setTasks(toDoTasksArrayToSave);
  };
  return <div>ola</div>;
}
console.log("a");

interface TaskGroupListProps {
  tasksState: StateProps;
  buttonGroup: Array<React.FC>;
}

interface ButtonProps {
  state: TaskProps;
  whereToMove: string;
}

export const dupa = [];