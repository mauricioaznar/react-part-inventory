import React from 'react'
import {useGetPartCategoriesQuery} from "../../../services/schema";
import {Avatar, Badge, Box, Container, Stack, Typography} from "@mui/material";

export default function Home() {
	const {data, loading} = useGetPartCategoriesQuery()
	
	if (loading) return null
	
	return <Container>
		{
			data?.getPartCategories.map(pc => {
				return (
					<Box key={pc.name}>
						<Typography variant={'h4'}>
							{
								pc.name
							}
						</Typography>
						<Stack
							direction="row"
							flexWrap={'wrap'}
							sx={{ my: 4 }}
						>
							{
								pc.parts.map(p => {
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
					</Box>
				)
			})

		}



	</Container>
}