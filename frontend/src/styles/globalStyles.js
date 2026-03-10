export const modalBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'whitesmoke',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    textAlign: 'center',
    maxHeight: '90vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        display: 'none',
    }
}