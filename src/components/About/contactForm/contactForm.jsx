import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClearIcon from '@material-ui/icons/Clear';
import './contactForm.css';
import emailjs from 'emailjs-com';

const ContactForm = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const sendEmail = (e) => {
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
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Message In A bottle</DialogTitle>
                <form action="#" name="contact_form" onSubmit={sendEmail}>
                    <input type="hidden" name="contact_number" />
                    <label >Name</label>
                    <input name="name" type="text" required placeholder="John" />
                    <br />
                    <label >Email</label>
                    <input name="email" type="email" required placeholder="you@domain.com" />
                    <br />
                    <label for="message">Message</label>
                    <textarea name="message" />
                    <br />
                    <br />
                    <div className="button--container">
                        <input type="submit" value="Submit"></input>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default ContactForm;
