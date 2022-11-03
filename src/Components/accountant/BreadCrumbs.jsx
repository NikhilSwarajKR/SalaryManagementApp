import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

export default function BreadCrumbs(props) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">HOME</Link>
        <Typography color="text.primary">{props.component}</Typography>
    </Breadcrumbs>
  )
}
