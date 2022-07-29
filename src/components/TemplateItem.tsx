import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React from 'react';

interface templateDataProps {
    template_title: string;
    template_author: string;
    template_rating: number;
    template_price: number;
    template_img_url: string;
    template_description: string
}
const TemplateItem: React.FC<templateDataProps> = ({ template_title, template_author, template_rating, template_price, template_img_url, template_description }) => {
    return (
        <Grid item xs={4} sm={4} md={4} >
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={template_img_url}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {template_title}
                    </Typography>
                    <Grid style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography gutterBottom component="div">
                            Rs {template_price}
                        </Typography>
                        <Typography gutterBottom component="div">
                            Rating    {template_rating}
                        </Typography>
                    </Grid>

                    <Typography variant="body2" color="text.secondary">
                        {template_description}
                    </Typography>

                    <Grid style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                        Author : {template_author}

                    </Grid>
                </CardContent>
                <CardActions>
                    <Button onClick={() => {
                        alert(`${template_title} is Selected!!!`)
                    }} size="small">Explore Now</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default TemplateItem