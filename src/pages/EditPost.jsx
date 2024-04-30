import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostForm } from "../components";
import { useParams, useNavigate } from "react-router-dom";
const EditPost = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    }
    else{
        navigate('/');
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
        <Container>
            <PostForm post = {post}/>
        </Container>
    </div>
  ) : null;
};

export default EditPost;
