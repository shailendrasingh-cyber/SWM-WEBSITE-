/// final start here /////
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getDatabase, onChildAdded, ref } from "firebase/database";
import { app } from "../../services/firebase";
import { BiLoaderCircle } from "react-icons/bi";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";






const database = getDatabase(app);

const binAddresses = {
  bins01: "https://www.google.com/maps/place/Shivalik+College,+Dehradun/@30.335928,77.870031,10z/data=!4m6!3m5!1s0x390f2a7095b0a67b:0xc2f54efbde26299!8m2!3d30.3359277!4d77.8700308!16s%2Fg%2F1hdzg9j_d?hl=en-US&entry=ttu",
  bins02: "https://www.google.com/maps/place/Shivalik+College,+Dehradun/@30.335928,77.870031,10z/data=!4m6!3m5!1s0x390f2a7095b0a67b:0xc2f54efbde26299!8m2!3d30.3359277!4d77.8700308!16s%2Fg%2F1hdzg9j_d?hl=en-US&entry=ttu",
  bins03: "https://www.google.com/maps/place/Shivalik+College,+Dehradun/@30.335928,77.870031,10z/data=!4m6!3m5!1s0x390f2a7095b0a67b:0xc2f54efbde26299!8m2!3d30.3359277!4d77.8700308!16s%2Fg%2F1hdzg9j_d?hl=en-US&entry=ttu",
  bins04: "https://www.google.com/maps/place/Shivalik+College,+Dehradun/@30.335928,77.870031,10z/data=!4m6!3m5!1s0x390f2a7095b0a67b:0xc2f54efbde26299!8m2!3d30.3359277!4d77.8700308!16s%2Fg%2F1hdzg9j_d?hl=en-US&entry=ttu",
  bins05: "https://www.google.com/maps/place/Shivalik+College,+Dehradun/@30.335928,77.870031,10z/data=!4m6!3m5!1s0x390f2a7095b0a67b:0xc2f54efbde26299!8m2!3d30.3359277!4d77.8700308!16s%2Fg%2F1hdzg9j_d?hl=en-US&entry=ttu",
};

function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);
  const [binsData, setBinsData] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setCurrentUser(true);
    }

    const fetchBinsData = () => {
      console.log("Fetching bins");
      const binsRefs = [
        { ref: ref(database, "bins"), statusKey: "STATUS01", bin: "bins01" },
        { ref: ref(database, "bins01"), statusKey: "STATUS02", bin: "bins02" },
        { ref: ref(database, "bins02"), statusKey: "STATUS03", bin: "bins03" },
        { ref: ref(database, "bins03"), statusKey: "STATUS04", bin: "bins04" },
        { ref: ref(database, "bins04"), statusKey: "STATUS05", bin: "bins05" },
      ];

      binsRefs.forEach(({ ref, statusKey, bin }) => {
        onChildAdded(ref, (snap) => {
          const status = snap.child(statusKey).val();
          setBinsData((prevData) => ({
            ...prevData,
            [bin]: status,
          }));
        });
      });
    };

    const intervalId = setInterval(fetchBinsData, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!currentUser) {
    return (
      <div className="h-screen flex justify-center items-center">
        <BiLoaderCircle className="animate-spin" />
      </div>
    );
  }

  const getStatusColor = (status) => {
    const percentage = parseInt(status);
    if (percentage >= 70) {
      return "bg-red-500 text-white";
    } else if (percentage >= 50) {
      return "bg-yellow-500";
    } else {
      return "bg-green-500 text-white";
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-zinc-100/30 via-amber-300/50 to-violet-400/25 w-full min-h-screen">
      <nav className="w-full bg-gray-800 text-white py-4 px-8 shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Smart Garbage System</div>
          <div className="hidden md:flex gap-4">
            <Link to="/" className="flex items-center gap-2 hover:text-yellow-400 transition duration-300">
              <AiOutlineHome /> Home
            </Link>
            <Link to="/About" className="flex items-center gap-2 hover:text-yellow-400 transition duration-300">
              <AiOutlineInfoCircle /> About
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
          <button
            className="md:hidden flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 5h20v2H0V8zm0 5h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className={`md:hidden ${menuOpen ? "block" : "hidden"} mt-4`}>
          <Link to="/" className="block py-2 px-4 hover:text-yellow-400 transition duration-300">
            Home
          </Link>
          <Link to="/About" className="block py-2 px-4 hover:text-yellow-400 transition duration-300">
            About
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 mt-2"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-6 mt-16">
        <p className="text-3xl uppercase font-bold text-center mb-8">
          Shivalik Smart Garbage Monitoring System
        </p>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow">
            <thead className="bg-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                  <span className="ml-2 text-xs border p-1 bg-red-500 rounded-md animate-pulse">
                    Live
                  </span>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(binsData).map(([bin, status], index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {bin}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getStatusColor(status)}`}>
                    {status}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-500">
                    <a href={binAddresses[bin]} target="_blank" rel="noopener noreferrer">
                      View on Map
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;



///// main code end here 