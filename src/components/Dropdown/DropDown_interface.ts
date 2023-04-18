export interface DropDownInterface {
    name?: string;
    value?: string;
    options?: string[];
    requireSearchBar?: boolean;
    requireCheckbox?: boolean;
    requireDatePicker?: boolean;
    checkboxOnRight?: boolean;
    searchValue?: string;
    selectedList?: string[];
    placement?: "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight" | "top" | "bottom" | undefined;
    setValue?: any;
    setSearchValue?: any;
    setSelectedList?: any;
    setDateValue?: any;
    startIcon?: any;
    pilled?: boolean;
    showDatePickerOnVal?: string;
    endIcon?: any;
    requiredDownloadIcon?: boolean;
    requireRangePicker?: boolean;
}