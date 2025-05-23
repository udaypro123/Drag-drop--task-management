// ListItem.tsx

import {
	Box,
	Typography,
	Button,
	Tooltip,
	styled,
	InputBase,
} from '@mui/material';

import Grid from '@mui/material/Grid';
import {getItems, patchItemOrder, updateItem} from '../crudOperation/apiService';
import {useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteItem} from "../crudOperation/apiService";
import {useSnackbar} from 'notistack';
import {useNavigate} from 'react-router';
import VerifiedIcon from '@mui/icons-material/Verified';
// import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import SearchIcon from '@mui/icons-material/Search';

interface ListItemProps {

}

const Search = styled('div')(({theme}) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "rgb(130, 0, 177)",
	'&:hover': {
		backgroundColor: "rgb(103, 2, 140)",
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	color: "white",
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
	color: 'white',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1.7, 3, 0, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',

		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));



export default function Dashboard({ }: ListItemProps) {

	const [rows, setRows] = useState<any>([]);
	const navigate = useNavigate()
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
	const {enqueueSnackbar} = useSnackbar();
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredRows, setFilteredRows] = useState([]);


	useEffect(() => {
		const timer = setTimeout(() => {
			const term = searchTerm.toLowerCase();
			const filtered = rows.filter((row: any) =>
				Object.values(row).some(val =>
					String(val).toLowerCase().includes(term)
				)
			);
			setFilteredRows(filtered);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchTerm, rows]);


	const handlEdit = async (dataVal: any) => {
		console.log("dataVal", dataVal)
		navigate("/listItemCreate", {state: {dataVal}})
	};

	const handlDelete = async (dataVal: any) => {
		await deleteItem(dataVal?.id)
		setRows((prev: any) => prev.filter((item: any) => item.id != dataVal?.id))
		enqueueSnackbar('Item Deleted Sucessfully', {variant: 'success'});
	}

	const handlView = async (dataVal: any) => {
		await updateItem(dataVal?.id, {...dataVal, iscomplete: !dataVal.iscomplete});
		fetchItems();
	}

	const handleDrop = async (index: number) => {
		if (draggedIndex === null || draggedIndex === index) return;

		const updated = [...rows];
		const draggedItem = updated[draggedIndex];
		updated.splice(draggedIndex, 1);        // remove dragged item
		updated.splice(index, 0, draggedItem);  // insert at new position

		// Update the 'order' property based on new positions (1-based)
		const updatedWithOrder = updated.map((item, idx) => ({
			...item,
			order: idx + 1,
		}));

		setRows(updatedWithOrder);
		setDraggedIndex(null);
		console.log("updatedWithOrder", updatedWithOrder)
		// Persist order update to backend for each item
		try {
			await Promise.all(updatedWithOrder.map(async (item: any) => await patchItemOrder(item.id, {order: item.order})));
		} catch (error) {
			console.error("Failed to update order:", error);
		}
	};


	const fetchItems = async () => {
		const response = await getItems();
		const sortedRows = response.data.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
		setRows(sortedRows);
		setFilteredRows(sortedRows)
	};

	useEffect(() => {
		fetchItems();
	}, []);

	const createListItem = () => {
		navigate("/listItemcreate");
	};

	return (
		<Box sx={{width: '80%', px: 2, py: 3, paddingBottom: "3rem", margin: "5rem auto"}}>
			<Grid container size={{xs: 10, md: 10}} sx={{display: "flex", justifyContent: "space-between"}}>
				<Typography variant="h5" sx={{width: '50%', px: 5}} fontWeight={600} gutterBottom>
					All List : <span color='white' >({rows?.length > 0 && rows.length})</span>
				</Typography>

				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{'aria-label': 'search'}}
						onChange={(e: any) => setSearchTerm(e.target.value)}
					/>
				</Search>

				<Button variant="contained" sx={{mb: 2, mr: 5, backgroundColor: "rgb(101, 13, 133)", color: "white", textTransform: "capitalize"}} onClick={createListItem}>
					Create List
				</Button>
			</Grid>

			{
				rows?.length > 0 && <Box sx={{cursor: "pointer", mt: 5, mb: 5}}>
					<Grid container justifyContent="center">
						<Grid
							size={{xs: 12, md: 10}}
							sx={{
								width: "90%",
								borderRadius: ".3rem",
								boxShadow: " -7px -7px 0px -3px rgb(255, 255, 255)",
								backgroundColor: "rgb(54, 21, 66)",
								padding: 2,
							}}
							alignItems="center"
						>

							<Grid
								size={{xs: 10, md: 4}}
								sx={{
									width: "30%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography variant="h6" textAlign={"center"} color='white' >Title</Typography>
							</Grid>

							<Grid
								size={{xs: 10, md: 5}}
								sx={{
									width: "50%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<Typography variant="h6" textAlign={"center"} color='white'>Description</Typography>
							</Grid>

							<Grid
								size={{xs: 10, md: 3}}
								sx={{
									width: "20%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									gap: 2,
								}}
							>
								<Typography variant="h6" textAlign={"center"} color='white' >Action</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			}


			<Box
				sx={{
					width: '100%',
					height: "auto",
					margin: "auto",
					'& .MuiDataGrid-root': {
						borderRadius: 2,
						boxShadow: 2,
					},
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: '#f5f5f5',
						fontWeight: 'bold',
					},
				}}

			>

				{filteredRows.length > 0 && filteredRows.map((itemData: any, index: number) => (
					<Box
						key={index}
						draggable
						onDragStart={() => setDraggedIndex(index)}
						onDragOver={(e) => e.preventDefault()}
						onDrop={() => handleDrop(index)}
						sx={{cursor: "pointer", mt: 3, }}
					>
						<Grid container justifyContent="center">
							<Grid
								size={{xs: 12, md: 10}}
								sx={{
									width: "90%",
									borderRadius: ".3rem",
									boxShadow: " 7px 7px 0px -4px rgb(65, 13, 83)",
									padding: 2,
									backgroundColor: "rgb(255, 255, 255)",
									// borderBottomRightRadius: "1.8rem",
									borderBottom: "1px solid rgb(157, 9, 152)",
									":hover": {backgroundColor: "rgb(64, 255, 169)"}
								}}
								alignItems="center"
							>
								{/* Title */}
								<Grid
									size={{xs: 10, md: 4}}
									sx={{
										width: "30%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Typography color={itemData?.iscomplete ? "hsl(0, 100.00%, 55.70%)" : "black"} sx={{textDecoration: itemData?.iscomplete ? "line-through" : ""}} fontSize={18} textTransform={"capitalize"}>{itemData?.title}</Typography>
								</Grid>

								{/* Description */}
								<Grid
									size={{xs: 12, md: 5}}
									sx={{
										width: "50%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Typography color={itemData?.iscomplete ? "rgb(255, 31, 31)" : "black"} sx={{textDecoration: itemData?.iscomplete ? "line-through" : ""}} textTransform={"capitalize"} fontSize={16}>{itemData?.description}</Typography>
								</Grid>

								{/* Action Buttons */}
								<Grid
									size={{xs: 10, md: 3}}
									sx={{
										width: "20%",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										gap: 2,
									}}
								>
									{itemData?.iscomplete && (
										<Tooltip title="Completed ">
											<VerifiedIcon
												onClick={() => handlView(itemData)}
												sx={{cursor: 'pointer', color: 'rgb(22, 221, 0)'}}
											/>
										</Tooltip>
									)}

									{!itemData?.iscomplete && (
										<Tooltip title="Mark as Complete">
											<HourglassEmptyIcon
												onClick={() => handlView(itemData)}
												sx={{cursor: 'pointer', color: 'rgb(190, 165, 0)'}}
											/>
										</Tooltip>
									)}

									<Tooltip title="Edit">
										<EditIcon
											onClick={() => handlEdit(itemData)}
											sx={{cursor: 'pointer', color: 'rgb(186, 6, 156)'}}
										/>
									</Tooltip>

									<Tooltip title="Delete">
										<DeleteIcon
											onClick={() => handlDelete(itemData)}
											sx={{cursor: 'pointer', color: 'rgb(255, 26, 83)'}}
										/>
									</Tooltip>
								</Grid>
							</Grid>
						</Grid>
					</Box>
				))}


				{filteredRows.length <= 0 &&
					<Box sx={{mt: 5}}>
						<Grid container sx={{height: "10rem", width: "100%", mt: 2, margin: "auto"}}>
							<Grid size={12} rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} sx={{height: "100%", width: "90%", borderRadius: ".3rem", paddingBottom: "3rem", boxShadow: "rgba(125, 125, 125, 0.4) -1px -1px 1px, rgba(128, 122, 122, 0.3) 1px 1px 1px -1px, rgba(152, 146, 146, 0.2) 1px -1px 1px", display: "flex", justifyContent: "center", alignItems: "center", margin: "auto"}}>

								<Typography variant='h3' sx={{padding: "10px ", color: "grey", fontFamily: "verdana"}}>No Data</Typography>
							</Grid>
						</Grid>
					</Box>
				}
			</Box>
		</Box >
	);
}
