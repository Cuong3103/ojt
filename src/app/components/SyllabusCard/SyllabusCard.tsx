import React from 'react'
import { SlClose } from "react-icons/sl";

import './Syllabus.css';


const SyllabusCard = () => {
    return (
        <div className="syllabus-container">
            <div className='top-content'>
                <div className='top-left-content'>
                    <h4 className='course-name'>Linux</h4>
                    <div className='status'>
                        Active{/*Sau này import status thay vào*/}
                    </div>
                </div>
                <div className='top-right-icon'>
                    <SlClose />
                </div>
            </div>
            <div className='bot-content'>
                <p className='course-content'>LIN v2.0</p>
                <div className='vertical-line'></div>
                <p className='course-content'>4 days (12 hours)</p>
                <div className='vertical-line'></div>
                <p className='course-content'>Modified on 23/07/2022 by Johny Deep</p>
            </div>

        </div>
    )
}

export default SyllabusCard;