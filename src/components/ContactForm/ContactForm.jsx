import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Typography from '@material-ui/core/Typography';
// import './contactForm.css';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) => ({
    dialog: {
        maxWidth: '400px'
    },
    inputButton: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: '5px',
        color: '#fff',
    }
}))

const ContactForm = () => {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down("xs"));
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const sendEmail = (e) => {
        setOpen(false);
        e.preventDefault();

        emailjs.sendForm('service_prvz249', 'template_c9pxy6p', e.target, 'user_IRVvPDXeXMc7xMV6eB051')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }
    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Contact
                        </Button>
            <Dialog
                open={open}
                classes={{ paperWidthSm: classes.dialog }}
                onClose={handleClose}
                aria-labelledby="form-dialog-title">
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Grid container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ minHeight: '220px' }}>
                            <Grid item xs={12}>

                                <Typography variant={mobile ? 'body2' : 'body1'}>
                                    FeedBack
                        </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>

                        <form action="#" name="contact_form" onSubmit={sendEmail}>
                            <input type="hidden" name="contact_number" />
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container >
                                        <Grid item xs={12}>
                                            <label >Name</label>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <input name="name" type="text" required placeholder="Shankar" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <Grid container >
                                        <Grid item xs={12}>
                                            <label >Email</label>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <input name="email" type="email" required placeholder="you@domain.com" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <Grid container >
                                        <Grid item xs={12}>
                                            <label for="message">Message</label>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <textarea name="message" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <br />
                                <br />
                                <div className="button--container">
                                    <input type="submit" value="Submit"
                                        className={classes.inputButton}></input>
                                </div>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </Dialog>
        </div >
    );
};

export default ContactForm;