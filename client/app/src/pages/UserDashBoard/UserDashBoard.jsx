import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeSection from "./../../components/User/ResumeSection";
import JobPostings from "./../../components/User/JobPostings";
// import Recommendations from "./../../components/User/Recommendations";

const UserDashBoard = () => {
    const [resumes, setresumes] = useState([]);
    const [title, setTitle] = useState('');
    const [releaseYear, setReleaseYear] = useState(0);

    const [newTitle, setNewTitle] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/resume/');
            const data = await response.json();
            setresumes(data);
        } catch (error) {
            console.error('Error fetching resumes:', error);
        }
    };

    const addresume = async () => {
        const newresume = {
            title, release_year:
                releaseYear
        };
        try {
            const response = await fetch('http://127.0.0.1:8000/api/resume/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newresume),
            });

            const data = await response.json();
            setresumes((prev) => [...prev, data]);
        } catch (error) {
            console.error('Error adding resume:', error);
        }
    };

    const updateresume = async (pk, release_year) => {
        const newresume = {
            title: newTitle,
            release_year
        };
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/resume/${pk}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newresume),
            });

            const data = await response.json();
            setresumes((prev) => prev.map((resume) => {
                if (resume.id === pk) {
                    return data;
                } else {
                    return resume
                }
            }));
        } catch (error) {
            console.error('Error adding resume:', error);
        }
    };

    const deleteresume = async (pk) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/resume/${pk}/`, {
                method: 'DELETE'
            });

            setresumes((prev) => prev.filter((resume) => { resume.id !== pk }));
        } catch (error) {
            console.error('Error adding resume:', error);
        }
    };


    return (
        <>
            <div>UserDashBoard</div>

            <div className='flex gap-2 mb-4'>
                <input title='Name'
                    type='text'
                    placeholder='Name your file...'
                    onChange={(e) => setTitle(e.target.value)}
                    className='bg-white'
                ></input>
                <input
                    title='Date'
                    type='number'
                    placeholder='Release Date...'
                    onChange={(e) => setReleaseYear(e.target.value)}></input>
                <button onClick={addresume}> Submit Code </button>
            </div>
            {resumes.map((resume) => (
                <div>
                    <p>Title: {resume.title}</p>
                    <p>Released: {resume.release_year}</p>
                    <input
                        type='text'
                        placeholder='Add New Title...'
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <button onClick={() => updateresume(resume.id, resume.release_year)}>
                        {" "}
                        Change Name
                    </button>
                    <button onClick={() => deleteresume(resume.id)}>
                        Delete Code
                    </button>
                </div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResumeSection />
                <JobPostings />
                <Recommendations />
            </div>
        </>
    )
}

export default UserDashBoard