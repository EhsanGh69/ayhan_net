const deepSearch = (obj, searchTerm) => {
    const searchValue = searchTerm.toLowerCase();
    const excludeKeys = ['id', 'created_at', 'updated_at'];
    
    const searchInObject = (item) => {
        if (item === null || item === undefined) return false;
        
        if (typeof item === 'object' && !Array.isArray(item)) {
            return Object.entries(item).some(([key, value]) => {
                if (excludeKeys.includes(key)) return false;
                return searchInObject(value);
            });
        }
        
        if (Array.isArray(item)) {
            return item.some(subItem => searchInObject(subItem));
        }
        
        return item.toString().toLowerCase().includes(searchValue);
    };
    
    return searchInObject(obj);
};

export default deepSearch;