import React from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Opinion from './opinion'
import Dialog from '@material-ui/core/Dialog';
// import './contactForm.css';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) => ({
    dialog: {
        maxWidth: '400px',
        backgroundColor: '#219ebc',
        borderRadius: '26px'
    },
    inputButton: {
        backgroundColor: '#4361ee',
        borderRadius: '15px',
        borderColor: '#219ebc',
        color: '#fff',
    },
    background: {
        backgroundColor: '#219ebc',
        borderRadius: '10px'
    },
    label: {
        fontWeight: '700',
        fontSize: '1rem'
    },
    inputBox: {
        borderRadius: '5px',
        border: 'aqua',
        height: '23px'
    },
    messageBox: {
        borderRadius: '5px',
        border: 'aqua',
        height: '60px'
    },
    form: {
        marginTop: '35px'
    },
    contactButton: {
        borderRadius: '10px',
        marginTop: '10px'
    }
}))

const ContactForm = () => {
    const classes = useStyles();
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
            <Button variant="contained" color="secondary" onClick={handleClickOpen} className={classes.contactButton}>
                Contact
                        </Button>
            <Dialog
                open={open}
                classes={{ paperWidthSm: classes.dialog }}
                onClose={handleClose}
                aria-labelledby="form-dialog-title">

                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Grid container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ height: '300px' }}
                        >
                            <Grid item xs={12}>
                                <Opinion />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={7}>
                        <form className={classes.form} action="#" name="contact_form" onSubmit={sendEmail}>
                            <input type="hidden" name="contact_number" />
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container >
                                        <Grid item xs={12}>
                                            <label className={classes.label}>Name</label>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <input
                                                className={classes.inputBox}
                                                name="name" type="text" required placeholder="Shankar" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <Grid container >
                                        <Grid item xs={12}>
                                            <label className={classes.label}>Email</label>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <input
                                                className={classes.inputBox}
                                                name="email" type="email" required placeholder="you@domain.com" />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid item xs={12}>
                                    <Grid container >
                                        <Grid item xs={12}>
                                            <label className={classes.label} htmlFor="message">Message</label>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <textarea
                                                className={classes.messageBox}
                                                name="message" />
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

            </Dialog >
        </div >
    );
};

export default ContactForm;