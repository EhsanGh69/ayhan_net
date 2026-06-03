import moment from "jalali-moment"

const getISODate = (date) => {
    // حالت اول: شیء DateObject از تقویم
    if (date?.toDate) {
        return date.toDate().toISOString().slice(0, 10)
    }
    
    // حالت دوم: رشته دستی
    if (typeof date === 'string' && date.includes('/')) {
        try {
            const [year, month, day] = date.split('/')
            const gregorian = moment(`${year}/${month}/${day}`, 'jYYYY/jMM/jDD')
            if (gregorian.isValid()) {
                return gregorian.format('YYYY-MM-DD')
            }
        } catch (e) {
            console.error('Date conversion error:', e)
        }
    }
    
    return null
}

export default getISODate