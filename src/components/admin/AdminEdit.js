import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import Heading from "../layout/Heading";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import  { API } from "../../constants/api";
import axios from "axios";
import Delete from "./DeleteArticle";




const schema = yup.object().shape({
	title: yup.string().required("Title is required"),
});

export default function EditPost() {
	const [post, setPost] = useState(null);
	const [updated, setUpdated] = useState(false);
	const [fetchingPost, setFetchingPost] = useState(true);
	const [updatingPost, setUpdatingPost] = useState(false);
	const [fetchError, setFetchError] = useState(null);
	const [updateError, setUpdateError] = useState(null);


	const [auth] = useContext(AuthContext);

    const headers = {
      headers: {
        Authorization: `Bearer ${auth.jwt}`,
      },
    };


	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});


	let { id } = useParams();

    const url = `${API}/${id}`;

	useEffect(
		function () {
			async function getPost() {
				try {
					const response = await axios.get(url);
					console.log("response", response.data);
					setPost(response.data);
				} catch (error) {
					console.log(error);
					setFetchError(error.toString());
				} finally {
					setFetchingPost(false);
				}
			}

			getPost();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	async function onSubmit(data) {
		setUpdatingPost(true);
		setUpdateError(null);
		setUpdated(false);

		console.log(data);

		try {
			const response = await axios.put(url, data, headers);
			console.log("response", response.data);
			setUpdated(true);
		} catch (error) {
			console.log("error", error);
			setUpdateError(error.toString());
		} finally {
			setUpdatingPost(false);
		}
	}

	if (fetchingPost) return <div>Loading...</div>;

	if (fetchError) return <div>Error loading post</div>;

	return (
		<>
			<Heading content="Edit Post" />

			<form onSubmit={handleSubmit(onSubmit)}>
				{updated && <div className="success">The post was updated</div>}

				{updateError && <FormError>{updateError}</FormError>}

				<fieldset disabled={updatingPost}>
				<div>
						<input name="title" placeholder="Title" ref={register} />
						{errors.title && <FormError>{errors.title.message}</FormError>}
					</div>
        			  <div>
						<input name="introduction" placeholder="Introduction" ref={register} />
						{errors.introduction && <FormError>{errors.introduction.message}</FormError>}
					</div>
         			 <div>
						<input name="date" type="date" placeholder="Date" ref={register} />
						{errors.date && <FormError>{errors.date.message}</FormError>}
					</div>
					<div>
						<textarea name="text" placeholder="Main Text" ref={register} />
					</div>
				
					<Delete id={post.id}/>
					<button className="SubmitBtn">Update</button>
				</fieldset>	
			</form>
	</>
	);
}