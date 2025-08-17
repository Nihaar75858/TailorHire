import { useState, useEffect } from "react";
import { useUser } from "../hooks/useAuth";

export default function ProfilePage() {
    const { user } = useUser();
    const [id, setId] = useState("");
    // Pre-fill form with existing user data
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: user?.username || "",
        email: "",
        phone: "",
        bio: "",
        location: "",
        profilePic: "https://via.placeholder.com/150",
    });

    // Load user data from localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setId(storedUser.id);
        console.log("User ID", storedUser.id);
        console.log("User data:", id);

        const fetchUserData = async () => {
            const response = await fetch(`http://localhost:8000/api/user/${storedUser.id}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setFormData({
                    first_name: data.first_name || "",
                    last_name: data.last_name || "",
                    username: data.username || "",
                    email: data.email || "",
                    profilePic: data.profilePic || "https://via.placeholder.com/150",
                });
            }

            console.log("Fetched user data:", formData);
        }
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profilePic" && files.length > 0) {
            const imgURL = URL.createObjectURL(files[0]);
            setFormData({ ...formData, profilePic: imgURL });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const userId = storedUser?.id;

            // Send PUT request to Django backend
            const response = await fetch(`http://127.0.0.1:8000/api/userdata/${userId}`, {
                method: "PUT",  // or PATCH if you only send partial updates
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const updatedUser = await response.json();

            // update local storage with new data
            localStorage.setItem("user", JSON.stringify(updatedUser));

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Something went wrong while updating profile.");
        }
    };


    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 space-y-6"
            >
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                    <img
                        src={null}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    <label className="mt-3 cursor-pointer text-blue-600 text-sm">
                        Change Photo
                        <input
                            type="file"
                            name="profilePic"
                            accept="image/*"
                            onChange={handleChange}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Name */}
                <div>
                    <label className="block font-medium">First Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mt-1"
                    />
                </div>

                <div>
                    <label className="block font-medium">Last Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mt-1"
                    />
                </div>

                <div>
                    <label className="block font-medium">Username</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mt-1"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mt-1"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="block font-medium">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mt-1"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block font-medium">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mt-1"
                    />
                </div>

                {/* Bio */}
                <div>
                    <label className="block font-medium">Bio</label>
                    <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded mt-1"
                        rows="3"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
