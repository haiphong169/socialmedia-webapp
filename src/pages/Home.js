import Grid from '@mui/material/Grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import Profile from '../components/Profile';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';

function Home(props) {
  useEffect(() => {
    props.getPosts();
  }, []);

  const { posts } = props.data;

  let recentPosts = posts ? (
    posts.map((post) => <Post key={post.postId} post={post} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <div>
      <Grid container>
        <Grid item sm={8} xs={12}>
          {recentPosts}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>
            <Profile />
          </p>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getPosts })(Home);
