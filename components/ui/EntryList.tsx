import { List, Paper } from "@mui/material";
import { FC, useContext, useMemo, DragEvent } from "react";
import { EntriesContext } from "../../context/entries";

import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";
import { UIContext } from "./../../context/ui-context/UIContext";

import styles from "./EntryList.module.css";
interface Props {
	status: EntryStatus;
}

/**
 * se usara para cambiar el status de una cardEntry y ubicarla
 * La propiedad "draggable" no es soportada en Brave
 * @param status: Status identifica la columna de listado de notas
 * @returns Listado de CardEntry
 */
export const EntryList: FC<Props> = ({ status }) => {
	const { entries, updateEntry } = useContext(EntriesContext);
	const { isDraging, endDraging } = useContext(UIContext);

  /**
   * Detecta cambio en las "entries" para volver a filtrar y rederizar
   */
	const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    // eslint-disable-next-line react-hooks/exhaustive-deps
		[entries]
	);

	/**
	 * Aqui puede validar el elemento para decidir si este es permitido o no en este contenedor
	 * @param event recibe la data del elemento em movimientto con drag
	 */
	const allowDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	/**
	 * Obtiene el id de la card en movimiento drag para actualizar su estado y se detecte el cambio
	 * @param evento, recibe el id de event.dataTransfer.setData('text', entry._id)
	 */
	const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
		const id = event.dataTransfer.getData("text");

		const selectEntry = entries.find((e) => e._id === id)!;
		selectEntry.status = status;

		updateEntry(selectEntry);
		endDraging();
	};

	return (
		<div
			onDrop={onDropEntry}
			onDragOver={allowDrop}
			className={isDraging ? styles.dragging : ""}
		>
			<Paper
				className={styles.paper}
				sx={{ "&::-webkit-scrollbar": { display: "none" } }}
			>
				<List sx={{ opacity: isDraging ? 0.2 : 1, transition: "all .3s" }}>
					{entriesByStatus.map((entry) => {
						return (
							<EntryCard
								key={entry._id}
								entry={entry}
							/>
						);
					})}
				</List>
			</Paper>
		</div>
	);
};
