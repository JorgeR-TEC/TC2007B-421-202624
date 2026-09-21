import {Datagrid, List, TextField, Edit, SimpleForm, TextInput} from "react-admin";

export const listarProductos = ()=>(
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="nombre" />
            <TextField source="empresa" />
        </Datagrid>
    </List>
);

export const editarProductos = ()=>(
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="nombre" />
            <TextInput source="empresa" />
        </SimpleForm>
    </Edit>
);

