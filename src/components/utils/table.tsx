// import {Grid, Typography} from "@mui/material"
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import {deleteItem, updateItem} from "../crudOperation/apiService";

// interface TableProps {
// 	item: any;
// 	onDelete: any,
// 	router: any
// }


// const TableData: React.FC<TableProps> = ({item, onDelete, router}) => {
// 	const data: any = {...item}

// 	const handlEdit = async (dataVal: any) => {
// 		console.log("dataValdelete", dataVal)
// 		router.navigate("/listItemcreate", {state: dataVal});
// 	};

// 	const handlDelete = async (dataVal: any) => {
// 		await deleteItem(dataVal?.id)
// 		onDelete(dataVal?.id)
// 	}

// 	const handlView = (dataVal: any) => {
// 		console.log("data0000", dataVal)
// 	}

// 	return <>
// 		<Grid container sx={{height: "3rem", width: "100%", mt: 2, }}>

// 			<Grid size={12} rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} sx={{height: "100%", width: "100%", borderRadius: ".3rem", paddingBottom: "3rem", boxShadow: "rgba(125, 125, 125, 0.4) -1px -1px 1px, rgba(128, 122, 122, 0.3) 1px 1px 1px -1px, rgba(152, 146, 146, 0.2) 1px -1px 1px", display: "flex", }}>

// 				<Grid item size={5} md={4} xs={12}>
// 					<Typography sx={{padding: "10px "}}>{data?.title}</Typography>
// 				</Grid>
// 				<Grid item size={5} md={4} xs={12}>
// 					<Typography sx={{padding: "10px "}}>{data?.description}</Typography>
// 				</Grid>
// 				<Grid item size={2} sx={{padding: "10px"}} md={4} xs={12}>
// 					<EditIcon onClick={() => handlEdit(data)} sx={{cursor: "pointer"}} />
// 					<VisibilityIcon sx={{marginLeft: "1rem", cursor: "pointer"}} onClick={() => handlView(data)} />
// 					<DeleteIcon sx={{marginLeft: "1rem", cursor: "pointer"}} onClick={() => handlDelete(data)} />
// 				</Grid>
// 			</Grid>

// 		</Grid>
// 	</>
// }
// export default TableData;
