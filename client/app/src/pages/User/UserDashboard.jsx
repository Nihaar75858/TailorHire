import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../components/hooks/useAuth";

const UserDashBoard = () => {
  const { user } = useUser();
  console.log("User in dashboard:", user);
  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div>
        <div>Welcome, {user.username}</div>
        <div>How can I help you today?</div>

        <div>
          <Link to="/formwizard">
            <h2>Resume & Cover Letters</h2>
            <p>Generate AI cover letters and job match scores.</p>
          </Link>

          <Link to="/jobs">
            <h2>Job Postings</h2>
            <p>Browse and apply for job opportunities.</p>
          </Link>

          <Link to="/tailorhire">
            <h2>Chat with TailorHire</h2>
            <p>Chat with our AI assistant for job search tips.</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserDashBoard;
