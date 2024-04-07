import React from 'react';
import { DatePicker } from 'antd';

import { ConfigProvider } from 'antd'

const { RangePicker } = DatePicker;

const AppTimeFramePicker: React.FC = () => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    DatePicker: {
                        /* here is your component tokens: */
                        cellWidth: 44.8
                        

                    },
                },
            }}
        >


            <RangePicker suffixIcon={null} style={{ width: '200px', borderRadius: '5px' }}
                placeholder={['--/--/----', '--/--/----']}
                format="DD/MM/YYYY"
            />
        </ConfigProvider>

    )
};
export default AppTimeFramePicker;
