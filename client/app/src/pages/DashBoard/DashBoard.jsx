import React, { useState, useEffect } from 'react';
import DashboardFooter from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
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
        <div className='min-h-screen bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 flex flex-col items-center justify-center text-gray-800'>
            <div className='text-8xl justify-center text-center text-white pt-15 pb-6'>Welcome to TailorHire</div>

            {/* <div className='flex gap-2 mb-4'>
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
            ))} */}
            {/* Buttons Container */}
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
                {/* Primary Button */}
                <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:opacity-90 transition duration-200">
                    Try TailorHire ↗
                </button>

                {/* Secondary Buttons */}
                <button onClick={() => navigate('/register')} className="text-black font-medium px-6 py-3 hover:underline">
                    Sign Up →
                </button>
                <button onClick={() => navigate('/formwizard')} className="text-black font-medium px-6 py-3 hover:underline">
                    Add your Resume →
                </button>
            </div>
            <DashboardFooter />
        </div>
    )
}

export default DashBoard