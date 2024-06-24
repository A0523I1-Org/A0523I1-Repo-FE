

const ModalLoading = () => {

    return (
        <>
        <div 
                 style={{
                  position : 'absolute',
                  display : "block",
                  top: '50%',
                  left: '47%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',   
                  }} 
                  class="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-blue-600" />
        </>
    )
}
export default ModalLoading;