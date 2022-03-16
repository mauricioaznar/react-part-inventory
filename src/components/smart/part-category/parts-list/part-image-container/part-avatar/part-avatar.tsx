import React from "react";
import { Avatar, Badge } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

interface PartImageProps {
    image_url?: string | null;
    name: string;
    current_quantity: number;
    size?: "sm" | "md";
    is_valid: boolean;
}

const PartAvatar = (props: PartImageProps) => {
    const { image_url, name, current_quantity, size = "md", is_valid } = props;

    const widthAndHeight: { width: number; height: number } = {
        width: size === "md" ? 56 : 38,
        height: size === "md" ? 56 : 38,
    };

    const color: "success" | "warning" = is_valid ? "success" : "warning";

    return (
        <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            color={color}
            badgeContent={current_quantity > 0 ? current_quantity : "0"}
        >
            {image_url ? (
                <Avatar alt={name} src={image_url} sx={{ ...widthAndHeight }} />
            ) : (
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {name.charAt(0)}
                </Avatar>
            )}
        </Badge>
    );
};

export default PartAvatar;
