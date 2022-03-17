import React from "react";
import { Avatar, Badge, styled, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

interface PartImageProps {
    image_url?: string | null;
    name: string;
    current_quantity: number;
    size?: "sm" | "md";
    is_valid: boolean;
    part_id: number;
    active: boolean;
    hide_name?: boolean;
}

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    "&.MuiAvatar-circular": {
        overflow: "visible",
    },
    "&.part-clicked": {
        "&::before": {
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 100,
            borderRadius: "50%",
            animation: "ripple 1.5s 3 ease-in-out forwards",
            border: `3px solid ${theme.palette.divider}`,
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.2)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2)",
            opacity: 0,
        },
    },
}));

const PartAvatar = (props: PartImageProps) => {
    const {
        image_url,
        name,
        current_quantity,
        size = "md",
        is_valid,
        hide_name = false,
        active,
    } = props;

    const widthAndHeight: { width: number; height: number } = {
        width: size === "md" ? 56 : 38,
        height: size === "md" ? 56 : 38,
    };

    const color: "success" | "warning" = is_valid ? "success" : "warning";

    return (
        <>
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                color={color}
                badgeContent={current_quantity > 0 ? current_quantity : "0"}
            >
                {image_url ? (
                    <StyledAvatar
                        className={active ? "part-clicked" : ""}
                        alt={name}
                        src={image_url}
                        sx={{ ...widthAndHeight }}
                    />
                ) : (
                    <StyledAvatar
                        className={active ? "part-clicked" : ""}
                        sx={{ bgcolor: deepOrange[500] }}
                    >
                        {name.charAt(0)}
                    </StyledAvatar>
                )}
            </Badge>
            {!hide_name ? (
                <Typography
                    sx={{ mt: 2, maxWidth: "100%" }}
                    textAlign={"center"}
                >
                    {name}
                </Typography>
            ) : null}
        </>
    );
};

export default PartAvatar;
