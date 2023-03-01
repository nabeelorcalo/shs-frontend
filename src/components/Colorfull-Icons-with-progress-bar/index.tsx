import { Rate, Typography } from 'antd';

interface ColorfullIconsWithProgressbarProps {
    icon?: string;
    title?: string;
    storage?: string;
    alt?: string
}
export const ColorfullIconsWithProgressbar = ({
    icon,
    title,
    storage,
    alt

}: ColorfullIconsWithProgressbarProps) => {
    return (
        <div className='max-w-sm flex'>
            <img src={icon} alt={alt} />
            <div className='w-80 pl-3'>
                <div className='flex justify-between  '><Typography.Title level={5} className="p-0 m-0" >
                    {title}
                </Typography.Title>
                    <Typography >
                        {storage}
                    </Typography>
                </div>
                <div>
                    {/* progress bar */}
                </div>

            </div>


        </div>
    )
}