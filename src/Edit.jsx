import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [editBooks, SetEditBooks] = useState({
        title: '',
        author: '',
        publication: '',
        ISBN:''
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get(`https://66061ceed92166b2e3c34460.mockapi.io/products/${id}`);
            SetEditBooks(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        formik.setValues(editBooks);
    }, [editBooks]);

    const formik = useFormik({
        initialValues: editBooks,
        validate: values => {
            const errors = {};

            if (!values.title) {
                errors.title = "Please enter a book title";
            } else if (values.title.length <= 4) {
                errors.title = "Length of the book title should be more than 5 letters";
            }

            if (!values.author) {
                errors.author = "Please enter an author";
            } else if (values.author.length < 3) {
                errors.author = "Length of the author's name should be more than 3 letters";
            }

            if (!values.publication) {
                errors.publication = "Please enter a publication";
            } else if (values.publication.length <= 5) {
                errors.publication = "Length of the publication should be more than 5 letters";
            }

            if (!values.ISBN) {
                errors.ISBN = "Please enter an ISBN";
            } else if (values.ISBN.length <= 10) {
                errors.ISBN = "ISBN must be 10 digits long";
            }

            return errors;
        },
        onSubmit: async (values) => {
            try {
                await axios.put(`https://66061ceed92166b2e3c34460.mockapi.io/products/${id}`, values);
                navigate("/");
            } catch (error) {
                console.log(error);
            }
        }
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
            <div style={{ width: '100%', maxWidth: '500px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Edit Book Details</h3>
                <form onSubmit={formik.handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Book-Title<span style={{ color: 'red' }}>*</span></label>
                        <input
                            style={{ width: '100%', padding: '10px', margin: '5px 0' }}
                            type="text"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.title && formik.errors.title && <div style={{ color: 'red' }}>{formik.errors.title}</div>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Author<span style={{ color: 'red' }}>*</span></label>
                        <input
                            style={{ width: '100%', padding: '10px', margin: '5px 0' }}
                            type="text"
                            name="author"
                            value={formik.values.author}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.author && formik.errors.author && <div style={{ color: 'red' }}>{formik.errors.author}</div>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Publication<span style={{ color: 'red' }}>*</span></label>
                        <input
                            style={{ width: '100%', padding: '10px', margin: '5px 0' }}
                            type="text"
                            name="publication"
                            value={formik.values.publication}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.publication && formik.errors.publication && <div style={{ color: 'red' }}>{formik.errors.publication}</div>}
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>ISBN<span style={{ color: 'red' }}>*</span></label>
                        <input
                            style={{ width: '100%', padding: '10px', margin: '5px 0' }}
                            type="text"
                            name="ISBN"
                            value={formik.values.ISBN}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.ISBN && formik.errors.ISBN && <div style={{ color: 'red' }}>{formik.errors.ISBN}</div>}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button
                            type="submit"
                            style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            UPDATE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
