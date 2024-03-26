import React, { useContext } from 'react'
import './Users.css'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import {  useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUsersFromServer } from '../../Redux/Store/Users';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import searchDataValue from '../../Context/SearchData';

export default function Users() {

    const dispatch = useDispatch()
    const {searchData,setSearchData} = useContext(searchDataValue)
    const {data,loading,error} = useSelector(state => state.users)

    useEffect(() => {
        dispatch(
          getUsersFromServer("https://fake-json-api.mock.beeceptor.com/users")
        );
      }, []);

      console.log(data);

      const removeUser = () => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Deleted successfully",
          showConfirmButton: false,
          timer: 1500
        });
      }


      const columns = [
        { 
        field: 'id',
         headerName: 'ID',
         width: 20, 
         editable: true,
          valueGetter : (params) => {
                  return (
                `${params.row.id}`
                 )
        }
      },
        {
          false: 'Image',
          headerName : 'Image',
          width: 100,
          editable: true,
          renderCell : (params) =>  {
           return <img className='w-14 h-auto' src={`${params.row.photo}`} alt="" />
          }
        },
        {
          field: 'Name',
          headerName: 'Name',
          width: 100,
          editable: true,
          valueGetter : (params) => {
              return (
                `${params.row.name}`
              )
          }
        },
        {
          field: 'Company',
          headerName: 'Company',
          width: 100,
          editable: true,
          valueGetter : (params) => {
            return (
              `${params.row.company}`
            )
        }
        },
        {
          field: 'Username',
          headerName: 'Username',
          width: 100,
          editable: true,
          valueGetter : (params) => {
            return (
              `${params.row.username}`
            )
        }
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 100,
          editable: true,
          valueGetter : (params) => {
            return (
              `${params.row.email}`
            )
        }
        },
        {
          field: 'address',
          headerName: 'Address',
          width: 100,
          editable: true,
          valueGetter : (params) => {
            return (
              `${params.row.address}`
            )
        }
        },
        {
          field: 'State',
          headerName: 'State',
          width: 100,
          editable: true,
          valueGetter : (params) => {
            return (
              `${params.row.state}`
            )
        }
        },
        {
          field: 'Country',
          headerName: 'Country',
          width: 100,
          editable: true,
          valueGetter : (params) => {
            return (
              `${params.row.country}`
            )
        }
        },
        {
          field: 'Phone',
          headerName: 'Phone',
          width: 100,
          editable: true,
          valueGetter : (params) => {
            return (
              `${params.row.phone}`
            )
        }
        },
        {
            field : 'Actions',
            headerName : 'Actions',
            width:200,
            renderCell : (params) =>  {
               return (
                <div className='flex  gap-3'>
                <Link to={`/user/${params.row.id}`}><Button className='text-white' variant="contained" color="success">Edit</Button></Link>
                <Button className='text-white' variant="contained" color="error" onClick={() => removeUser(params.row.id)}>Delete</Button>
             </div>
               )
               }
        }
      ];



  return (
    <div className='bg-zinc-900 flex flex-col gap-10'>

      {
        data.length && (

    <Box sx={{ height: '100vh', width: '100%' }} >
    <DataGrid
    className='text-white bg-zinc-800'
      rows={searchData ? searchData : data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  </Box>
        )
      }
      
  </div>
  )
}
