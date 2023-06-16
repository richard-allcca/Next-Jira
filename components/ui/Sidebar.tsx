import React, { useContext } from "react";

import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";

import { UIContext } from "./../../context/ui-context";

// icons
import ImboxOutLinedIcon from "@mui/icons-material/InboxOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const listMenu: string[] = ["Inbox", "Started", "Send Email", "Draft"];

export const Sidebar = () => {
	const { isOpenSidemenu, closeSideMenu } = useContext(UIContext);

	return (
		<Drawer anchor="left" open={isOpenSidemenu} onClose={closeSideMenu}>

			<Box sx={{ width: 200 }}>
				<Box sx={{ padding: "5px 10px" }}>
					<Typography>Menú</Typography>
				</Box>

				<List>
					{listMenu.map((menu, i) => (
						<ListItem key={menu}>
							<ListItemIcon>
								{i % 2 ? <ImboxOutLinedIcon /> : <MailOutlineIcon />}
							</ListItemIcon>

							<ListItemText primary={menu}></ListItemText>
						</ListItem>
					))}
				</List>

				<Divider />

				<List>
					{listMenu.map((menu, i) => (
						<ListItem key={menu}>
							<ListItemIcon>
								{i % 2 ? <ImboxOutLinedIcon /> : <MailOutlineIcon />}
							</ListItemIcon>

							<ListItemText primary={menu}></ListItemText>
						</ListItem>
					))}
				</List>
			</Box>

		</Drawer>
	);
};
