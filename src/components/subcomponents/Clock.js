import React, { useState, useEffect } from 'react';
import '../../css/Clock.css'

const Clock = () => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    useEffect(() => {
        const week = ['NIEDZ','PON', 'Wtorek', 'ŚR', 'CZW', 'PT', 'SOB'];
        
        const updateTime = () => {
            const cd = new Date();
            const formattedTime = `${zeroPadding(cd.getHours(), 2)}:${zeroPadding(cd.getMinutes(), 2)}`;
            const formattedDate = `${zeroPadding(cd.getDate(), 2)}.${zeroPadding(cd.getMonth() + 1, 2)}.${zeroPadding(cd.getFullYear(), 4)}`;
            const formattedDay = `${week[cd.getDay()]}`;
            setTime(formattedTime);
            setDate(formattedDate);
            setDay(formattedDay);
        };

        const timerID = setInterval(updateTime, 1000);
        updateTime();

        return () => clearInterval(timerID);
    }, []);

    const zeroPadding = (num, digit) => {
        return num.toString().padStart(digit, '0');
    };

    return (
        <div id="clock">
            <p className="date">{date}</p>
            <p className="day">{day}</p>
            <p className="time">{time}</p>
        </div>
    );
};

export default Clock;