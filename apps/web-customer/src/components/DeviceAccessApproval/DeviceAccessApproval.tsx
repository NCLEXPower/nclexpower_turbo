/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import { Avatar, Box, Grid, Typography } from "@mui/material";
import { DeviceApproval, NCLEXBlueLogo } from "core-library/assets";
import { Button, Checkbox } from "core-library/components";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
    email: string;
    model: string;
    location: string;
}

export const DeviceApprovalDialog = () =>
// details:Props //Uncomment this in actual implementation
{
    const details: Props = {
        email: "admin@gmail.com",
        model: "IPhone 15 Pro Max",
        location: "Angeles, Pampanga",
    };

    const [isGranted, setIsGrant] = useState<boolean>(false);

    const handleApprove = () => {
        console.log("Approve", "isGranted : ", isGranted);
    };
    const handleDecline = () => {
        console.log("Declined", "isGranted : ", isGranted);
    };

    return (
        <Box sx={{ width: "100dvw", height: "100dvh" }}>
            <Grid container sx={{ width: "100%", display: "flex", height: "100%" }}>
                <Grid
                    lg={6}
                    sm={12}
                    item
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        alignItems: "center",
                        justifyContent: "center",
                        paddingX: "80px",
                        paddingTop: "80px",
                    }}
                >
                    <Image alt="Detect Device" src={DeviceApproval} width={500} />
                </Grid>

                <Grid
                    lg={6}
                    sm={12}
                    item
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        height: "100%",
                        alignItems: "start",
                        justifyContent: "center",
                        paddingX: "25px",
                    }}
                >
                    <Image alt="NCLEX Logo" src={NCLEXBlueLogo} />
                    <Box sx={{ paddingBottom: "10px" }}>
                        <Typography fontWeight={600} fontSize="30px" sx={{
                            width: { xs: "100%", sm: "80%" },
                            fontSize: { xs: "24px", sm: "30px" }
                        }}>
                            Are you trying to sign in to your account?
                        </Typography>
                        <Typography
                            variant="h6"
                            fontWeight={500}
                            color="GrayText"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "start"
                            }}
                        >
                            <Avatar
                                src="/path-to-user-image.jpg"
                                sx={{
                                    marginRight: "10px",
                                    width: "30px !important",
                                    height: "30px !important"
                                }}
                            />
                            {details.email}
                        </Typography>
                    </Box>
                    <Box sx={{ paddingBottom: "10px" }}>
                        <Typography variant="h6" color="GrayText" fontWeight={600}>
                            Device Information :
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="GrayText"
                            fontSize="16px"
                            lineHeight="20px">
                            {details.model}
                        </Typography>
                    </Box>
                    <Box sx={{ paddingBottom: "10px" }}>
                        <Typography variant="h6" color="GrayText" fontWeight={600}>
                            Location :
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="GrayText"
                            fontSize="16px"
                            lineHeight="20px">
                            {details.location}
                        </Typography>
                    </Box>
                    <Box sx={{ paddingBottom: "10px" }}>
                        <Typography variant="h6" color="GrayText" fontWeight={600}>
                            Time :
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="GrayText"
                            fontSize="16px"
                            lineHeight="20px"
                        >
                            Just Now
                        </Typography>
                    </Box>
                    <Box sx={{ paddingBottom: "10px" }}>
                        <Typography variant="h6" color="GrayText" fontWeight={600}>
                            This device is attempting to sign in to your account.
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="GrayText"
                            fontSize="16px"
                            lineHeight="20px"
                            sx={{
                                width: { xs: "100%", sm: "50%" }
                            }}
                        >
                            Note: Signing in on another device will log you out from your current session. Please confirm if you wish to proceed with the new device sign-in.
                        </Typography>
                    </Box>
                    <Grid container gap={2} sx={{ paddingY: "15px" }}>
                        <Grid item lg={3} md={5} sm={3} xs={12}>
                            <Button
                                onClick={() => handleApprove()}
                                fullWidth
                                sx={{
                                    display: "flex",
                                    flexGrow: 1,
                                    padding: "10px",
                                    borderRadius: "10px",
                                    bgcolor: "green",
                                    "&:hover": { bgcolor: "#006000" },
                                }}
                            >
                                Yes, It's Me
                            </Button>
                        </Grid>
                        <Grid item lg={3} md={5} sm={3} xs={12}>
                            <Button
                                fullWidth
                                onClick={() => handleDecline()}
                                sx={{
                                    display: "flex",
                                    flexGrow: 1,
                                    padding: "10px",
                                    borderRadius: "10px",
                                    bgcolor: "red",
                                    "&:hover": { bgcolor: "#bf0000" },
                                }}
                            >
                                No, It’s Not Me
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    );
};
