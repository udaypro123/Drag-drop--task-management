import {Box, Button, TextField, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {createItem, getItems, updateItem} from '../crudOperation/apiService';
import {useSnackbar} from 'notistack';
import {useLocation, useNavigate} from 'react-router-dom';

interface ListItemProps {

}

export default function ListItemCreate({ }: ListItemProps) {
	const [rows, setRows] = useState<any>([]);
	const maxOrder = rows.length > 0 ? Math.max(...rows.map((i: any) => i.order)) : 0;
	const navigate = useNavigate()
	const location = useLocation();
	const [form, setForm] = useState({title: '', description: '', id: 0, order: maxOrder, iscomplete: false});
	const {enqueueSnackbar} = useSnackbar();
	const dataVal = location?.state?.dataVal;

	useEffect(() => {
		if (dataVal) {
			console.log("dataVal", dataVal);
			setForm({title: dataVal?.title, description: dataVal?.description, id: dataVal?.id, order: dataVal?.order, iscomplete: dataVal?.iscomplete})
		}
	}, [dataVal])

	const fetchItems = async () => {
		const response = await getItems();
		setRows(response.data);
	};

	useEffect(() => {
		fetchItems();
	}, [maxOrder]);

	const handleChange = (e: any) => {
		if (dataVal) {
			setForm({...form, [e.target.name]: e.target.value, id: dataVal?.id, order: dataVal?.order, iscomplete: dataVal?.iscomplete});
		} else {
			setForm({...form, [e.target.name]: e.target.value, id: Date.now(), order: maxOrder + 1, });
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		await createItem(form);
		enqueueSnackbar('Item Created Sucessfully', {variant: 'success'});
		setForm({title: '', description: '', id: Date.now(), order: 0, iscomplete: false});
		navigate("/");
	};

	const handleEdit = async (e: any) => {
		e.preventDefault();
		await updateItem(dataVal?.id, form);
		enqueueSnackbar('Item Updated Sucessfully', {variant: 'success'});
		setForm({title: '', description: '', id: Date.now(), order: 0, iscomplete: false});
		navigate("/");
	};


	return (
		<Box
			sx={{
				width: '100%',
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				px: 2,
				py: 3,
				paddingBottom: "3rem",
				marginTop: "5rem"
			}}
		>
			<Typography variant="h4" sx={{width: '50%', px: 5, mb: 5, textAlign: "center", color: "rgb(120, 9, 160)"}} fontWeight={600} gutterBottom>
				Create List Daily Task
			</Typography>

			<TextField
				name="title"
				placeholder={!form.description ? "Enter Title" : form.description}
				onChange={handleChange}
				value={form.title}
				sx={{mb: 2, width: '500px', color: "white"}}
			/>
			<TextField
				name="description"
				placeholder={!form.description ? "Enter description" : form.description}
				onChange={handleChange}
				value={form.description}
				sx={{mb: 2, width: '500px', color: "white"}}
			/>
			<Button variant="contained" sx={{px: 3, mt: 2, backgroundColor: "rgb(101, 13, 133)", color: "white", textTransform: "capitalize"}} onClick={dataVal == null ? handleSubmit : handleEdit}>
				{dataVal == null ? "Create" : "Update"}
			</Button>
		</Box>
	);
}
