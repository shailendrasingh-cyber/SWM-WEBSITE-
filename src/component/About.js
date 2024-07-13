// src/components/About.js
import React from "react";

function About() {
    return (
        <div className="flex flex-col p-8 bg-gradient-to-r from-zinc-100/30 via-amber-300/50 to-violet-400/25 gap-20 w-full h-screen justify-center items-center relative">
            <h1 className="text-3xl uppercase font-bold mt-6">About</h1>
            <p className="text-lg mt-8 text-center max-w-2xl">
                The Shivalik Smart Waste Management System is designed to help
                municipalities and organizations manage waste more efficiently. By
                monitoring the status of garbage bins in real-time, we can ensure
                timely waste collection and maintain a cleaner environment. Our
                mission is to leverage technology to create smarter and more
                sustainable cities. Our system monitors the fill levels of garbage bins in real-time
                and provides actionable insights for efficient waste management.
                Each bin's fill percentage is continuously updated and displayed on our website.
                When a bin reaches 75% capacity, an alert is triggered on the website,
                notifying the authorities to schedule a timely cleanup.
                This proactive approach ensures that bins are emptied before they overflow,
                keeping the environment cleaner and more hygienic.
            </p>
        </div>
    );
}

// testing code is here 




export default About;
