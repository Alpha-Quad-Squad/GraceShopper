import React from "react";
import { Link } from "react-router-dom";
import "./admin.css"

const Admin = () => {

    return (
        <div className="admin-page">
            <Link to="/users" className="admin-page-link"> All Users</Link>
            <Link to="/ordersHistory" className="admin-page-link"> Orders History</Link>
        </div>
    )
}

export default Admin