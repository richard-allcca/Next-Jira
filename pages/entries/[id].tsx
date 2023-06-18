import { useState, ChangeEvent, useMemo, FC, useContext } from "react";

import { isValidObjectId } from "mongoose";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
	Grid,
	Card,
	CardHeader,
	CardContent,
	TextField,
	CardActions,
	Button,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	capitalize,
	IconButton,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";


import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { Entry, EntryStatus } from "../../interfaces";
import { getCreationDate } from "../../utils";
import { Layout } from "../../components/layouts";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface Props {
	entryInDb: Entry;
}

// TODO - IMPLEMENTAR ELIMINACION DE ENTRADA

const EntryPage: FC<Props> = ({ entryInDb }) => {
	const { updateEntry } = useContext(EntriesContext);
  const router = useRouter();

	const [inputValue, setInputValue] = useState(entryInDb.description);
	const [status, setStatus] = useState<EntryStatus>(entryInDb.status);
	const [touched, setTouched] = useState(false);

	const isValidInput = useMemo(
    () => inputValue.length <= 0,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[inputValue, touched]
	);

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
		setStatus(event.target.value as EntryStatus);
	};

	const onSave = () => {
		if (inputValue.trim().length === 0) return;

		const newEntry: Entry = {
			...entryInDb,
			status,
			description: inputValue,
		};

		updateEntry(newEntry, true);
    router.back()
	};

	return (
		<Layout title={inputValue.substring(0, 20) + "... "}>
			<Grid
				container
				justifyContent="center"
				sx={{ marginTop: 2 }}
			>
				<Grid
					item
					xs={12}
					sm={8}
					md={6}
				>
					<Card>
						<CardHeader
							title={`Entrada: `}
							subheader={`Creado ${getCreationDate(entryInDb.createAt)}`}
						/>

						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder="Nueva entrada"
								autoFocus
								multiline
								label="Nueva entrada"
								value={inputValue}
								onBlur={() => setTouched(true)}
								onChange={onInputChange}
								helperText={isValidInput && "Ingrese un valor "}
								error={isValidInput}
							/>

							<FormControl>
								<FormLabel>Estado:</FormLabel>
								<RadioGroup
									row
									value={status}
									onChange={onStatusChanged}
								>
									{validStatus.map((option) => {
										return (
											<FormControlLabel
												key={option}
												value={option}
												control={<Radio />}
												label={capitalize(option)}
											/>
										);
									})}
								</RadioGroup>
							</FormControl>
						</CardContent>

						<CardActions>
							<Button
								startIcon={<SaveOutlinedIcon />}
								variant="contained"
								fullWidth
								onClick={onSave}
								disabled={inputValue.length == 0}
							></Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>

			<IconButton
				sx={{
					position: "fixed",
					bottom: 30,
					right: 30,
					backgroundColor: "error.dark",
				}}
			>
				<DeleteOutlinedIcon />
			</IconButton>
		</Layout>
	);
};

// NOTE - You should use getServerSideProps when: the page must be built at the request of the user
export const getServerSideProps: GetServerSideProps = async (ctx) => {
	// const {data} = await
	const { id } = ctx.params as { id: string };

	const entryInDb = await dbEntries.getEntryById(id);

	if (!isValidObjectId(id)) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			entryInDb,
		},
	};
};

export default EntryPage;
