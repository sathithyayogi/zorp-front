import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../constant';
import TemplateItem from './TemplateItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface templateData {
  template_title: string;
  template_author: string;
  template_rating: number;
  template_price: number;
  template_img_url: string;
  template_description: string
}

const Template: React.FC = () => {

  const [templateData, setTemplateData] = useState<templateData[]>();
  const [sort, setSort] = useState<string>('template_price');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [searchText, setsearchText] = useState<string>("");
  const [pageOffset, setpageOffset] = useState<number>(0);
  const [pageLimit, setpageLimit] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);


  useEffect(() => {
    getAllTemplate()
  }, [sort, sortOrder, searchText, pageOffset])

  async function getAllTemplate() {


    const getData = await axios.get(baseUrl + `/template?pageOffset=${pageOffset}&pageLimit=${pageLimit}&search=${searchText}&sort=${sort}&sort_order=${sortOrder}`);
    if (getData.data.templateList) {
      setTemplateData(getData.data.templateList)
      setTotalCount(getData.data.templateListCount)
      console.log(getData.data.templateListCount / 10);


    } else {
      setTemplateData([]);
      setTotalCount(0);

    }
  }
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const handleSortOrderChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {

    setSortOrder(newAlignment);
  };

  return (
    <>

      <Box component="form" noValidate autoComplete="off" style={{ margin: 20 }}>
        <Grid style={{ display: 'flex', justifyContent: "space-evenly" }}>

          <FormControl sx={{ width: '50ch' }}>
            <OutlinedInput onChange={(e) => {
              setsearchText(e?.target.value)
              setpageOffset(0)
            }} placeholder="Please enter text" />
          </FormControl>

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleChange}
              >
                <MenuItem value="template_price">Price</MenuItem>
                <MenuItem value="template_rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <ToggleButtonGroup
            color="primary"
            value={sortOrder}
            exclusive
            onChange={handleSortOrderChange}
          >
            <ToggleButton value="asc">Low To High</ToggleButton>
            <ToggleButton value="desc">High To Low</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Box>
<Typography>Total Templates : {totalCount}</Typography>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {templateData ? templateData.map((value, index) => (
            <TemplateItem key={index} template_title={value.template_title} template_author={value.template_author} template_rating={value.template_rating} template_price={value.template_price} template_description={value.template_description} template_img_url={value.template_img_url} />
          )) : <h1>loading</h1>}
        </Grid>
      </Box>
      {(totalCount / pageLimit) > 1 && (


        <Grid style={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2}>
            <Pagination showFirstButton showLastButton count={(totalCount / pageLimit) < 1 ? 0 : Math.round((totalCount / pageLimit))} color="primary" onChange={(event, value) => {
              console.log("page offset is" + (value - 1) * 10);
              
              setpageOffset((value - 1) * 10)
            }} />
          </Stack>
        </Grid>
      )

      }
    </>
  )
}

export default Template 