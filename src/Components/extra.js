const cols=[
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Photo',
      selector: row => row.image,
      sortable: true,
    },
    {
      name: 'Qualification',
      selector: row => row.qualification,
      sortable: true,
    },
    {
        name: 'Date Of Joining',
        selector: row => row.doj,
        sortable: true,
    },
    {
      name: 'Previous Experience',
      selector: row => row.pyoe,
      sortable: true,
    },
    {
      name: 'Designation',
      selector: row => row.designation,
      sortable: true,
    },
    {
      name: 'Department',
      selector: row => row.department,
      sortable: true,
    },
    {
      cell: row => <Button onClick={() => navigate(`/SalarySlipGeneration/${row.id}`)}>Generate Salary Slip</Button>,
      allowOverflow: true,
      button: true,
    }];

    <DataTable columns={cols} data={eData} title="Teaching Staffs" pagination responsive fixedHeader fixedHeaderScrollHeight="400px"/>