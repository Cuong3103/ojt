'use client'
import './Tab.css';
import React, { useState } from 'react';




const Tab = () => {
    const [selectTab, setSelectTab] = useState("");

    const handleTabChange = (tabName: string) => {
        setSelectTab(tabName);
    }


    return (
        <div role='tablist' className='tabs tabs-lifted w-831 h-34 '>
            <label className={`tab ${selectTab === 'General' ? 'bg-black text-white' : 'bg-gray-500 text-white'}`}>
                <input
                    className='appearance-none'
                    type='radio'
                    name='my_tabs_2'
                    role='tab'
                    aria-label='General'
                    checked={selectTab === 'General'}
                    onChange={() => handleTabChange('General')} />
                General
            </label>

            <label className={`tab ${selectTab === 'Outline' ? 'bg-black text-white' : 'bg-gray-500 text-white'}`}>
                <input
                    className='appearance-none'
                    type='radio'
                    name='my_tabs_2'
                    role='tab'
                    aria-label='Outline'
                    checked={selectTab === 'Outline'}
                    onChange={() => handleTabChange('Outline')} />
                Outline
            </label>

            <label className={`tab ${selectTab === 'Training material' ? 'bg-black text-white' : 'bg-gray-500 text-white'}`}>
                <input
                    className='appearance-none'
                    type='radio'
                    name='my_tabs_2'
                    role='tab'
                    aria-label='Training material'
                    checked={selectTab === 'Training material'}
                    onChange={() => handleTabChange('Training material')} />
                Training material
            </label>
        </div>
    );
}
export default Tab;