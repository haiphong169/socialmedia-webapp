import { withStyles } from '@mui/styles';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import { postPost } from '../redux/actions/dataActions';
const styles = {
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '10%',
  },
};

function AddPost(props) {
  const { classes } = props;
  const [body, setBody] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.postPost({ content: body });
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Add />
      </IconButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <IconButton onClick={handleClose} className={classes.closeButton}>
          <Close />
        </IconButton>
        <DialogTitle>Add a new post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="new post"
              multiline
              rows="3"
              placeholder="say something"
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.submitButton}
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postPost })(
  withStyles(styles)(AddPost)
);
