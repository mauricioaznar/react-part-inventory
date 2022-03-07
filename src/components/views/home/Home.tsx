import React from 'react'
import {useGetPartsQuery} from "../../../services/schema";
import {Avatar, Badge, Box, Container, Divider, Stack, Typography} from "@mui/material";

export default function Home() {
	const {data, loading} = useGetPartsQuery()
	
	if (loading) return null
	
	return <Container>
		<Typography variant={'h4'}>
			Raw materials
		</Typography>
		<Stack
			direction="row"
			flexWrap={'wrap'}
			sx={{ my: 4 }}
		>
			{
				data?.getParts.map(p => {
					return <Box key={p.part_id} sx={{ textAlign: 'center', px: 2, py: 1 }}>
						{
							p.image_url
								? <Badge
									overlap="circular"
									anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
									color={'success'}
									badgeContent={" "}
								
								>
									<Avatar
										alt={p.name}
										src={p.image_url}
										sx={{width: 56, height: 56}}
									/>
								</Badge>
								: null
						}
						<Typography sx={{ mt: 2, maxWidth: "5rem" }}>
							{
								p.name
							}
						</Typography>
					</Box>
				})
			}
		</Stack>

	</Container>
}