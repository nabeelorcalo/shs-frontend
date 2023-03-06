export const handleCheckbox = (e: any, option: string, setSelectedList: any) => {
    e.target.checked ?
        setSelectedList(((pre: any) => [...pre, option])) :
        setSelectedList(((pre: any) => pre.filter((op: string) => op !== option)));
};