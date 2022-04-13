import React from "react";
import { animated, useSpring } from "react-spring";
import { Backdrop, Box, Modal } from "@mui/material";

interface FadeProps {
    children?: React.ReactElement;
    in: boolean;
    onEnter?: () => {};
    onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
    props,
    ref,
) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        config: {
            duration: 200,
        },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

interface IFadeModal {
    children: React.ReactNode | React.ReactNode[];
    open: boolean;
}

export function FadeModal(props: IFadeModal) {
    const { children, open } = props;
    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            keepMounted={false}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 200,
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        borderRadius: "0.5rem",
                        boxShadow: 24,
                        overflow: "hidden",
                    }}
                >
                    {children}
                </Box>
            </Fade>
        </Modal>
    );
}
