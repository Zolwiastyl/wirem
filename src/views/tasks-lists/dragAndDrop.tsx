import { putItAbove, putItBelow } from "../../api/generateOrdinalNumber";
import { curriedMoveToAnotherGroup } from "../../api/moveToAnotherGroup";
import { ClientAPI, Status, TasksStateProps } from "../../types";

/**
 *
 * @param event on which it will work
 * @param state in brackets - tasks and setTasks
 * @param client client from Auth0
 * @param status of group in which it is triggered
 */

export function handleDrop(
	event: React.DragEvent<HTMLElement>,
	{ tasks, setTasks }: TasksStateProps,
	clientApi: ClientAPI,
	status: Status
) {
	event.preventDefault();
	const taskId = event.dataTransfer.getData("text/plain");

	if (
		event.pageY - event.currentTarget.offsetTop >
		event.currentTarget.offsetHeight / 2
	) {
		const ordinals = putItBelow(taskId)(event.currentTarget.id)(tasks);

		const taskToSave = {
			...tasks.filter((task) => task.frontEndId === taskId)[0],
			ordinalNumber: (ordinals[0] + ordinals[1]) / 2,
		};
		clientApi.callApi(
			curriedMoveToAnotherGroup({ tasks, setTasks })(status.statusName)(
				taskToSave
			)
		);
	} else {
		const ordinals = putItAbove(taskId)(event.currentTarget.id)(tasks);

		const newOrdinal = () => {
			if (ordinals) {
				return ordinals[0] + ordinals[1];
			}
		};
		const taskToSave = {
			...tasks.filter((task) => task.frontEndId === taskId)[0],
			ordinalNumber: newOrdinal(),
		};
		clientApi.callApi(
			curriedMoveToAnotherGroup({ tasks, setTasks })(status.statusName)(
				taskToSave
			)
		);
	}
}
