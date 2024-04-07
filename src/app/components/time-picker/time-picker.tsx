import React from "react";
import dayjs from 'dayjs';
import { TimePicker } from 'antd';
const format = 'HH:mm';
const AppTimePicker: React.FC = () => {
    return (
        <TimePicker placeholder="--:--" format={format}  suffixIcon={null}/>

    );

};

export default AppTimePicker;