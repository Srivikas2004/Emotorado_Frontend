// import React, { useEffect ,useState} from "react";
// import {useNavigate} from 'react-router-dom'
// function Dashboard(){
//     const [userinfo,setuserinfo]=useState(null);
//     const navigate=useNavigate();
//     useEffect(() => {
//         const data=localStorage.getItem('user-info');
//         const userdata=JSON.parse(data);
//         console.log(userdata)
//         setuserinfo(userdata);
//      },[])

//      const handleLogout=()=>{
//         localStorage.removeItem('user-info');
//         navigate('/login');
//      }
//     return(
//         <div>
//             <h1>Welcome {userinfo?.name}</h1>
//             <h1>Email: {userinfo?.email}</h1>
//             <button onClick={handleLogout}>Log Out</button>
//         </div>
//     )
// }

// export default Dashboard;

import React, { useEffect ,useState} from "react";
import {useNavigate} from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Settings, Users, Calendar, HelpCircle, MessageCircle, Layout, RefreshCcw } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
 
    const [userinfo,setuserinfo]=useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const data=localStorage.getItem('user-info');
        const userdata=JSON.parse(data);
        console.log(userdata)
        setuserinfo(userdata);
     },[])
     const handleLogout=()=>{
        localStorage.removeItem('user-info');
        navigate('/login');
     }
     const [showDropdown, setShowDropdown] = useState(false);

  const activityData = [
    { week: 'Week 1', User: 480, Guest: 400 },
    { week: 'Week 2', User: 350, Guest: 450 },
    { week: 'Week 3', User: 200, Guest: 300 },
    { week: 'Week 4', User: 400, Guest: 350 },
  ];

  const productData = [
    { name: 'Basic Tees', value: 55, color: '#4ade80' },
    { name: 'Custom Short Pants', value: 31, color: '#fbbf24' },
    { name: 'Super Hoodies', value: 14, color: '#f87171' },
  ];

  const statsCards = [
    { title: 'Total Revenue', value: '$2,129,430', change: '+2.5%', icon: <RefreshCcw className="stat-icon revenue" /> },
    { title: 'Total Transactions', value: '1,520', change: '+1.7%', icon: <Layout className="stat-icon transactions" /> },
    { title: 'Total Likes', value: '9,721', change: '+1.4%', icon: <MessageCircle className="stat-icon likes" /> },
    { title: 'Total Users', value: '9,721', change: '+4.2%', icon: <Users className="stat-icon users" /> },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="dashboardlogo">Board.</h1>
        <nav className="nav-menu">
          <SidebarItem icon={<Layout />} text="Dashboard" active />
          <SidebarItem icon={<RefreshCcw />} text="Transactions" />
          <SidebarItem icon={<Calendar />} text="Schedules" />
          <SidebarItem icon={<Users />} text="Users" />
          <SidebarItem icon={<Settings />} text="Settings" />
        </nav>
        <div className="sidebar-footer">
          <SidebarItem icon={<HelpCircle />} text="Help" />
          <SidebarItem icon={<MessageCircle />} text="Contact Us" />
        </div>
      </aside>


      <main className="main-content">
        <header className="header">
          <h2>Dashboard</h2>
          <div> <h3>Welcome, {userinfo?.name}</h3></div>
          <div className="header-right">
            <input type="search" placeholder="Search..." className="search-input" />
            <div className="profile-container" onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}>
                            
            <div className="profile-avatar" >{userinfo?.email.charAt(0).toUpperCase()}</div>
            {showDropdown && (
                            <div className="dropdown-menu">
                                <p>{userinfo?.email}</p>
                                <button className="logout-button" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
          </div>
          </div>
        </header>

       
        <div className="stats-grid">
          {statsCards.map((card, index) => (
            <div key={index} className="stat-card">
              <div className="stat-card-header">
                <div className="stat-icon-wrapper">{card.icon}</div>
                
              </div>
              <h3 className="stat-title">{card.title}</h3>
              <div className="stat-valueswithchange">
              <p className="stat-value">{card.value}</p>
              <span className="stat-change">{card.change}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="chart-container">
          <h3 className="chart-title">Activities</h3>
          <p className="chart-subtitle">May - June 2021</p>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" />
                <YAxis />
                <Bar dataKey="User" fill="#4ade80" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Guest" fill="#f87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottom-grid">
          {/* Products Pie Chart */}
          <div className="pie-chart-container">
            <h3 className="chart-title">Top Products</h3>
            <div className="pie-chart-content">
              <div className="pie-chart-wrapper">
                <PieChart width={200} height={200}>
                  <Pie
                    data={productData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {productData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="pie-chart-legend">
                {productData.map((product, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: product.color }}></div>
                    <div className="legend-text">
                      <span className="legend-title">{product.name}</span>
                      <span className="legend-value">{product.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Profile Card */}
          <div className="add-profile-container">
            <button className="add-profile-button">
              <div className="add-profile-content">
                <div className="add-profile-icon">+</div>
                <span>Add Profile</span>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, text, active }) => (
  <div className={`sidebar-item ${active ? 'active' : ''}`}>
    {icon}
    <span>{text}</span>
  </div>
);

export default Dashboard;