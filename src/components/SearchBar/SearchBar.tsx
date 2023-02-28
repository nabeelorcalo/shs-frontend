import { Input as AntInput } from 'antd';
import './style.scss';

interface Props {
    size?: 'large' | 'small' | 'middle';
    placeholder?: string;
    value?: string;
    name?: string;
    icon?: any;
    handleChange({ }): void;
}

export const SearchBar = ({ size, placeholder, icon, name, value, handleChange }: Props) => {
    return (
        <div className='input-wrapper'>
            <AntInput
                className='search-bar'
                value={value}
                size={size}
                name={name}
                placeholder={placeholder}
                prefix={<img src={icon} />}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    )
}
