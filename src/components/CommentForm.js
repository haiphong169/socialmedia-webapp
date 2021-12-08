import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import { Button, Grid, TextField } from '@mui/material';
import { connect } from 'react-redux';
import { submitComment } from '../redux/actions/dataActions';
const styles = {
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0,1)',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    position: 'relative',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
};

function CommentForm(props) {
  const [content, setContent] = useState('');
  const { classes, authenticated } = props;
  const handleChange = (event) => {
    setContent(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.submitComment(props.postId, { content: content });
    setContent('');
  };

  return (
    <>
      {authenticated ? (
        <Grid item sm={12} style={{ textAlign: 'center' }}>
          <form onSubmit={handleSubmit}>
            <TextField
              name="content"
              type="text"
              label="Comment on post"
              value={content}
              onChange={handleChange}
              fullWidth
              className={classes.TextField}
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Submit
            </Button>
          </form>
          <hr className={classes.visibleSeparator} />
        </Grid>
      ) : null}
    </>
  );
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
