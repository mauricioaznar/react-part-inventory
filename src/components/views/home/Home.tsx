import React from 'react'
import {useGetPartsQuery} from "../../../services/schema";
import {Avatar, Badge, Box, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";

export default function Home() {
    const {data, loading} = useGetPartsQuery()

    if (loading) return null

    const color = '#44b700'

    return <Box>
        <List>
            {
                data?.getParts.map(p => {
                    return <ListItem key={p.part_id}>
                        {
                            p.image_url
                                ? <ListItemAvatar sx={{ mr: 2 }} >
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        color={'success'}
                                        badgeContent={" "}

                                    >
                                        <Avatar
                                            alt={p.name}
                                            src={p.image_url}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    </Badge>
                                </ListItemAvatar>
                                : null
                        }
                        <ListItemText primary={p.name}/>

                    </ListItem>
                })
            }
        </List>
    </Box>
}