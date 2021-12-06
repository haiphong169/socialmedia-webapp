import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import { Grid } from '@mui/material';
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import StaticProfile from '../components/StaticProfile';
import { useParams } from 'react-router';

function User(props) {
  const { username } = useParams();
  const { postId } = useParams();
  const [postIdParam, setPostIdParam] = useState(null);

  const [profile, setProfile] = useState(null);
  useEffect(() => {
    if (postId) {
      setPostIdParam(postId);
    }
    props.getUserData(username);
    axios
      .get(`/user/${username}`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(props);
  const { posts } = props.data;

  return (
    <Grid container>
      <Grid item sm={8} xs={12}>
        {posts ? (
          !postIdParam ? (
            posts.map((post) => <Post key={post.postId} post={post} />)
          ) : (
            posts.map((post) => {
              if (post.postId !== postIdParam) {
                <Post key={post.postId} post={post} />;
              } else {
                <Post key={post.postId} post={post} openDialog />;
              }
            })
          )
        ) : (
          <p>No posts found</p>
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile ? <StaticProfile profile={profile} /> : <p>Loading data...</p>}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(User);
